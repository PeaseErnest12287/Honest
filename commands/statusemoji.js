const statusEmojiHandler = require('../lib/statusEmojiHandler');

module.exports = async (client, message) => {
    await statusEmojiHandler(client, message);
};

module.exports.category = "Utility";
module.exports.description = "Set a status emoji";