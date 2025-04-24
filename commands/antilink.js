const antiLinkHandler = require('../lib/antiLinkHandler');

module.exports = async (client, message) => {
    await antiLinkHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Enable or disable anti-link feature";