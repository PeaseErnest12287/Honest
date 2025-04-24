const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        await message.reply("🤖 I am alive and kicking!");
        console.log(chalk.green(`[ALIVE] Bot is alive`));
    } catch (error) {
        console.error(chalk.red(`[ALIVE ERROR] ${error.message}`));
        await message.reply("Failed to check if the bot is alive");
    }
};