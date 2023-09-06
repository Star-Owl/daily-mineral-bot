const config = {
    postingHour: 15, // 24-hour format
    postingMinute: 0,
    reminderHour: 14, // 24-hour format
    reminderMinute: 30,
    reminderRemove: 5, //in seconds
    token: process.env.BOT_TOKEN,
    channelId: process.env.CHANNEL_ID,
    authorId: process.env.AUTHOR_ID,
}

export default config
