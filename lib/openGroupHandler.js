const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        await chat.setGroupMetadata({ restrict: false });
        await message.reply("The group has been opened to new participants.");
        console.log(chalk.green(`[OPEN GROUP] Opened group: ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[OPEN GROUP ERROR] ${error.message}`));
        await message.reply("Failed to open the group");
    }
};