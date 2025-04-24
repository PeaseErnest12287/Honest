const chalk = require('chalk');
const axios = require('axios');

module.exports = async (client, message) => {
    try {
        const args = message.body.split(' ');
        if (args.length < 4 || args[2].toLowerCase() !== 'to') {
            return await message.reply("Usage: !convert [amount] [from] to [to]");
        }

        const amount = parseFloat(args[1]);
        const fromCurrency = args[2].toUpperCase();
        const toCurrency = args[4].toUpperCase();

        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        
        if (!rate) {
            return await message.reply("Invalid currency code");
        }

        const converted = (amount * rate).toFixed(2);
        await message.reply(`💰 ${amount} ${fromCurrency} = ${converted} ${toCurrency}`);
        console.log(chalk.green(`[CONVERT] Converted ${fromCurrency} to ${toCurrency}`));
    } catch (error) {
        console.error(chalk.red(`[CONVERT ERROR] ${error.message}`));
        await message.reply("Failed to convert currencies. Check your inputs.");
    }
};