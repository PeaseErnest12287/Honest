const axios = require('axios');
const { getApiKey } = require('../dependencies/weatherConfig');

module.exports = async (client, message) => {
    const parts = message.body.split(' ');
    const city = parts.slice(1).join(' ');

    if (!city) {
        await message.reply("🌧️ Please provide a city like: `!weather Nairobi`");
        return;
    }

    const apiKey = getApiKey();
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

    try {
        const response = await axios.get(url);
        const weather = response.data;

        const reply = `
🌍 Weather in *${weather.location.name}*, ${weather.location.country}:
🌡️ Temp: ${weather.current.temp_c}°C
💨 Condition: ${weather.current.condition.text}
🌬️ Wind: ${weather.current.wind_kph} km/h
🌧️ Humidity: ${weather.current.humidity}%
        `.trim();

        await message.reply(reply);
    } catch (err) {
        await message.reply("❌ Could not get weather. Please check the city name or try again.");
    }
};
