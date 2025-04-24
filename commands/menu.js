const menuHandler = require('../lib/menuHandler');

module.exports = async (client, message) => {
    await menuHandler(client, message, require('../ernest').commandMap);
};

module.exports.category = "Utilities";
module.exports.description = "Show all available commands";