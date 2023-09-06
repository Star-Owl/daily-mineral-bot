import 'dotenv/config'
import minerals from './data/minerals.json' assert { type: 'json' }
import newMinerals from './data/new_minerals.json' assert { type: 'json' }
import { Client, GatewayIntentBits } from 'discord.js'
import config from './config.js'

//functions
import { handleSheduleFunction } from './functions/shedule.js'
import { handleMineralCommand, handleTimeCommand } from './functions/handleCommands.js'

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
})

const setPresence = (content, type, status) => {
    client.user.setPresence({ activities: [{ name: content, type: type }], status: status })
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    const command = message.content.toLowerCase()
    const author = client.users.cache.get(config.authorId)

    switch (command) {
        case '!time':
            await handleTimeCommand(message)
            break
        case '!mineral':
            if (message.author.id !== config.authorId) return
            handleMineralCommand(message, author, minerals)
            break
        case '!mineral_test':
            if (message.author.id !== config.authorId) return
            handleMineralCommand(message, author, newMinerals)
            break
    }
})

client.once('ready', () => {
    console.log(`${client.user.tag} has logged in!`)

    setPresence('Your daily dose of minerals. 💎', 4, 'dnd')

    const channel = client.channels.cache.get(config.channelId)

    handleSheduleFunction(channel)
})

client.login(config.token)
