import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import newMinerals from './data/new_minerals.json' assert { type: 'json' }

//functions
import { handleSheduleFunction } from './functions/shedule.js'
import { handleMineralCommand, handleTimeCommand } from './functions/handleCommands.js'

const { BOT_TOKEN, CHANNEL_ID, AUTHOR_ID } = process.env

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
})

const setPresence = (content, type, status) => {
    client.user.setPresence({ activities: [{ name: content, type: type }], status: status })
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    const command = message.content.toLowerCase()

    switch (command) {
        case '!time':
            await handleTimeCommand(message)
            break
        case '!mineral':
            if (message.author.id !== AUTHOR_ID) return
            const author = client.users.cache.get(AUTHOR_ID)
            handleMineralCommand(message, author, newMinerals)
            break
    }
})

client.once('ready', () => {
    console.log(`${client.user.tag} has logged in!`)

    setPresence('Your daily dose of minerals. 💎', 4, 'dnd')

    const channel = client.channels.cache.get(CHANNEL_ID)

    handleSheduleFunction(channel)
})

client.login(BOT_TOKEN)
