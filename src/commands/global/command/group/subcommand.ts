import { ChatInputSubCommand } from 'src/structures/typings';

export default <ChatInputSubCommand>{
  option: {
    type: 'SUB_COMMAND',
    name: 'subcommand',
    description: 'subcommand of a command group',
  },

  exec: async ({ interaction }) => {
    interaction.reply('This is a subcommand of group');
  },
};
