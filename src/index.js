require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Player, useMainPlayer } = require("discord-player");
const player = require("./player");
const client = require("./client");

const commands = [];
client.commands = new Collection();
const commmandsPath = path.join(__dirname,"..", "commands");
const commandsFolder = fs.readdirSync(commmandsPath).filter(file => file.endsWith(".js"));

for (const file of commandsFolder) {
    const command = require(path.join(commmandsPath, file));
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}


client.player = player;


client.on("ready", async () => {
    console.log('ready');
    const guild_ids = client.guilds.cache.map(guild => guild.id);
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    for(const guildId of guild_ids) {
        try {
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
                { body: commands },
            );
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