import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { InteractionResponse } from "discord.js";
import { CommandInteraction, GuildMember, VoiceChannel } from 'discord.js';
import { AsyncQueue, QueryType, useMainPlayer } from "discord-player";
import BaseCommand, { ExecuteArgsType } from "../utils/BaseCommand";


export default class Play extends BaseCommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    
    constructor() {
        super();
        this.data = new SlashCommandBuilder()
            .setName("play")
            .setDescription("Play a song.")
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

        const server = interaction.guild;
        if (!server) return;

        // const queue = player.nodes.create(interaction.guild, {
        //     metadata: {
        //         interaction: interaction,
        //         channel: interaction.channel,
        //         client: interaction.guild?.members.me,
        //         requestedBy: interaction.user,
        //     },
        //     selfDeaf: true,
        //     volume: 100,
        //     leaveOnEmpty: true,
        //     leaveOnEnd: true,
        // });

        // await queue.connect(member.voice.channel as VoiceChannel);

        const embedBuilder = new EmbedBuilder();

        const input = interaction.options.get("input")?.value as string;

        const tracks = await this.search(input, member);

        if(!tracks) {
            return interaction.reply("No tracks found.");
        }

        player.play(member.voice.channel, tracks[0]);
        
        // queue.addTrack(tracks[0]);
        
        // if (!queue.isPlaying()) {
        //     queue.play(queue.tracks.data[0]);
        // }

        return interaction.reply({
            embeds: [
                embedBuilder
                    .setDescription(`Duration: ${tracks[0].duration}`)
                    .setThumbnail(tracks[0].thumbnail)
                    .setTitle(`${tracks[0].author} - ${tracks[0].title}`)
                    .setColor([255,0,0])
                    .setURL(tracks[0].url)
            ]
        });
    }

    private async search(input: string, user: GuildMember) {
        const searchEngines = [
            QueryType.YOUTUBE, 
            QueryType.SPOTIFY_SONG, 
            QueryType.SOUNDCLOUD, 
            QueryType.YOUTUBE_PLAYLIST, 
            QueryType.SPOTIFY_PLAYLIST
        ];
        const player = useMainPlayer();
        for (const searchEngine of searchEngines) {
            const { tracks } = await player.search(input, {
                requestedBy: user,
                searchEngine: searchEngine,
            });
            if (tracks.length > 0) {
                return tracks;
            }
        }
    }
}