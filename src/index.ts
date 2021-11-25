import { Sucrose } from './structures/sucrose';

export const sucrose = new Sucrose({ intents: 14319, partials: ['CHANNEL'] });

const start = async (): Promise<void> => {
  await sucrose.build();

  /**
   * Faire et tester les buttons
   * Faire et tester les select menus
   */

  await sucrose.interactions.commands.create('*', '713172382042423352');
};

start();
