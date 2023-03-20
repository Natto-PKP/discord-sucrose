import path from 'path';
import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.EventManagerOptions => {
  const env = options.env as Types.EnvironmentOptions;
  const logging = options.logging as Types.LoggerOptions;
  const directory = options.directories?.events as string;

  const eventsPath = path.join(process.cwd(), env.source, directory);

  return {
    directory: eventsPath,
    env,
    logging,
  };
};
