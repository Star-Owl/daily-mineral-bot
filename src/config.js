const config = {
    postingHour: 15, // 24-hour format
    postingMinute: 0,
    reminderHour: 14, // 24-hour format
    reminderMinute: 30,
    reminderRemove: 5, // Duration in seconds before the reminder is removed
    token: process.env.BOT_TOKEN, // Your bot's token
    channelId: process.env.CHANNEL_ID, // ID of the channel where the bot should post
    authorId: process.env.AUTHOR_ID, // ID of the bot's author
}

export default config
