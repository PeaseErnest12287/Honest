const createGroupHandler = require('../lib/createGroupHandler');

module.exports = async (client, message) => {
    await createGroupHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Create a new group"