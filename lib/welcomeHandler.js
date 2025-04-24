const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const welcomeDataPath = path.join(__dirname, '../data/welcome.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(welcomeDataPath))) {
    fs.mkdirSync(path.dirname(welcomeDataPath), { recursive: true });
}

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply("This command only works in groups!");
        }

        const welcomeMessage = message.body.split('!welcome ')[1] || "Welcome @mention to the group!";

        let welcomeData = {};
        if (fs.existsSync(welcomeDataPath)) {
            welcomeData = JSON.parse(fs.readFileSync(welcomeDataPath));
        }

        welcomeData[chat.id._serialized] = welcomeMessage;
        fs.writeFileSync(welcomeDataPath, JSON.stringify(welcomeData));

        await message.reply(`Welcome message set! New members will now see: "${welcomeMessage}"`);
        console.log(chalk.green(`[WELCOME] Set welcome in ${chat.name}`));
    } catch (error) {
        console.error(chalk.red(`[WELCOME ERROR] ${error.message}`));
        await message.reply("Failed to set welcome message");
    }
};

// Helper function to be called when new member joins
module.exports.sendWelcome = async (client, chatId, userId) => {
    try {
        if (!fs.existsSync(welcomeDataPath)) return;
        
        const welcomeData = JSON.parse(fs.readFileSync(welcomeDataPath));
        const welcomeMessage = welcomeData[chatId];
        
        if (welcomeMessage) {
            const chat = await client.getChatById(chatId);
            const user = await client.getContactById(userId);
            const formattedMessage = welcomeMessage.replace('@mention', `@${user.id.user}`);
            await chat.sendMessage(formattedMessage);
        }
    } catch (error) {
        console.error(chalk.red(`[WELCOME SEND ERROR] ${error.message}`));
    }
};