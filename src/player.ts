import { Player } from "discord-player";
import client from "./client.js";

const player = new Player(client, {
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
})
// player.extractors.register(SpotifyExtractor);
// player.extractors.register(YouTubeExtractor);
// player.extractors.register(SoundCloudExtractor);

export default player;