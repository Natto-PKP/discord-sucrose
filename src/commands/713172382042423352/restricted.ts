import { Command } from 'src/typings';

export = <Command>{ 
  permissions: { user: ['ADMINISTRATOR'] },

  body: {
    name: 'restricted',
    description: 'test command with permissions',
  },

  exec: ({ interaction }) => {
    interaction.reply('(restricted) Hello world !');
  },
};
