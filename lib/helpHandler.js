module.exports = async (client, message) => {
    const helpText = `
🌟 *Ernest Bot Commands* 🌟

👉 \`!help\` - Display this message
🌦️ \`!weather <city>\` - Get current weather
🏓 \`!ping\` - Pong!

More commands coming soon. Stay epic 😎
    `.trim();

    await message.reply(helpText);
};
