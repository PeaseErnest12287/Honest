const chalk = require('chalk');
const os = require('os');

module.exports = async (client, message) => {
    try {
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        await message.reply(`⏱️ Bot uptime: ${uptimeString}`);
        console.log(chalk.green(`[UPTIME] Sent uptime info`));
    } catch (error) {
        console.error(chalk.red(`[UPTIME ERROR] ${error.message}`));
        await message.reply("Failed to get uptime");
    }
};