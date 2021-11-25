import { Button } from 'src/typings';

export = <Button<'base'>>{
  data: {
    customId: 'useme',
    label: 'Use me',
    style: 'PRIMARY',
  },

  exec: ({ interaction }) => {
    interaction.reply('Yeaaah !');
  },
};
