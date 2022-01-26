import type { EventHandler } from '../../../typings/index';

export default (obj: EventHandler<'ready'>) => {
  // console.log(`${sucrose.user.tag} is connected !`);
  console.log(obj);
};
