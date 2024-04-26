import { Player } from "discord-player";
import client from "./client.js";
import { SoundCloudExtractor, SpotifyExtractor, YouTubeExtractor } from "@discord-player/extractor";

const player = new Player(client, {
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
})
player.extractors.register(SpotifyExtractor, {});
player.extractors.register(YouTubeExtractor, {});
player.extractors.register(SoundCloudExtractor, {});

player.on("error", (error) => {
    console.error(`[${error.message}`);
});

player.on("debug", (message) => {
    console.log(`[${message}]`);
});

export default player;