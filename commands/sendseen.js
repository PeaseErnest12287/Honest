const sendSeenHandler = require('../lib/sendSeenHandler');

module.exports = async (client, message) => {
    await sendSeenHandler(client, message);
};

module.exports.category = "Utility";
module.exports.description = "Send seen receipts for messages";