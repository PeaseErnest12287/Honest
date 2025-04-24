const listOnlineHandler = require('../lib/listOnlineHandler');

module.exports = async (client, message) => {
    await listOnlineHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "List online members in the group";