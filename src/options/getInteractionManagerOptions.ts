import path from 'path';
import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.InteractionManagerOptions => {
  const env = options.env as Types.EnvironmentOptions;
  const logging = options.logging as Types.LoggerOptions;
  const directories = options.directories?.interactions as Types.InteractionDirectories;
  const features = options.features?.interactions as Types.InteractionFeatures;

  const source = path.join(process.cwd(), env.source);
  const autocompletePath = path.join(source, directories.autocompletes);
  const buttonPath = path.join(source, directories.buttons);
  const formPath = path.join(source, directories.forms);
  const selectMenuPath = path.join(source, directories.selectMenus);

  return {
    directories: {
      autocompletes: autocompletePath,
      buttons: buttonPath,
      forms: formPath,
      selectMenus: selectMenuPath,
    },
    env,
    features,
    logging,
  };
};
