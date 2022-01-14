import { UserContextMenu } from 'src/structures/typings';

export default <UserContextMenu>{
  body: {
    type: 'USER',
    name: 'usercontext',
  },

  exec: async ({ interaction }) => {
    interaction.reply('This is User ContextMenu');
  },
};
