import { Client, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'
import { setInterval } from 'timers'
import config from './config.js'
import minerals from './data/minerals.json' assert { type: 'json' }
import newMinerals from './data/new_minerals.json' assert { type: 'json' }
import { handleHelloCommand, handleMineralCommand, handleTimeCommand } from './functions/handleCommands.js'
import { handleSheduleFunction } from './functions/shedule.js'
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
})

const setPresence = (content, type, status) => {
    client.user.setPresence({ activities: [{ name: content, type: type }], status: status })
}

let author

client.once('ready', async () => {
    console.log(`${client.user.tag} has logged in!`)
    author = await client.users.fetch(config.authorId)

    setPresence(`💎 Your daily dose of ${minerals.length} minerals.`, 4, 'dnd')

    setInterval(() => {
        setPresence(`💎 Your daily dose of ${minerals.length} minerals.`, 4, 'dnd')
    }, 1000 * 60)

    const channel = client.channels.cache.get(config.channelId)

    handleSheduleFunction(channel, author, minerals)
})

client.on('messageCreate', async (receivedMessage) => {
    if (receivedMessage.author.bot) return
    const command = receivedMessage.content.toLowerCase()
    const member = receivedMessage.guild.members.cache.get(receivedMessage.author.id)
    if (!member) return

    switch (command) {
        case '!hello':
            await handleHelloCommand(receivedMessage, member.displayName)
            break
        case '!time':
            if (member.roles.cache.has(config.roleId)) await handleTimeCommand(receivedMessage)
            break
        case '!mineral':
        case '!mineral_test':
            if (member.roles.cache.has(config.roleId_admin))
                handleMineralCommand(
                    receivedMessage,
                    receivedMessage.author,
                    command === '!mineral' ? minerals : newMinerals
                )
            break
    }
})

client.login(config.token)
