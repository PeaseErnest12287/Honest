const chalk = require('chalk');
const axios = require('axios');

module.exports = async (client, message) => {
    try {
        const word = message.body.split('!define ')[1];
        if (!word) {
            return await message.reply("Please provide a word to define!");
        }

        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const definition = response.data[0].meanings[0].definitions[0].definition;

        await message.reply(`📖 Definition of *${word}*: ${definition}`);
        console.log(chalk.green(`[DEFINE] Fetched definition for: ${word}`));
    } catch (error) {
        console.error(chalk.red(`[DEFINE ERROR] ${error.message}`));
        await message.reply("Failed to define the word");
    }
};