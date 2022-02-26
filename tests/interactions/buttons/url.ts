import type { Button } from '../../../typings/index';

export default <Button<'link'>>{
  data: {
    type: 'BUTTON',
    url: 'discord.com',
  },

  exec: ({ interaction }) => {
    interaction.reply('Yeeaaaaah !');
  },
};
