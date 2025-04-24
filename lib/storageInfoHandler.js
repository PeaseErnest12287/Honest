const chalk = require('chalk');
const fs = require ('fs');

module.exports = async (client, message) => {
    try {
        const totalStorage = 100; // Placeholder for total storage in MB
        const usedStorage = fs.statSync('./data').size / (1024 * 1024); // Convert bytes to MB
        const freeStorage = totalStorage - usedStorage;

        await message.reply(`📦 Storage Info:\nUsed: ${usedStorage.toFixed(2)} MB\nFree: ${freeStorage.toFixed(2)} MB\nTotal: ${totalStorage} MB`);
        console.log(chalk.green(`[STORAGE INFO] Used: ${usedStorage.toFixed(2)} MB, Free: ${freeStorage.toFixed(2)} MB`));
    } catch (error) {
        console.error(chalk.red(`[STORAGE INFO ERROR] ${error.message}`));
        await message.reply("Failed to retrieve storage information");
    }
};