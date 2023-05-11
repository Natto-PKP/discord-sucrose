import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.Directories => ({
  events: options.directories?.events || 'events',
  interactions: {
    autocompletes: options.directories?.interactions.autocompletes || 'interactions/autocompletes',
    buttons: options.directories?.interactions.buttons || 'interactions/buttons',
    commands: {
      globals: options.directories?.interactions.commands.globals || 'interactions/commands/global',
      guilds: options.directories?.interactions.commands.guilds || 'interactions/commands/guilds',
    },
    forms: options.directories?.interactions?.forms || 'interactions/forms',
    selectMenus: options.directories?.interactions?.selectMenus || 'interactions/select-menus',
  },
});
