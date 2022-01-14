import { ChatInput } from 'src/structures/typings';

export default <ChatInput>{
  body: {
    name: 'hello',
    description: 'test command',
  },

  exec: async ({ interaction, sucrose }) => {
    const button = sucrose.interactions.buttons.get('useme');
    const url = sucrose.interactions.buttons.get('https://google.com');
    const selectMenu = sucrose.interactions.selectMenus.get('selectme');
    if (!button || !selectMenu || !url) return;

    interaction.reply({
      content: 'Hello world !',
      components: [
        { type: 'ACTION_ROW', components: [button.data, url.data] },
        { type: 'ACTION_ROW', components: [selectMenu.data] },
      ],
    });
  },
};
