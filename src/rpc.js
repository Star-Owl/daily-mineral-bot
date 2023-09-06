//import DiscordRPC from 'discord-rpc'

// RPC

// const RPC = new DiscordRPC.Client({
//     transport: 'ipc',
// })

// DiscordRPC.register(CLIENT_ID)

// async function setActivity() {
//     if (!RPC) return

//     RPC.setActivity({
//         details: 'TEST',
//         state: 'STATE',
//         startTimestamp: Date.now(),
//         largeImageKey: '',
//         largeImageText: '',
//         smallImageKey: '',
//         smallImageText: '',
//         instance: false,
//         buttons: [{ label: 'Button1', url: 'https://google.com' }],
//     })
// }

// RPC.on('ready', async () => {
//     setActivity()
//     console.log('Initial Activity set!')
//     setInterval(() => {
//         setActivity()
//         console.log('Activity set!')
//     }, 15 * 1000)
// })

// RPC.login({ clientId: CLIENT_ID }).catch((err) => console.log(err))

// END RPC
