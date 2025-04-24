const openGroupHandler = require('../lib/openGroupHandler');

module.exports = async (client, message) => {
    await openGroupHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Open the group to new participants";