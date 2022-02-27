import type { EventHandler } from '../../../typings/index';

export const handler: EventHandler<'ready'> = ({ sucrose }) => {
  // console.log(`${sucrose.user.tag} is connected !`);
  console.log(sucrose.user?.username);
};
