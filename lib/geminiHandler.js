const { GoogleGenerativeAI } = require("@google/generative-ai");
const chalk = require('chalk');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (client, message) => {
    try {
        const args = message.body.split(' ').slice(1).join(' ');
        
        if (!args) {
            return await message.reply("Please provide a query for Gemini. Usage: !gemini <query>");
        }
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(args);
        const response = await result.response;
        const text = response.text();
        
        await message.reply(`🤖 Gemini Response:\n\n${text}`);
        console.log(chalk.green(`[GEMINI] Responded to ${message.from}`));
    } catch (error) {
        console.error(chalk.red(`[GEMINI ERROR] ${error.message}`));
        await message.reply("Failed to get response from Gemini. Error: " + error.message);
    }
};