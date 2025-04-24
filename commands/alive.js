const aliveHandler = require('../lib/aliveHandler');

module.exports = async (client, message) => {
    await aliveHandler(client, message);
};

module.exports.category = "Utility";
module.exports.description = "Check if the bot is alive";