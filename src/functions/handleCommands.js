import newMinerals from '../data/minerals.json' assert { type: 'json' }
import { getRandomMineral } from './getMinerals.js'
import { createMineralEmbed } from './createMineralEmbed.js'
import getReminderMessage from './getReminderMessage.js'
const getSecondsText = (seconds) => (seconds === 1 ? 'second' : 'seconds')

export const handleTimeCommand = async (message) => {
    let counter = 5
    const botMessage = await message.reply({
        content: `${getReminderMessage()} \n\nThis message will be deleted in ${counter} ${getSecondsText(counter)}!`,
    })
    const interval = setInterval(() => {
        counter--
        if (counter <= 0) {
            clearInterval(interval)
            botMessage.delete().catch(console.error)
            message.delete().catch(console.error)
        } else {
            botMessage.edit(
                `${getReminderMessage()} \n\nThis message will be deleted in ${counter} ${getSecondsText(counter)}!`
            )
        }
    }, 1000)
}

/**
 * Handle the mineral command.
 *
 * @param {string} message - The message content.
 * @param {object} author - The author of the message.
 */
export const handleMineralCommand = (message, author) => {
    if (newMinerals.length === 0) {
        return message.channel.send({
            content: `Unknown Mineral\n\n This mineral is unknown because the database is currently empty.`,
        })
    }

    const randomMineral = getRandomMineral(newMinerals)
    const mineralEmbed = createMineralEmbed(randomMineral, author)

    message.channel.send({
        content: `DEBUG: Daily Mineral: **${randomMineral.name}**\n\n ${randomMineral.description}`,
        files: [randomMineral.image],
        embeds: [mineralEmbed],
    })
}
