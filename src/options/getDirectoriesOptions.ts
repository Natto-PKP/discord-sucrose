import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.Directories => ({
  commands: {
    globals: options.directories?.commands?.globals || 'commands/globals',
    guilds: options.directories?.commands?.guilds || 'commands/guilds',
  },
  events: options.directories?.events || 'events',
  interactions: {
    autocompletes: options.directories?.interactions?.autocompletes || 'interactions/autocompletes',
    buttons: options.directories?.interactions?.buttons || 'interactions/buttons',
    forms: options.directories?.interactions?.forms || 'interactions/forms',
    selectMenus: options.directories?.interactions?.selectMenus || 'interactions/select-menus',
  },
});
