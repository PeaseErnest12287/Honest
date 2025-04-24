const weatherHandler = require('../lib/weatherHandler');

module.exports = async (client, message) => {
    await weatherHandler(client, message);
};
module.exports.category = "weather";
module.exports.description = "Know the current weather details of somehwere";