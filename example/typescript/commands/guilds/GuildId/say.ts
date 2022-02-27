import type { ChatInput } from 'discord-sucrose';

export default <ChatInput>{
  body: {
    name: 'say',
    description: 'say say say say say say',
  },

  exec: ({ interaction }) => {
    interaction.reply('say say say ?');
  },
};