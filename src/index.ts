import BaseCommand from "./utils/BaseCommand";
import { config } from "dotenv";
import { Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { useMainPlayer } from "discord-player";
import client from "./client";
require("./player");
config();

const commands = new Collection<string,BaseCommand>();
client.commands = new Collection<string, BaseCommand>();
const commmandsPath = path.join(__dirname,"commands");

const commandsFolder = fs.readdirSync(commmandsPath);

for (const file of commandsFolder) {
    const command = require(path.join(commmandsPath, file)).default;
    const cmd = new command();
    commands.set(cmd.data.name, cmd.data);
    client.commands.set(cmd.data.name, cmd);
}


client.on("ready", async () => {
    const player = useMainPlayer();
    const guild_ids = client.guilds.cache.map(guild => guild.id);
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);
    for(const guildId of guild_ids) {
        try {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID as string, guildId),
                { body: commands },
            );
            await player.extractors.loadDefault();
            console.log("Successfully registered application commands.");
        } catch (error) {
            console.error(error);
        }
    }
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute({client,interaction});
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
});

client.login(process.env.TOKEN);