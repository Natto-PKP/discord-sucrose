import { Sucrose } from './structures/sucrose';

export const sucrose = new Sucrose({ intents: 14319, partials: ['CHANNEL'] });

const start = async (): Promise<void> => {
  await sucrose.build();

  /**
   * Faire et tester les buttons
   * Faire et tester les select menus
   * Finir les erreurs sur commands.ts et les faire sur les intactions, event et sucrose (Sur toute les boucles) (Voir pour faire une fonction)
   */

  // await sucrose.interactions.commands.create('*', '713172382042423352');
};

start();
