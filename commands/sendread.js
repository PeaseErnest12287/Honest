const sendReadHandler = require('../lib/sendReadHandler');

module.exports = async (client, message) => {
    await sendReadHandler(client, message);
};

module.exports.category = "Utility";
module.exports.description = "Send read receipts for messages";