const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        await message.reply(`⏰ Current time: ${timeString}`);
        console.log(chalk.green(`[TIME] Sent current time`));
    } catch (error) {
        console.error(chalk.red(`[TIME ERROR] ${error.message}`));
        await message.reply("Failed to get the current time");
    }
};