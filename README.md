
# Sasa Bot


## Features

- Play music from popular streaming platforms such as YouTube, Spotify, and SoundCloud.
- Control the playback with commands like play, pause, skip, and volume control.
- Create playlists and manage your music library.
- Support for various audio formats and streaming qualities.
- Customizable settings and permissions for different server roles.

## Installation

To install and run the Sasa Bot, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/sasa-bot.git
    ```

2. Install the required dependencies:

    ```bash
    cd sasa-bot
    npm install
    ```

3. Configure the bot:

    - Create a new Discord application and obtain the bot token.
    - Copy the `.env.example` file to `.env` and update the `TOKEN` variable with your bot token.

4. Start the bot:

    ```bash
    npm start
    ```

5. Invite the bot to your Discord server:

    - Go to the Discord Developer Portal and select your application.
    - Navigate to the "OAuth2" section.
    - Select the necessary bot permissions and copy the generated invite link.
    - Paste the invite link in your web browser and follow the instructions to add the bot to your server.

## Usage

Once the Sasa Bot is installed and running, you can use the following commands to control the music playback:

- `/play <song>`: Play a song or add it to the queue.
- `/pause`: Pause the current playback.
- `/resume`: Resume the paused playback.
- `/skip`: Skip the current song.
- `/queue`: show the queue.

For a complete list of available commands, use the `/help` command.

## Contributing

Contributions to the Sasa Bot project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.