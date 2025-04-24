const promoteHandler = require('../lib/promoteHandler');

module.exports = async (client, message) => {
    await promoteHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Promote a user to admin in the group";