const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        await message.sendSeen();
        await message.reply("👀 Seen receipt sent!");
        console.log(chalk.green(`[SEND SEEN] Sent seen receipt for message`));
    } catch (error) {
        console.error(chalk.red(`[SEND SEEN ERROR] ${error.message}`));
        await message.reply("Failed to send seen receipt");
    }
};