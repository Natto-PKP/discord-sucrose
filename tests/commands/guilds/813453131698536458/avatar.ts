import type { UserContextMenu } from '../../../../typings/index';

export default <UserContextMenu>{
  body: {
    type: 'USER',
    name: 'avatar',
  },

  exec: ({ interaction }) => {
    const avatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });
    interaction.reply(`${interaction.user} avatar: ${avatar}`);
  },
};
