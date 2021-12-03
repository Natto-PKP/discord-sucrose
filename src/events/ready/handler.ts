import { Params } from 'src/structures/typings';

export = {
  listener: ({ sucrose }: Params<'ready'>) => {
    // console.log(`${sucrose.guilds.cache.size} guilds`);
  },
};
