const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const chalk = require("chalk");
const boxen = require("boxen").default; // Fix: Use .default for ES modules

// 🎨 Stylish logger function with boxes
const log = (type, msg) => {
  const colors = {
    info: { color: chalk.blue, label: "[INFO]", border: "blue" },
    error: { color: chalk.red, label: "[ERROR]", border: "red" },
    ready: { color: chalk.green, label: "[READY]", border: "green" },
    warn: { color: chalk.yellow, label: "[WARN]", border: "yellow" },
    event: { color: chalk.magenta, label: "[EVENT]", border: "magenta" },
    debug: { color: chalk.cyan, label: "[DEBUG]", border: "cyan" }
  };
  
  const style = colors[type.toLowerCase()] || { color: chalk.white, label: "[LOG]", border: "white" };

  // Add a timestamp or any other string as a stamp
  const stamp = `[${new Date().toLocaleTimeString()}]`;  // Simple timestamp

  
  const boxOptions = {
    padding: 1,
    margin: 1,
    borderStyle: type === 'ready' ? 'double' : 'round',
    borderColor: style.border,  // ✅ Now it's just a string like "green"
    backgroundColor: '#1a1a1a'
  };
  

  const content = `${stamp} ${style.color(style.label)} ${msg}`;
  console.log(boxen(content, boxOptions));
};

// 🎉 Fancy startup logs
const showStartupBanner = () => {
  const banner = chalk.bold.hex('#FFA500')(
    `╔══════════════════════════════╗
     ║                              ║
     ║   E R N E S T   B O T   v2   ║
     ║                              ║
     ╚══════════════════════════════╝`
  );
  
  const box = boxen(banner, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: 'yellow',
    backgroundColor: '#1a1a1a'
  });
  
  console.log(box);
  log("event", "Initializing Ernest...");
  log("debug", "Checking system dependencies...");
  log("info", "Loading command modules...");

  console.log(box);
  log("event", "Initializing Ernest...");
  log("debug", "Checking system dependencies...");
  log("info", "Loading command modules...");
};

// Rest of your code remains exactly the same...
  

// ⚙️ WhatsApp Client Setup
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "./auth",
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  }
});

// 📦 Command imports
const helpCommand = require("./commands/help");
const pingCommand = require("./commands/ping");
const weatherCommand = require("./commands/weather");
const tagAllCommand = require("./commands/tagall");
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

// 🗺️ Command Map
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
  "!listonline": listOnlineCommand,
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

// 🛠️ Command Processor (prevents duplicate execution)
const processedMessages = new Set();

const processCommand = async (message) => {
  const messageId = message.id._serialized;
  
  // Skip if already processed
  if (processedMessages.has(messageId)) {
    log("debug", `Skipping duplicate message: ${messageId}`);
    return;
  }
  processedMessages.add(messageId);
  
  // Clean up old message IDs
  if (processedMessages.size > 1000) {
    const oldestId = Array.from(processedMessages).shift();
    processedMessages.delete(oldestId);
    log("debug", `Cleaned up old message ID: ${oldestId}`);
  }

  try {
    const msgText = message.body.trim();
    const cmd = msgText.split(" ")[0].toLowerCase();

    if (commandMap[cmd]) {
      log("event", `📩 Processing command: ${chalk.bold(cmd)} from ${message.from}`);
      await commandMap[cmd](client, message);
    }

    if (sendReadEnabled) {
      await message.sendSeen();
      log("debug", `Marked message as read: ${messageId}`);
    }
  } catch (err) {
    log("error", `Command failed: ${err.message}`);
    await message.reply("❌ An error occurred while processing your command.");
  }
};

// � QR Code Generator with better formatting
const showQR = (qr) => {
  log("info", "🔑 Scan this QR code with your phone:");
  
  // Custom QR code options
  qrcode.generate(qr, {
    small: true,
    scale: 4,
    margin: 2,
    color: {
      dark: '#FFA500',  // Orange
      light: '#1a1a1a'  // Dark background
    }
  });
  
  log("warn", "⏳ QR code will expire in 60 seconds...");
};

// 🧠 Main Event Handlers
const setupEventHandlers = () => {
  client.on("qr", showQR);

  client.on("ready", () => {
    log("ready", chalk.bold.green("🚀 ERNEST IS NOW OPERATIONAL!"));
    log("info", "📊 All systems green. Awaiting commands...");
    log("debug", `📦 Loaded ${Object.keys(commandMap).length} commands`);
  });

  client.on("authenticated", () => {
    log("event", "🔓 Authentication successful! Connecting...");
  });

  client.on("auth_failure", (msg) => {
    log("error", `🔐 Authentication failed: ${msg}`);
  });

  client.on("disconnected", (reason) => {
    log("warn", `⚠️ Disconnected: ${reason}`);
    log("info", "♻️ Attempting to reconnect...");
    client.initialize();
  });

  client.on("message", processCommand);
  client.on("message_create", processCommand);

  client.on("group_join", async (notification) => {
    log("event", `👋 New member joined: ${notification.author}`);
    try {
      const chatId = notification.chatId;
      const userId = notification.author;
      await welcomeCommand(client, chatId, userId);
    } catch (error) {
      log("error", `❌ Welcome message failed: ${error.message}`);
    }
  });

  client.on("group_leave", async (notification) => {
    log("event", `👋 Member left: ${notification.author}`);
  });
};

// ⏱️ Auto-status monitoring
const startStatusMonitor = () => {
  setInterval(async () => {
    if (autoStatusEnabled) {
      try {
        log("debug", "🔍 Auto-status check running...");
        // Add your status checking logic here
      } catch (err) {
        log("error", `❌ Status check failed: ${err.message}`);
      }
    }
  }, 60000);
};

// 🧠 Main initialization
const startErnest = () => {
  showStartupBanner();
  setupEventHandlers();
  startStatusMonitor();
  
  log("info", "⚡ Initializing WhatsApp client...");
  client.initialize();
};

module.exports = {
  startErnest,
  autoStatusEnabled,
  sendReadEnabled,
  statusEmoji,
  commandMap,
};