import type { SelectMenu } from 'discord-sucrose';

export default <SelectMenu>{
  data: {
    type: 'SELECT_MENU',
    customId: 'selectme',
    placeholder: 'Select me !',
    options: [
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
      { label: 'I love ferret !', value: 'ferret' },
    ],
  },

  exec: ({ interaction }) => {
    interaction.reply('I LOVE FERRET !!!');
  },
};
