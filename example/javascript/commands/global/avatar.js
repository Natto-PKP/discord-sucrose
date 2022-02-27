module.exports = { 
  body: {
    name: 'avatar',
    description: 'Get member avatar',
    options: [
      {
        type: 'USER',
        name: 'user',
        description: 'Member to get avatar',
      },
    ],
  },
 
  exec: ({ interaction }) => {
    const member = interaction.options.getMember();
    const avatar = member.displayAvatarUrl({ dynamic: true });

    interaction.reply(`${member} avatar: ${avatar}`);
  },
};
