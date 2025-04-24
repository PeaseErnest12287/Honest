const chalk = require('chalk');

module.exports = async (client, message, autoStatusEnabled) => {
    try {
        const args = message.body.split(' ').slice(1);
        
        if (args[0] === 'on') {
            autoStatusEnabled = true;
            await message.reply("Auto status viewer enabled ✅");
            console.log(chalk.green(`[AUTOSTATUS] Enabled by ${message.from}`));
        } else if (args[0] === 'off') {
            autoStatusEnabled = false;
            await message.reply("Auto status viewer disabled ❌");
            console.log(chalk.yellow(`[AUTOSTATUS] Disabled by ${message.from}`));
        } else {
            await message.reply(`Auto status viewer is currently ${autoStatusEnabled ? 'enabled ✅' : 'disabled ❌'}\n\nUsage: !autostatus <on/off>`);
        }
    } catch (error) {
        console.error(chalk.red(`[AUTOSTATUS ERROR] ${error.message}`));
        await message.reply("Failed to update auto status setting");
    }
};