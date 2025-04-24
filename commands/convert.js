const convertHandler = require('../lib/convertHandler');

module.exports = async (client, message) => {
    await convertHandler(client, message);
};

module.exports.category = "Utilities";
module.exports.description = "Convert currencies";