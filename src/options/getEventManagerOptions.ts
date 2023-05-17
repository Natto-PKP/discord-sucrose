import type Types from '../../typings';

export default (options: Types.SucroseOptions<false, true>): Types.EventManagerOptions => {
  const env = options.env as Types.EnvironmentOptions;
  const logging = options.logging as Types.SucroseLoggerOptions;
  const directory = options.directories?.events as Types.DirectoryValue<true>;

  return { directory, env, logging };
};
