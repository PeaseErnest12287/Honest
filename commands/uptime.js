const uptimeHandler = require('../lib/uptimeHandler');

module.exports = async (client, message) => {
    await uptimeHandler(client, message);
};

module.exports.category = "Utilities";
module.exports.description = "Show bot uptime";