const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const inviteCode = await chat.getInviteCode();
        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

        await message.reply(`🔗 Invite link: ${inviteLink}`);
        console.log(chalk.green(`[INVITE] Generated invite link for ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[INVITE ERROR] ${error.message}`));
        await message.reply("Failed to generate invite link");
    }
};