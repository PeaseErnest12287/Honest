const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const mentionedUser = message.mentionedIds[0];
        if (!mentionedUser) {
            return await message.reply("Please mention a user to demote!");
        }

        await chat.demoteParticipants([mentionedUser]);
        await message.reply(`User @${mentionedUser.split('@')[0]} has been demoted from admin!`);
        console.log(chalk.green(`[DEMOTE] Demoted user in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[DEMOTE ERROR] ${error.message}`));
        await message.reply("Failed to demote user");
    }
};