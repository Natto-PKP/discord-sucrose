import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    type: 'SUB_COMMAND',
    name: 'cat',
    description: 'Get a cat image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include cat image>');
  },
};
