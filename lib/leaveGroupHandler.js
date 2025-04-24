const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        await chat.leave();
        await message.reply("Left the group successfully!");
        console.log(chalk.green(`[LEAVE GROUP] Left group: ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[LEAVE GROUP ERROR] ${error.message}`));
        await message.reply("Failed to leave the group");
    }
};