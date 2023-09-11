import { getRandomMineral } from './getMinerals.js'
import { createMineralEmbed } from './createMineralEmbed.js'
import getReminderMessage from './getReminderMessage.js'
import config from '../config.js'
import axios from 'axios'

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

async function getMineralImage(mineralName) {
    const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${mineralName}&prop=pageimages&format=json&pithumbsize=500`
    )

    const pages = response.data.query.pages
    const page = Object.values(pages)[0]

    return page.thumbnail ? page.thumbnail.source : null
}

async function generateRandomMineralJson(mineral) {
    const mineralImage = await getMineralImage(mineral.name)

    mineral.image = mineralImage

    return mineral
}

/**
 * Handle the mineral command.
 *
 * @param {string} message - The message content.
 * @param {object} author - The author of the message.
 */
export const handleMineralCommand = async (message, author, data) => {
    //await generateRandomMineralJson().then(console.log)
    //chatCompletion()
    if (data.length === 0) {
        return message.channel.send({
            content: `Unknown Mineral\n\n This mineral is unknown because the database is currently empty.`,
        })
    }

    const randomMineral = getRandomMineral(data)
    const updatedMineral = await generateRandomMineralJson(randomMineral)

    const mineralEmbed = createMineralEmbed(randomMineral, author)
    message.channel.send({
        content: `DEBUG: Daily Mineral: **${randomMineral.name}**\n\n ${randomMineral.description}`,
        files: [updatedMineral.image], //randomMineral.image
        embeds: [mineralEmbed],
    })
}
