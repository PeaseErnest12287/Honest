const demoteHandler = require('../lib/demoteHandler');

module.exports = async (client, message) => {
    await demoteHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Demote a user from admin in the group";