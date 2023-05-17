import path from 'path';
import type Types from '../../typings';

const defaults = {
  autocompletes: 'interactions/autocompletes',
  buttons: 'interactions/buttons',
  globalsCommands: 'interactions/commands/global',
  guildsCommands: 'interactions/commands/guilds',
  forms: 'interactions/forms',
  selectMenus: 'interactions/select-menus',
  events: 'events',
};

export default (options: Types.SucroseOptions): Types.Directories<false, true> => {
  const env = options.env as Types.EnvironmentOptions;

  const getDirectoryValue = (
    prop: keyof typeof defaults,
    directory: Types.DirectoryValue<false> | undefined,
  ): Types.DirectoryValue<true> => {
    const defaultPath = defaults[prop];
    const currentPath = directory && (typeof directory === 'object' ? directory.path : directory);
    const folder = (typeof currentPath === 'string' && currentPath) || defaultPath;
    const to = path.isAbsolute(folder) ? folder : path.join(process.cwd(), env.source, folder);

    const depth = (directory && typeof directory === 'object' && directory.depth) || null;
    return { path: to, depth };
  };

  return {
    events: getDirectoryValue('events', options.directories?.events),
    interactions: {
      autocompletes: getDirectoryValue('autocompletes', options.directories?.interactions.autocompletes),
      buttons: getDirectoryValue('buttons', options.directories?.interactions.buttons),
      commands: {
        globals: getDirectoryValue('globalsCommands', options.directories?.interactions.commands.globals),
        guilds: getDirectoryValue('guildsCommands', options.directories?.interactions.commands.guilds),
      },
      forms: getDirectoryValue('forms', options.directories?.interactions.forms),
      selectMenus: getDirectoryValue('selectMenus', options.directories?.interactions.selectMenus),
    },
  };
};
