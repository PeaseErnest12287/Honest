const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        await message.sendSeen();
        await message.reply("✅ Read receipt sent!");
        console.log(chalk.green(`[SEND READ] Sent read receipt for message`));
    } catch (error) {
        console.error(chalk.red(`[SEND READ ERROR] ${error.message}`));
        await message.reply("Failed to send read receipt");
    }
};