import type Types from '../../typings';

export default (
  options: Types.InteractionManagerOptions,
): Types.InteractionCommandManagerOptions => {
  const { logging, env } = options;
  const directories = options.directories.commands;

  return {
    directories: {
      globals: directories.globals,
      guilds: directories.guilds,
    },
    directory: directories.globals,
    env,
    logging,
  };
};
