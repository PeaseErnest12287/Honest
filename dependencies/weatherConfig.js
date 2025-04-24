require('dotenv').config();

module.exports = {
    getApiKey: () => process.env.WEATHER_API_KEY
};
