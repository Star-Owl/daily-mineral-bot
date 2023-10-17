const config = {
    postingHour: 11, // 24-hour format
    postingMinute: 0,
    reminderHour: 10, // 24-hour format
    reminderMinute: 30,
    reminderRemove: 10, // Duration in seconds before the reminder is removed (!time command)
    token: process.env.BOT_TOKEN, // Your bot's token
    channelId: '1152687502654709802', // ID of the channel where the bot should post
    authorId: '569975072417251378', // ID of the bot's author
    openaiApiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
    roleId: '1151156562321227866', // ID of the role that should be mentioned when a mineral is posted
    roleId_admin: '1140197709790335036', // ID of the admin role
}

export default config
