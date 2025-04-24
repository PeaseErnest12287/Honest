const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        // Toggle anti-link feature
        const antiLinkEnabled = !chat.antiLinkEnabled; // Placeholder for actual implementation
        await message.reply(`Anti-link feature is now ${antiLinkEnabled ? "enabled" : "disabled"}.`);
        console.log(chalk.green(`[ANTI-LINK] Anti-link feature ${antiLinkEnabled ? "enabled" : "disabled"} in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[ANTI-LINK ERROR] ${error.message}`));
        await message.reply("Failed to toggle anti-link feature");
    }
};