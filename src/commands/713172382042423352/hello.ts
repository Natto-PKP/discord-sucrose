import { Command } from 'src/typings';

export = <Command>{ 
  body: {
    name: 'hello',
    description: 'test command',
  },

  exec: async ({ interaction, sucrose }) => {
    const button = sucrose.interactions.buttons.get('useme');
    const url = sucrose.interactions.buttons.get('https://google.com');
    const select_menu = sucrose.interactions.select_menus.get('selectme');
    if (!button || !select_menu || !url) return;

    interaction.reply({
      content: 'Hello world !',
      components: [
        { type: 'ACTION_ROW', components: [button.data, url.data] },
        { type: 'ACTION_ROW', components: [select_menu.data] },
      ],
    });
  },
};
