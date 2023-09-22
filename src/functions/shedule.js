import schedule from 'node-schedule'
import { getRandomMineral, generateRandomMineralJson } from './getMinerals.js'
import { createMineralEmbed } from './createMineralEmbed.js'
import getReminderMessage from './getReminderMessage.js'
import config from '../config.js'

export const handleSheduleFunction = (channel, author, data) => {
    schedule.scheduleJob(`${config.reminderMinute} ${config.reminderHour} * * *`, async function () {
        channel.send({
            content: `<@&${config.roleId}> ${getReminderMessage()}`,
        })
    })

    schedule.scheduleJob(`${config.postingMinute} ${config.postingHour} * * *`, async function () {
        const randomMineral = getRandomMineral(data)
        const updatedMineral = await generateRandomMineralJson(randomMineral)

        const mineralEmbed = createMineralEmbed(randomMineral, author)

        console.log(`${randomMineral.name} mineral has been chosen!`)

        let Options = {
            content: `Daily Mineral: **${randomMineral.name}**\n\n<@&${config.roleId}>\n\n${randomMineral.description}`,
            embeds: [mineralEmbed],
        }

        if (updatedMineral.image) {
            Options.files = [updatedMineral.image]
        }

        await channel.send(Options)

        // channel.send({
        //     content: `Daily Mineral: **${randomMineral.name}**\n\n<@&${config.roleId}>\n\n${randomMineral.description}`,
        //     files: [updatedMineral.image],
        //     embeds: [mineralEmbed],
        // })
    })
}
