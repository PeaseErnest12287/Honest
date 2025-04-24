const welcomeHandler = require('../lib/welcomeHandler');

module.exports = async (client, message) => {
    await welcomeHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Set welcome message for new members";
