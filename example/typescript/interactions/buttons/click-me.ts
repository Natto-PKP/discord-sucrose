import type { Button } from 'discord-sucrose';

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
