import type { Button } from '../../../typings/index';

export default <Button<'base'>>{
  data: {
    type: 'BUTTON',
    customId: 'useme',
    style: 'DANGER',
  },

  exec: ({ interaction }) => {
    interaction.reply('Yeeaaaaah !');
  },
};
