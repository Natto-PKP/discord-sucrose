import type { EventHandler } from 'discord-sucrose';

export const handler: EventHandler<'ready'> = async ({ sucrose }) => {
  console.log(`${sucrose.user.username} is connected`);
 
  await sucrose.commands.define('avatar');
};