const chalk = require('chalk');
const moment = require('moment-timezone');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        if (chat.isGroup) {
            // Get group metadata
            const groupName = chat.name;
            const participants = chat.participants;
            const creationDate = moment(chat.createdAt).format('MMMM Do YYYY');
            const totalMembers = participants.length;
            
            // Prepare mentions and text
            let mentions = [];
            let memberList = "";
            
            participants.forEach((participant, index) => {
                mentions.push(participant.id._serialized);
                const number = `${index + 1}.`.padEnd(4);
                memberList += `┃❃│ ${number} @${participant.id.user}\n`;
            });

            // Create stylish box
            const tagAllMessage = `
══✪ GROUP MEMBERS ✪══⊷
┃❃╭──────────────
┃❃│ Group: ${groupName}
┃❃│ Members: ${totalMembers}
┃❃│ Created: ${creationDate}
┃❃╰───────────────
╰─────⊷ *MEMBERS* ⊷─────
${memberList}
╰══════════════════⊷
*📢 Attention everyone!*`;

            await chat.sendMessage(tagAllMessage, { mentions });
            console.log(chalk.green(`[TAGALL] Tagged ${totalMembers} members in ${groupName}`));
        } else {
            await message.reply("🚫 This command only works in groups!");
        }
    } catch (error) {
        console.error(chalk.red(`[TAGALL ERROR] ${error.stack}`));
        await message.reply("❌ Failed to tag members. I might not have permission.");
    }
};