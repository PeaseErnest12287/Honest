const remindHandler = require('../lib/remindHandler');

module.exports = async (client, message) => {
    await remindHandler(client, message);
};

module.exports.category = "Utility";
module.exports.description = "Set a reminder";