import type { SubCommand } from 'discord-sucrose';

const choices = ['rock', 'paper', 'couic'];

export default <SubCommand>{
  option: {
    name: 'rock',
    description: 'Play rock, paper or couic',
    options: [
      {
        type: 'STRING',
        name: 'choice',
        description: 'rock, paper or couic ?',
        choices: [
          { name: 'rock', value: 'rock' },
          { name: 'paper', value: 'paper' },
          { name: 'couic', value: 'couic' },
        ],
      },
    ],
  },

  exec: ({ interaction }) => {
    const user = interaction.options.getString('choice');
    const bot = choices[Math.floor(Math.random() * choices.length)];

    // ...
  },
};
