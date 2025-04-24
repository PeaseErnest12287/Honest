const banHandler = require('../lib/banHandler');

module.exports = async (client, message) => {
    await banHandler(client, message);
};

module.exports.category = "Admin";
module.exports.description = "Ban a user from the group";