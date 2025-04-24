const pollHandler = require('../lib/pollHandler');

module.exports = async (client, message) => {
    await pollHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Create a poll in the group";