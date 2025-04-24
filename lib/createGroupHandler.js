const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const groupName = message.body.split('!creategroup ')[1];
        if (!groupName) {
            return await message.reply("Please provide a group name!");
        }

        const participants = message.mentionedIds;
        if (participants.length < 1) {
            return await message.reply("Please mention at least one participant!");
        }

        const chat = await client.createGroup(groupName, participants);
        await message.reply(`Group "${groupName}" created successfully!`);
        console.log(chalk.green(`[CREATE GROUP] Created group: ${groupName}`));
    } catch (error) {
        console.error(chalk.red(`[CREATE GROUP ERROR] ${error.message}`));
        await message.reply("Failed to create group");
    }
};