import { SelectMenu } from 'src/structures/typings';

export = <SelectMenu>{
  data: {
    customId: 'selectme',
    options: [{ label: 'here !', value: 'here' }],
  },

  exec: ({ interaction }) => {
    interaction.reply('Heeeeeeere !');
  },
};
