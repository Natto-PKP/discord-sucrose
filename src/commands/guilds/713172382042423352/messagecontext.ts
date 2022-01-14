import { MessageContextMenu } from 'src/structures/typings';

export default <MessageContextMenu>{
  body: {
    type: 'MESSAGE',
    name: 'messagecontext',
  },

  exec: async ({ interaction }) => {
    interaction.reply('This is Message ContextMenu');
  },
};
