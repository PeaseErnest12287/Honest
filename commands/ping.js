const pingHandler = require('../lib/pinghandler');

module.exports = async (client, message) => {
    await pingHandler(client, message);
};

module.exports.category = "Utilities";
module.exports.description = "Check if the bot is alive";