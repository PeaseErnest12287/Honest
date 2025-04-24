const autoStatusHandler = require('../lib/autoStatusHandler');

module.exports = async (client, message) => {
    const { autoStatusEnabled } = require('../ernest');
    await autoStatusHandler(client, message, autoStatusEnabled);
};

module.exports.category = "Utilities";
module.exports.description = "Toggle automatic status viewing";