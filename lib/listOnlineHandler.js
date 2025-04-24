const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const participants = await chat.participants;
        const onlineMembers = participants.filter(participant => participant.isOnline);

        if (onlineMembers.length === 0) {
            return await message.reply("No members are currently online.");
        }

        const onlineList = onlineMembers.map(member => `@${member.id.user}`).join('\n');
        await message.reply(`🟢 Online members:\n${onlineList}`);
        console.log(chalk.green(`[LIST ONLINE] Listed online members in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[LIST ONLINE ERROR] ${error.message}`));
        await message.reply("Failed to list online members");
    }
};