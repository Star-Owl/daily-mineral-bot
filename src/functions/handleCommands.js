import { getRandomMineral } from './getMinerals.js'
import { createMineralEmbed } from './createMineralEmbed.js'
import getReminderMessage from './getReminderMessage.js'
import config from '../config.js'

const getSecondsText = (seconds) => (seconds === 1 ? 'second' : 'seconds')

export const handleTimeCommand = async (receivedMessage) => {
    let counter = config.reminderRemove

    const botMessage = await receivedMessage.reply({
        content: `${getReminderMessage()} \n\nThis message will be deleted in ${counter} ${getSecondsText(counter)}!`,
    })

    const interval = setInterval(async () => {
        counter--

        if (counter <= 0) {
            clearInterval(interval)

            try {
                await botMessage.delete()
            } catch (error) {
                console.error("Error deleting the bot's message:", error)
            }

            try {
                await receivedMessage.delete()
            } catch (error) {
                console.error("Error deleting the user's message:", error)
            }

            return
        }

        try {
            await botMessage.edit(
                `${getReminderMessage()} \n\nThis message will be deleted in ${counter} ${getSecondsText(counter)}!`
            )
        } catch (error) {
            console.error("Error editing the bot's message:", error)
        }
    }, 1000)
}

/**
 * Handle the mineral command.
 *
 * @param {string} message - The message content.
 * @param {object} author - The author of the message.
 */
export const handleMineralCommand = (message, author, data) => {
    if (data.length === 0) {
        return message.channel.send({
            content: `Unknown Mineral\n\n This mineral is unknown because the database is currently empty.`,
        })
    }

    const randomMineral = getRandomMineral(data)
    const mineralEmbed = createMineralEmbed(randomMineral, author)

    message.channel.send({
        content: `DEBUG: Daily Mineral: **${randomMineral.name}**\n\n ${randomMineral.description}`,
        files: [randomMineral.image],
        embeds: [mineralEmbed],
    })
}
