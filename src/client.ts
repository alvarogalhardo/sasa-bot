import { Client, Collection, GatewayIntentBits } from "discord.js";
import MyClient from "./utils/MyClient";

const client = new Client({
    intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
        ],
}) as MyClient;

export default client;