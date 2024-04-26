const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType, useMainPlayer } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from YouTube.")
        .addStringOption(option =>
            option.setName("input").setDescription("the song's name or url").setRequired(true)),
	execute: async ({ client, interaction }) => {
        // Make sure the user is inside a voice channel
		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");
        const player = useMainPlayer(client);
        const queue = player.nodes.create(interaction.guild, {
            metadata: {
                interaction: interaction,
                channel: interaction.channel,
                client: interaction.guild.members.me,
                requestedBy: interaction.user,
            },
            selfDeaf: true,
            volume: 80,
            leaveOnEmpty: true,
            leaveOnEnd: true,
        });

        let embed = new EmbedBuilder();

        const input = interaction.options.getString("input");

        // Search for the song
        const res = await player.search(input, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        // If there are no results, return
        if (!res || !res.tracks.length) return interaction.reply("No results found.");

        // Add the song to the queue
        queue.addTrack(res.tracks[0]);

        if(!queue.node.isPlaying) {
            queue.node.play();
        }



	},
}