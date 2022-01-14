import Discord from 'discord.js';
import { Sucrose } from 'src/structures/sucrose';
import { Params as CustomParams } from 'src/structures/typings/custom';

//! GLOBAL
// # Interface
interface BaseOptions {
  customParams?: CustomParams;
}

// # Exports
export type BaseParams = CustomParams & { sucrose: Sucrose };
export type Collection<V> = Map<string, V>;

//! SUCROSE
// # Exports

export type SucroseOptions = BaseOptions & { events?: BaseEventManagerOptions };

//! EVENTS
// # Exports
export type Params<K extends keyof Discord.ClientEvents> = BaseParams & { args: Discord.ClientEvents[K] };

interface BaseEventManagerOptions {
  ignores?: Array<keyof Discord.ClientEvents>;
}

export type EventHandler<T extends keyof Discord.ClientEvents> = (params: Params<T>) => Discord.Awaitable<void>;
export type EventListener<T extends keyof Discord.ClientEvents> = (
  ...args: Discord.ClientEvents[T]
) => Discord.Awaitable<void>;
export type EventManagerOptions = BaseOptions & BaseEventManagerOptions;

//! INTERACTIONS
// # Types
type BaseInteractionParams<T> = BaseParams & T;
type BaseInteractionExec<T> = (params: BaseInteractionParams<T>) => Discord.Awaitable<void>;

// # Interfaces
interface BaseInteraction {
  permissions?: Permissions;
}

// interface BaseInteractionManagerOptions {}

// # Export
export type InteractionManagerOptions = BaseOptions; // & BaseInteractionManagerOptions;

export interface Permissions {
  client?: Discord.PermissionResolvable;
  user?: Discord.PermissionResolvable;
}

//! BUTTONS
// # Interfaces
interface ButtonTypes {
  link: Required<Discord.BaseMessageComponentOptions> & Discord.LinkButtonOptions;
  base: Required<Discord.BaseMessageComponentOptions> & Discord.InteractionButtonOptions;
}

// # Exports
export type Button<T extends keyof ButtonTypes> = BaseInteraction & {
  data: ButtonTypes[T];
  exec?: BaseInteractionExec<{ interaction: Discord.ButtonInteraction }>;
};

//! COMMANDS
// # Exports
export type ChatInput = BaseInteraction & {
  body: Discord.ChatInputApplicationCommandData;
  exec?: BaseInteractionExec<{ interaction: Discord.CommandInteraction }>;
};

export type ChatInputData = ChatInput & {
  options?: Collection<ChatInputOptionData>;
  path: string;
};

export type DiscordCommand = Discord.ContextMenuInteraction & Discord.CommandInteraction;
export type ChatInputOption = ChatInputSubCommand | ChatInputSubCommandGroup;
export type ChatInputOptionData = ChatInputSubCommandData | ChatInputSubCommandGroupData;
export type Command = ChatInput | UserContextMenu | MessageContextMenu;
export type CommandData = ChatInputData | UserContextMenuData | MessageContextMenuData;

//! SUBCOMMANDGROUP
// # Exports
export type ChatInputSubCommandGroup = BaseInteraction & {
  option: Discord.ApplicationCommandSubGroupData;
  exec?: BaseInteractionExec<{ interaction: Discord.CommandInteraction }>;
};

export type ChatInputSubCommandGroupData = ChatInputSubCommandGroup & {
  options: Collection<ChatInputSubCommandData>;
  path: string;
};

//! SUBCOMMAND
// # Exports
export type ChatInputSubCommand = BaseInteraction & {
  option: Discord.ApplicationCommandSubCommandData;
  exec?: BaseInteractionExec<{ interaction: Discord.CommandInteraction }>;
};

export type ChatInputSubCommandData = ChatInputSubCommand & {
  path: string;
};

//! USERCONTEXTMENU
// # Exports
export type UserContextMenu = BaseInteraction & {
  body: Discord.UserApplicationCommandData;
  exec?: BaseInteractionExec<{ interaction: Discord.ContextMenuInteraction }>;
};

export type UserContextMenuData = UserContextMenu & {
  path: string;
};

//! MESSAGECONTEXTMENU
// # Exports
export type MessageContextMenu = BaseInteraction & {
  body: Discord.MessageApplicationCommandData;
  exec?: BaseInteractionExec<{ interaction: Discord.ContextMenuInteraction }>;
};

export type MessageContextMenuData = MessageContextMenu & {
  path: string;
};

//! SELECTMENU
// # Exports
export type SelectMenu = BaseInteraction & {
  data: Required<Discord.BaseMessageComponentOptions> & Discord.MessageSelectMenuOptions;
  exec?: BaseInteractionExec<{ interaction: Discord.SelectMenuInteraction }>;
};

//! SUCROSE
// # Exports
export interface BaseAPICommandOptions {
  commandId: string;
  guildId?: string;
}

export interface BaseLocalCommandOptions {
  commandName?: string;
  guildId?: string;
}

//! UTILS
type ApplicationInteraction =
  | Discord.CommandInteraction
  | Discord.ContextMenuInteraction
  | Discord.ButtonInteraction
  | Discord.SelectMenuInteraction;
