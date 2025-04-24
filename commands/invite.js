const inviteHandler = require('../lib/inviteHandler');

module.exports = async (client, message) => {
    await inviteHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Generate an invite link for the group";