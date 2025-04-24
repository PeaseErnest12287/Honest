const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const moment = require('moment-timezone'); // You'll need to install this package

module.exports = async (client, message, commandMap) => {
    try {
        const commandsDir = path.join(__dirname, '../commands');
        const files = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js') && file !== 'menu.js');
        
        // Get user info
        const user = await message.getContact();
        const userName = user.pushname || user.name || 'User';
        
        // Time and date setup
        const currentTime = moment().tz('Africa/Lagos').format('h:mm A');
        const currentDay = moment().format('dddd');
        const currentDate = moment().format('MMMM Do YYYY');
        const uptime = formatUptime(process.uptime());
        
        // Count commands
        const commandCount = Object.keys(commandMap).length;
        
        // Build the menu header
        let menu = `
═══✪ ERNEST V1 ✪═══⊷
┃❃╭──────────────
┃❃│ Prefix : !
┃❃│ User : ${userName}
┃❃│ Time : ${currentTime} (WAT)
┃❃│ Day : ${currentDay}
┃❃│ Date : ${currentDate}
┃❃│ Version : 1.0.0
┃❃│ Commands : ${commandCount}
┃❃│ Alive : ${uptime}
┃❃╰───────────────
╰═════════════════⊷

📜 *COMMAND MENU* 📜\n\n`;

        // Organize commands by category
        const categories = {};
        files.forEach(file => {
            const cmdPath = path.join(commandsDir, file);
            const cmd = require(cmdPath);

            if (cmd.category && cmd.description) {
                if (!categories[cmd.category]) {
                    categories[cmd.category] = [];
                }

                const commandName = Object.keys(commandMap).find(key => commandMap[key] === cmd);
                if (commandName) {
                    categories[cmd.category].push({
                        name: commandName,
                        description: cmd.description
                    });
                }
            }
        });

        // Build command list
        for (const [category, commands] of Object.entries(categories)) {
            menu += `✨ *${category.toUpperCase()}*\n`;
            commands.forEach(cmd => {
                menu += `┣✦ !${cmd.name.padEnd(15)} ${cmd.description}\n`;
            });
            menu += "\n";
        }

        menu += `╰───────────────────⊷\nType *!help <command>* for more info`;

        await message.reply(menu);
        console.log(chalk.green(`[MENU] Sent stylish menu to ${message.from}`));

    } catch (error) {
        console.error(chalk.red(`[MENU ERROR] ${error.stack}`));
        await message.reply("❌ Failed to generate menu. Please try again later.");
    }
};

// Helper function to format uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    
    return `${days}d ${hours}h ${minutes}m`;
}