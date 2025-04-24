const geminiHandler = require('../lib/geminiHandler');

module.exports = async (client, message) => {
    await geminiHandler(client, message);
};

module.exports.category = "AI";
module.exports.description = "Get responses from Google's Gemini AI";