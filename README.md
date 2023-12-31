# 💎 Daily Mineral Bot 🪨

A Discord bot designed to provide users with a daily dose of mineral knowledge. 

## Features ⭐️

- **Daily Reminders:** Sends an automatic reminder to users every day.
- **Random Mineral Information:** When prompted, the bot selects a mineral at random and shares details about it.
- **Neat Embed Layout:** Information is presented in a well-organized and aesthetically pleasing embed format.
- **Memory of Recent Minerals:** The bot remembers recent minerals to ensure a fresh dose of information for users.

## Installation & Setup 🛠️

1. **Clone the repository:**
    ```
    git clone https://github.com/Star-Owl/daily-mineral-bot.git
    cd daily-mineral-bot
    ```

2. **Install Dependencies:**
    ```
    npm install
    ```

3. **Configuration:** You can configure the bot using the `config.js` file. Here are the available settings:
   ```javascript
   const config = {
       postingHour: 13,                          // 24-hour format
       postingMinute: 0,
       reminderHour: 12,                         // 24-hour format
       reminderMinute: 30,
       reminderRemove: 10,                       // Duration in seconds before the reminder is removed
       token: process.env.BOT_TOKEN,             // Your bot's token
       channelId: '',                            // ID of the channel where the bot should post
       authorId: '',                             // ID of the bot's author
       openaiApiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
       roleId: '',                               // ID of the role that should be mentioned when a mineral is posted
       roleId_admin: '',                         // ID of the admin role !mineral / !mineral_test
   }
        
   export default config;
   ```

4. **Start the bot:**
    ```
    node src/bot.js
    ```

## Commands 🤖

- `!time`: Displays a message with the time of the next mineral dose, which will be automatically deleted after a few seconds.
- `!mineral` (Debug Command): Displays detailed information about a randomly selected mineral. This is primarily for testing minerals.
- `!mineral_test` (Debug Command): Displays detailed information about a randomly selected mineral. This is primarily for testing new minerals.

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/Star-Owl/daily-mineral-bot/issues) for open issues or initiate a new one. 

## License 📄

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## Acknowledgments 🙏

- Special thanks to everyone who helped in the development and testing of this bot.
