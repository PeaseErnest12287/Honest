const tagAllHandler = require('../lib/tagAllHandler');

module.exports = async (client, message) => {
    await tagAllHandler(client, message);
};

module.exports.category = "Group";
module.exports.description = "Tag all group members";