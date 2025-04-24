const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const pollContent = message.body.split('!poll ')[1];
        if (!pollContent || !pollContent.includes('|')) {
            return await message.reply("Usage: !poll [question] | [option1] | [option2]");
        }

        const parts = pollContent.split('|').map(p => p.trim());
        const question = parts[0];
        const options = parts.slice(1);

        if (options.length < 2) {
            return await message.reply("You need at least 2 options for a poll");
        }

        const pollMessage = `📊 *${question}*\n\n` + 
            options.map((o, i) => `${i+1}. ${o}`).join('\n') + 
            '\n\nReact with the number of your choice!';
        
        await message.reply(pollMessage);
        console.log(chalk.green(`[POLL] Created poll in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[POLL ERROR] ${error.message}`));
        await message.reply("Failed to create poll");
    }
};