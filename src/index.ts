import { Sucrose } from './structures/sucrose';

export const sucrose = new Sucrose({ intents: 14319, partials: ['CHANNEL'] });

const start = async (): Promise<void> => {
  await sucrose.build();
};

start();
