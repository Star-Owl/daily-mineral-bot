import schedule from 'node-schedule'
import { getRandomMineral } from './getMinerals.js'
import { createMineralEmbed } from './createMineralEmbed.js'
import getReminderMessage from './getReminderMessage.js'
import config from '../config.js'

export const handleSheduleFunction = (channel) => {
    schedule.scheduleJob(`${config.reminderMinute} ${config.reminderHour} * * *`, async function () {
        channel.send({
            content: getReminderMessage(),
        })
    })

    schedule.scheduleJob(`${config.postingMinute} ${config.postingHour} * * *`, async function () {
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
