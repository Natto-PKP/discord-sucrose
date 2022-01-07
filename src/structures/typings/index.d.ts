import Discord from 'discord.js';
import { Sucrose } from 'src/structures/sucrose';
import { Params as CustomParams } from 'src/structures/typings/custom';

//! GLOBAL
// # Exports
export type BaseParams = CustomParams & { sucrose: Sucrose };
export type Collection<V> = Map<string, V>;

//! EVENTS
// # Exports
export type Params<K extends keyof Discord.ClientEvents> = BaseParams & { args: Discord.ClientEvents[K] }; //? Events params

//? Event object
export interface __event<K extends keyof Discord.ClientEvents> {
  listener: (params: Params[K]) => void;
}

//! INTERACTIONS
// # Types
type BaseInteractionParams<T> = BaseParams & T; //? Interactions params
type BaseInteractionExec<T> = (params: BaseInteractionParams<T>) => any | Promise<any>; //? Interactions exec

// # Interfaces
//? Base interaction object
interface BaseInteraction {
  permissions?: Permissions;
}

//? Buttons types
interface ButtonTypes {
  link: Required<Discord.BaseMessageComponentOptions> & Discord.LinkButtonOptions;
  base: Required<Discord.BaseMessageComponentOptions> & Discord.InteractionButtonOptions;
}

//? Command options types
interface CommandOptionTypes {
  base: Discord.ApplicationCommandOptionData;
  sub: Discord.ApplicationCommandSubCommandData;
}

//? Command types
interface CommandTypes {
  context: Discord.ContextMenuInteraction;
  input: Discord.CommandInteraction;
}

// # Exports
//? Button object
export type Button<T extends keyof ButtonTypes> = BaseInteraction & {
  data: ButtonTypes[T];
  exec?: BaseInteractionExec<{ interaction: Discord.ButtonInteraction }>;
};

//? Command object
export type Command<T extends keyof CommandTypes = 'input'> = BaseInteraction & {
  body: Discord.ApplicationCommandData;
  exec?: BaseInteractionExec<{ interaction: CommandTypes[T] }>;
};

//? Command data
export type CommandData = Command & {
  options: Collection<CommandOptionData>; // Automaticely added, this is array of command option
  exec?: BaseInteractionExec<{ interaction: CommandTypes['context'] | CommandTypes['input'] }>;
  path: string; // Automaticely added, this is path of command
};

//? Command data params
export type CommandDataParams = BaseInteractionParams<{ interaction: CommandTypes['context'] | CommandTypes['input'] }>;

//? Command option object
export type CommandOption = BaseInteraction & {
  option: Discord.ApplicationCommandOptionData;
  exec?: BaseInteractionExec<{ interaction: CommandTypes['input'] }>;
};

//? Command option data
export type CommandOptionData<T extends keyof CommandOptionTypes> = CommandOption & {
  option: CommandOptionTypes[T];
  options?: Collection<CommandOptionData>; // Automaticely added, this is array of command option
};

//? Command option data params
export type CommandOptionDataParams = BaseInteractionParams<{ interaction: CommandTypes['input'] }>;

//? Permissions
export interface Permissions {
  client?: Discord.PermissionResolvable;
  user?: Discord.PermissionResolvable;
}

//? SelectMenu object
export type SelectMenu = BaseInteraction & {
  data: Required<Discord.BaseMessageComponentOptions> & Discord.MessageSelectMenuOptions;
  exec?: BaseInteractionExec<{ interaction: Discord.SelectMenuInteraction }>;
};
