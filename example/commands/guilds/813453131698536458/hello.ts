import type { ChatInput } from '../../../../typings/index';

export default <ChatInput>{
  permissions: {
    user: ['MANAGE_GUILD', 'STREAM'],
    client: 'SEND_MESSAGES',
  },

  body: {
    name: 'hello',
    description: 'Say hello',
  },

  exec: ({ interaction }) => {
    interaction.reply('Hiii !');
  },
};
