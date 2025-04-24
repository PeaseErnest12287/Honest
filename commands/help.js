const helpHandler = require('../lib/helpHandler');

module.exports = async (client, message) => {
    await helpHandler(client, message);
};
module.exports.category = "Assistance";
module.exports.description = "Shows how to use the bot";