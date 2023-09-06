import schedule from 'node-schedule'
import { getRandomMineral } from './getMinerals.js'
import { createMineralEmbed } from './createMineralEmbed.js'
import getReminderMessage from './getReminderMessage.js'

export const handleSheduleFunction = (channel) => {
    schedule.scheduleJob('0 14 * * *', async function () {
        channel.send({
            content: getReminderMessage(),
        })
    })

    schedule.scheduleJob('0 15 * * *', async function () {
        const randomMineral = getRandomMineral(minerals)
        const mineralEmbed = createMineralEmbed(randomMineral)
        console.log(`${randomMineral.name} mineral has been chosen!`)

        channel.send({
            content: `Daily Mineral: **${randomMineral.name}**\n\n ${randomMineral.description}`,
            files: [randomMineral.image],
            embeds: [mineralEmbed],
        })
    })
}
