const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
        ],
});

module.exports = client;