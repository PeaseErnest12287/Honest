const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const chalk = require("chalk");

// ✨ Logger function
const log = (type, msg) => {
  const stamp = new Date().toISOString();
  const label =
    {
      info: chalk.blue("[INFO]"),
      error: chalk.red("[ERROR]"),
      ready: chalk.green("[READY]"),
      warn: chalk.yellow("[WARN]"),
    }[type.toLowerCase()] || chalk.white("[LOG]");
  console.log(`${stamp} ${label} ${msg}`);
};

// ⚙️ WhatsApp Client Setup
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "./auth",
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"],
  },
});

// 📦 Command imports
const helpCommand = require("./commands/help");
const pingCommand = require("./commands/ping");
const weatherCommand = require("./commands/weather");
const tagAllCommand = require("./commands/tagAll");
const menuCommand = require("./commands/menu");
const geminiCommand = require("./commands/gemini");
const autoStatusCommand = require("./commands/autoStatus");
const sendReadCommand = require("./commands/sendread");
const statusEmojiCommand = require("./commands/statusemoji");
const banCommand = require("./commands/ban");
const muteCommand = require("./commands/mute");
const pollCommand = require("./commands/poll");
const antilinkCommand = require("./commands/antilink");
const promoteCommand = require("./commands/promote");
const demoteCommand = require("./commands/demote");

const openGroupCommand = require("./commands/openGroup");
const listOnlineCommand = require("./commands/listOnline");
const createGroupCommand = require("./commands/createGroup");
const welcomeCommand = require("./commands/welcome");
const leavegcCommand = require("./commands/leavegc");
const inviteCommand = require("./commands/invite");
const announceCommand = require("./commands/announce");
const convertCommand = require("./commands/convert");
const timeCommand = require("./commands/time");
const remindCommand = require("./commands/remind");
const defineCommand = require("./commands/define");

const uptimeCommand = require("./commands/uptime");
const aliveCommand = require("./commands/alive");
const storageInfoCommand = require("./commands/storageinfo");

const commandMap = {
  "!help": helpCommand,
  "!ping": pingCommand,
  ".weather": weatherCommand,
  "!tagall": tagAllCommand,
  "!menu": menuCommand,
  "!gemini": geminiCommand,
  "!autostatus": autoStatusCommand,
  "!sendread": sendReadCommand,
  "!statusemoji": statusEmojiCommand,
  "!ban": banCommand,
  "!mute": muteCommand,
  "!poll": pollCommand,
  "!antilink": antilinkCommand,
  "!promote": promoteCommand,
  "!demote": demoteCommand,
  
  "!opengroup": openGroupCommand,
  
  "!creategroup": createGroupCommand,
  "!welcome": welcomeCommand,
  "!leavegc": leavegcCommand,
  "!invite": inviteCommand,
  "!announce": announceCommand,
  "!convert": convertCommand,
  "!time": timeCommand,
  "!remind": remindCommand,
  "!define": defineCommand,
 
  "!uptime": uptimeCommand,
  "!alive": aliveCommand,
  "!storageinfo": storageInfoCommand,
};

// Configurations
let autoStatusEnabled = false;
let sendReadEnabled = false;
let statusEmoji = "❤️";

// 🧠 Main logic starter
const startErnest = () => {
  client.on("qr", (qr) => {
    log("info", "QR Code generated. Scan it with your soul.");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    log("ready", "Connection established. Ernest is alive.");
  });

  client.on("message", async (message) => {
    try {
      const msgText = message.body.trim();
      const cmd = msgText.split(" ")[0].toLowerCase();

      if (commandMap[cmd]) {
        await commandMap[cmd](client, message);
      }

      if (sendReadEnabled) {
        await message.sendSeen();
      }
    } catch (err) {
      log("error", `Failed to process message: ${err.message}`);
    }
  });

  client.on("message_create", async (message) => {
    try {
      const msgText = message.body.trim();
      const cmd = msgText.split(" ")[0].toLowerCase();

      if (commandMap[cmd]) {
        await commandMap[cmd](client, message);
      }
    } catch (err) {
      log("error", `Failed to process your own message: ${err.message}`);
    }
  });
  client.on("group_join", async (notification) => {
    try {
      const chatId = notification.chatId;
      const userId = notification.author;
      await welcomeHandler.sendWelcome(client, chatId, userId);
    } catch (error) {
      log("error", `Failed to send welcome: ${error.message}`);
    }
  });
  setInterval(async () => {
    if (autoStatusEnabled) {
      try {
        // Status viewing logic would go here
      } catch (err) {
        log("error", `Failed to check statuses: ${err.message}`);
      }
    }
  }, 60000);

  log("info", "Initializing WhatsApp client...");
  client.initialize();
};

module.exports = {
  startErnest,
  autoStatusEnabled,
  sendReadEnabled,
  statusEmoji,
  commandMap,
};
