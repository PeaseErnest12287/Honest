const announceHandler = require('../lib/announceHandler');

module.exports = async (client, message) => {
    await announceHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Send an announcement to the group";