import { Command } from 'src/typings';

export = <Command>{
  options: { global: true },
  body: {
    name: 'hello',
    description: 'test command',
  },

  exec: ({ interaction }) => {
    interaction.reply('Hello world !');
  },
};
