import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  // body indique le corp de la commande qui sera envoyer à l'API
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

  // Cette fonction sera envoyée a chaque appel de la commande
  exec: ({ interaction }) => {
    const member = interaction.options.getMember();
    const avatar = member.displayAvatarUrl({ dynamic: true });

    interaction.reply(`${member} avatar: ${avatar}`);
  },
};
