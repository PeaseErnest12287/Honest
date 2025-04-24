const chalk = require('chalk');

module.exports = async (client, message) => {
  try {
    await message.reply('🏓 Pong!');
    console.log(chalk.green(`[PING] Replied to ${message.from}`));
  } catch (error) {
    console.error(chalk.red(`[PING ERROR] ${error.message}`));
  }
};
