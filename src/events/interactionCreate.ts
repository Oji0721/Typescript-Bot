import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../structures/types";

export default new Event("interactionCreate", async (interaction: ExtendedInteraction) => {
    // Chat Input Commands
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        try {
            if (!command)
                return interaction.reply({ content: "You have used a non existent command", ephemeral: true });

            command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction
            });
        } catch (error) {
            interaction.reply({ content: 'There is an error while executing this command.', ephemeral: true })
        }
    }
});
