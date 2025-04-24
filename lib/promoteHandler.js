const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const mentionedUser = message.mentionedIds[0];
        if (!mentionedUser) {
            return await message.reply("Please mention a user to promote!");
        }

        await chat.promoteParticipants([mentionedUser]);
        await message.reply(`User @${mentionedUser.split('@')[0]} has been promoted to admin!`);
        console.log(chalk.green(`[PROMOTE] Promoted user in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[PROMOTE ERROR] ${error.message}`));
        await message.reply("Failed to promote user");
    }
};