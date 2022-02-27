import type { SubCommand } from 'discord-sucrose';

export default <SubCommand>{
  option: {
    type: 'SUB_COMMAND',
    name: 'ferret',
    description: 'Get a ferret image',
  },

  exec: ({ interaction }) => {
    interaction.reply('<Include ferret image>');
  },
};
