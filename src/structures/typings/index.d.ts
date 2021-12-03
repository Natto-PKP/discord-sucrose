import Discord from 'discord.js';
import { Sucrose } from 'src/structures/sucrose';

export type Collection<V> = Map<string, V>;

/* == Events */
type BaseParams = { sucrose: Sucrose };

export type Params<K extends keyof ClientEvents> = BaseParams & { args: ClientEvents[K] };

export interface __event<K extends keyof ClientEvents> {
  listener: (params: Params[K]) => void;
}

/* == Interactions */
export interface Permissions {
  client?: Discord.PermissionResolvable;
  user?: Discord.PermissionResolvable;
}

interface BaseInteraction {
  permissions?: Permissions;
}

export type Command = BaseInteraction & {
  body: Discord.ApplicationCommandData;
  exec: (params: BaseParams & { interaction: Discord.CommandInteraction | Discord.ContextMenuInteraction }) => any | Promise<any>;
};

export type CommandData = Command & {
  options?: Collection<CommandOptionData>; // Automaticely added, this is array of command option
  path?: string; // Automaticely added, this is path of command
};

interface CommandOptionTypes {
  base: Discord.ApplicationCommandOptionData;
  sub: Discord.ApplicationCommandSubCommandData;
}

export type CommandOption = BaseInteraction & {
  option: Discord.ApplicationCommandOptionData;
  exec: (params: BaseParams & { interaction: Discord.CommandInteraction | Discord.ContextMenuInteraction }) => any | Promise<any>;
};

export type CommandOptionData<T extends keyof CommandOptionTypes> = CommandOption & {
  option: CommandOptionTypes[T];
  options?: Collection<CommandOptionData>; // Automaticely added, this is array of command option
};

type ButtonTypes = 'link' | 'base';

interface ButtonData {
  link: Required<Discord.BaseMessageComponentOptions> & Discord.LinkButtonOptions;
  base: Required<Discord.BaseMessageComponentOptions> & Discord.InteractionButtonOptions;
}

export type Button<T extends ButtonTypes> = BaseInteraction & {
  data: ButtonData[T];
  exec: (params: BaseParams & { interaction: Discord.ButtonInteraction }) => any | Promise<any>;
};

export type SelectMenu = BaseInteraction & {
  data: Required<Discord.BaseMessageComponentOptions> & Discord.MessageSelectMenuOptions;
  exec: (params: BaseParams & { interaction: Discord.SelectMenuInteraction }) => any | Promise<any>;
};
