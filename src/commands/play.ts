import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { InteractionResponse } from "discord.js";
import { CommandInteraction, GuildMember, VoiceChannel } from 'discord.js';
import { QueryType, useMainPlayer } from "discord-player";
import BaseCommand, { ExecuteArgsType } from "../utils/BaseCommand";

export default class Play extends BaseCommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    
    constructor() {
        super();
        this.data = new SlashCommandBuilder()
            .setName("play")
            .setDescription("play a song from YouTube.")
            .addStringOption(option =>
                option.setName("input").setDescription("the song's name or url").setRequired(true));
    }

    async execute({ client, interaction }: ExecuteArgsType): Promise<InteractionResponse | void> {
        // Make sure the interaction is a command interaction
        if (!(interaction instanceof CommandInteraction)) return;
        // Make sure the user is inside a voice channel
        const member = interaction.member;
        if (!(member instanceof GuildMember) || !member.voice.channel) {
            return interaction.reply("You need to be in a Voice Channel to play a song.");
        }

        const player = useMainPlayer();

        const guild = interaction.guild;
        if (!guild) return;

        const queue = player.nodes.create(interaction.guild, {
            metadata: {
                interaction: interaction,
                channel: interaction.channel,
                client: interaction.guild?.members.me,
                requestedBy: interaction.user,
            },
            selfDeaf: true,
            volume: 80,
            leaveOnEmpty: true,
            leaveOnEnd: true,
        });

        let embed = new EmbedBuilder();

        const input = interaction.options.get("input")?.value as string;

        // Search for the song
        const { tracks } = await player.search(input, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        player.play(member.voice.channel as VoiceChannel, tracks[0]);
        return interaction.reply({
            embeds: [
                embed
                    .setDescription(`Added to queue ${tracks[0].title}`)
                    .setThumbnail(tracks[0].thumbnail)
            ]
        });
    }
}