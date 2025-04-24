const storageInfoHandler = require('../lib/storageInfoHandler');

module.exports = async (client, message) => {
    await storageInfoHandler(client, message);
};

module.exports.category = "System";
module.exports.description = "Check storage information";