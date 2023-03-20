import path from 'path';
import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.CommandManagerOptions => {
  const env = options.env as Types.EnvironmentOptions;
  const logging = options.logging as Types.LoggerOptions;
  const directories = options.directories?.commands as Types.CommandDirectories;

  const source = path.join(process.cwd(), env.source);
  const globalCommandsPath = path.join(source, directories.globals);
  const guildsCommandsPath = path.join(source, directories.guilds);

  return {
    directories: {
      globals: globalCommandsPath,
      guilds: guildsCommandsPath,
    },
    directory: globalCommandsPath,
    env,
    logging,
  };
};
