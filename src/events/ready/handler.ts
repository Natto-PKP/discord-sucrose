import { Params } from 'src/typings';

export = {
  listener: ({ sucrose }: Params<'ready'>) => {
    console.log(`${sucrose.user?.username} is online !`);
  },
};
