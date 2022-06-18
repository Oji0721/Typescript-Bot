import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    description: "replies with pong",
    type: 'ChatInput',
    options: [
      {
        name: 'ephemeral',
        description: 'ephemeral is true',
        type: 'Boolean',
      }
    ],
  
    run: async ({ interaction, args }) => {
        const ephemeral = args.getBoolean('ephemeral');
        interaction.reply({ content: 'Pong', ephemeral: ephemeral });
    }
});
