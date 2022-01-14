/* Services */
import { Logger } from '../../structures/services/logger';

/* Typings */
import { Params } from 'src/structures/typings';

export default async ({ sucrose }: Params<'ready'>) => {
  Logger.log(`${sucrose.guilds.cache.size} guilds`);
  Logger.log(`${sucrose.users.cache.size} users`);

  //! Tests
  // await sucrose.commands.create();
  // await sucrose.commands.create({ guildId: '713172382042423352' });
  // console.log(await sucrose.commands.fetch({ guildId: '713172382042423352' }));
  // await sucrose.commands.delete({ commandId: '930726463647404062', guildId: '713172382042423352' });

  //! Remove all commands
  // sucrose.commands.fetch().then((commands) => commands instanceof Map && commands.forEach((cmd) => cmd.delete()));
  // sucrose.commands
  //   .fetch({ guildId: '713172382042423352' })
  //   .then((commands) => commands instanceof Map && commands.forEach((cmd) => cmd.delete()));
};
