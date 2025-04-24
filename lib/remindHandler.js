const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const args = message.body.split(' ').slice(1);
        if (args.length < 2) {
            return await message.reply("Usage: !remind <time> <message>");
        }

        const time = args[0];
        const reminderMessage = args.slice(1).join(' ');

        setTimeout(async () => {
            await message.reply(`⏰ Reminder: ${reminderMessage}`);
        }, parseInt(time) * 1000);

        await message.reply(`Reminder set for ${time} seconds!`);
        console.log(chalk.green(`[REMIND] Set reminder: ${reminderMessage}`));
    } catch (error) {
        console.error(chalk.red(`[REMIND ERROR] ${error.message}`));
        await message.reply("Failed to set reminder");
    }
};