const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const announcement = message.body.split('!announce ')[1];
        if (!announcement) {
            return await message.reply("Please provide an announcement message!");
        }

        await chat.sendMessage(`📢 Announcement: ${announcement}`);
        console.log(chalk.green(`[ANNOUNCE] Sent announcement in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[ANNOUNCE ERROR] ${error.message}`));
        await message.reply("Failed to send announcement");
    }
};