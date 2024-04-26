import {
    AutocompleteInteraction,
    ButtonInteraction,
    ChatInputCommandInteraction,
    Interaction,
    InteractionResponse,
    SlashCommandBuilder,
} from "discord.js";
import MyClient from "./MyClient";

export type ExecuteArgsType = {
    client: MyClient;
    interaction: Interaction;
};

/**
 * Base class for all slash commands
 * @class BaseCommand
 */
abstract class BaseCommand {
    /**
     * The data for the slash command
     * @type {SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | undefined}
     */
    data:
        | SlashCommandBuilder
        | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> //idk why Omit is needed but it is
        | undefined = undefined;

    /**
     * constructor for BaseCommand
     * @constructor
     */
    constructor(data?: SlashCommandBuilder) {
        this.data = data;
    }

    /**
     * default run handler
     *
     * @param interaction interaction object for slash commands
     * @returns void
     */
    async execute(args: ExecuteArgsType): Promise<void | InteractionResponse> {
        console.error("This method has not been implemented");
    }

    /**
     *  default autocomplete handler
     *
     * @param interaction autocomplete interaction object for autocomplete commands
     * @returns void
     */
    async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
        console.error("This method has not been implemented");
    }

    /**
     * default button handler
     *
     * @param interaction button interaction object for button commands
     * @returns void
     */
    async button(interaction: ButtonInteraction): Promise<void> {
        console.error("This method has not been implemented");
    }
}

export default BaseCommand;