const timeHandler = require('../lib/timeHandler');

module.exports = async (client, message) => {
    await timeHandler(client, message);
};

module.exports.category = "Utility";
module.exports.description = "Get the current time";