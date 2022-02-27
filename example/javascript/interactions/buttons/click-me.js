module.exports = {
  data: {
    type: 'BUTTON',
    customId: 'useme',  
    style: 'DANGER',  
  },
 
  exec: ({ interaction }) => {
    interaction.reply('Yeeaaaaah !');
  },
};
