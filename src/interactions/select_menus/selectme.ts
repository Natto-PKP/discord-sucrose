import { SelectMenu } from 'src/typings';

export = <SelectMenu>{
  data: {
    customId: 'selectme',
    options: [{ label: 'here !', value: 'here' }],
  },

  exec: ({ interaction }) => {
    interaction.reply('Heeeeeeere !');
  },
};
