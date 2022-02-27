module.exports = {
  option: {
    name: 'random',
    description: 'Get random number between 0 and 100',
  },

  exec: ({ interaction }) => {
    interaction.reply(Math.ceil(Math.random() * 100))
  },
};
