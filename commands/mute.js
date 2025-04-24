const muteHandler = require('../lib/muteHandler');

module.exports = async (client, message) => {
    await muteHandler(client, message);
};

module.exports.category = "Admin";
module.exports.description = "Mute a user for a specified time";