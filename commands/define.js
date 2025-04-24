const defineHandler = require('../lib/defineHandler');

module.exports = async (client, message) => {
    await defineHandler(client, message);
};

module.exports.category = "Utility";
module.exports.description = "Define a word";