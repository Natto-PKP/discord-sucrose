import type Types from '../../typings';
import getInteractionManagerContentsOptions from './getInteractionManagerContentsOptions';

export default (options: Types.SucroseOptions<false, true>): Types.InteractionManagerOptions => {
  const env = options.env as Types.EnvironmentOptions;
  const logging = options.logging as Types.SucroseLoggerOptions;
  const directories = options.directories
    ?.interactions as Types.InteractionDirectories<false, true>;
  const features = options.features?.interactions as Types.InteractionFeatures;

  return {
    contents: getInteractionManagerContentsOptions(options),
    directories: {
      commands: {
        globals: directories.commands.globals,
        guilds: directories.commands.guilds,
      },
      autocompletes: directories.autocompletes,
      buttons: directories.buttons,
      modals: directories.modals,
      selectMenus: directories.selectMenus,
    },
    env,
    features,
    logging,
  };
};
