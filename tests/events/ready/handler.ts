import type { EventHandler } from '../../../typings/index';

export const handler: EventHandler<'ready'> = (obj) => {
  // console.log(`${sucrose.user.tag} is connected !`);
  console.log(obj);
};
