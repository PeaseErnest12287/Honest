const leaveGroupHandler = require('../lib/leaveGroupHandler');

module.exports = async (client, message) => {
    await leaveGroupHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Leave the current group"