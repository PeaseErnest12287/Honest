const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const mentioned = await message.getMentions();
        if (mentioned.length === 0) {
            return await message.reply("Please mention a user to ban");
        }

        const isAdmin = chat.participants.find(p => p.id._serialized === message.author && p.isAdmin);
        if (!isAdmin) {
            return await message.reply("Only admins can use this command");
        }

        for (const user of mentioned) {
            await chat.removeParticipants([user.id._serialized]);
        }
        
        await message.reply("User(s) banned with style 🎩✨");
        console.log(chalk.green(`[BAN] Banned users in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[BAN ERROR] ${error.message}`));
        await message.reply("Failed to ban user(s)");
    }
};