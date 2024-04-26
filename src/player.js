const { Player } = require("discord-player")
const client = require("./client.js")

const player = new Player(client, {
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
})

player.extractors.loadDefault().then(() => {;

module.exports = player;

});