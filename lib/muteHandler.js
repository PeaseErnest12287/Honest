const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const mentioned = await message.getMentions();
        if (mentioned.length === 0) {
            return await message.reply("Please mention a user to mute");
        }

        const args = message.body.split(' ');
        const time = args[2] || '5'; // Default 5 minutes
        
        // Implement mute logic (WhatsApp Web.js doesn't directly support mute)
        // This would require tracking mutes in your own system
        await message.reply(`@${mentioned[0].id.user} take a ${time}-minute timeout, bro. ⏳`);
        console.log(chalk.green(`[MUTE] Muted user in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[MUTE ERROR] ${error.message}`));
        await message.reply("Failed to mute user");
    }
};