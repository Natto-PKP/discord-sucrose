/* eslint-disable max-classes-per-file */

import type Discord from 'discord.js';

// # export manager
declare class BaseCommandManager {
  public collection: Discord.Collection<string, CommandData>;

  public constructor(sucrose: Sucrose, options: { path: string, ext: 'js' | 'ts' });

  public add(files: string[]): Promise<CommandData[]>;
  public add(files: string): Promise<CommandData>;
  public add(files: unknown): Promise<CommandData[] | CommandData>;
  public define(names: string): Promise<Discord.ApplicationCommand>;
  public define(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public define(names: unknown): Promise<Discord.ApplicationCommand | Discord.ApplicationCommand[]>;
  public delete(names: string): Promise<Discord.ApplicationCommand>;
  public delete(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public delete(names: unknown): Promise<Discord.ApplicationCommand | Discord.ApplicationCommand[]>;
  public refresh(names: string[]): Promise<CommandData[]>;
  public refresh(names: string): Promise<CommandData>;
  public refresh(names: unknown): Promise<CommandData[] | CommandData>;
  public restore(names: string): Promise<Discord.ApplicationCommand>;
  public restore(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public restore(names: unknown): Promise< Discord.ApplicationCommand
  | Discord.ApplicationCommand[] >;
  public remove(names: string[]): void;
  public remove(names: string): void;
  public remove(names: unknown): void;
}

declare class ButtonInteractionManager {
  public collection: Discord.Collection<string, ButtonData>;

  constructor(options: { ext: 'js' | 'ts'; path: string; });

  public add(files: string): Promise<ButtonData>;
  public add(files: string[]): Promise<ButtonData[]>;
  public add(files: unknown): Promise<ButtonData | ButtonData[]>;
  public refresh(names: string): Promise<ButtonData>;
  public refresh(names: string[]): Promise<ButtonData[]>;
  public refresh(names: unknown): Promise<ButtonData | ButtonData[]>;
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void;
}

declare class CommandManager extends BaseCommandManager {
  public guilds: Discord.Collection<string, GuildCommandManager>;

  public build(): Promise<void>;
}

declare class EventManager {
  public collection: Discord.Collection<EventNames, Event>;

  public constructor(sucrose: Sucrose, options: { ext: 'js' | 'ts'; path: string; });

  public build(): Promise<void>;
  public add(events: EventNames[]): Promise<Event[]>;
  public add(events: EventNames): Promise<Event>;
  public add(events: unknown): Promise<Event[] | Event>;
  public listen(events: EventNames[]): Promise<Event>;
  public listen(events: EventNames): Promise<Event>;
  public listen(events: unknown): Promise<Event[] | Event>;
  public mute(events: EventNames[]): Promise<Event[]>;
  public mute(events: EventNames): Promise<Event>;
  public mute(events: unknown): Promise<Event[] | Event>;
  public refresh(events: EventNames[]): Promise<Event[]>;
  public refresh(events: EventNames): Promise<Event>;
  public refresh(events: unknown): Promise<Event[] | Event>;
  public remove(events: EventNames[]): void;
  public remove(events: EventNames): void;
  public remove(events: unknown): void;
}

declare class GuildCommandManager extends BaseCommandManager {
  public readonly guildId: string;

  public constructor(guildId: string, sucrose: Sucrose, options: { ext: 'js' | 'ts', path: string });

  public build(): Promise<void>;
}

declare class InteractionManager {
  public buttons: ButtonInteractionManager;

  public selectMenus: SelectMenuInteractionManager;

  public constructor(sucrose: Sucrose, options: {
    contents: Required<InteractionContent>;
    ext: 'js' | 'ts';
    path: string;
  });

  public build(): Promise<void>;
}

declare class SelectMenuInteractionManager {
  public collection: Discord.Collection<string, SelectMenuData>;

  constructor(options: { ext: 'js' | 'ts'; path: string; });

  public add(files: string): Promise<SelectMenuData>;
  public add(files: string[]): Promise<SelectMenuData[]>;
  public add(files: unknown): Promise<SelectMenuData | SelectMenuData[]>;
  public refresh(names: string): Promise<SelectMenuData>;
  public refresh(names: string[]): Promise<SelectMenuData[]>;
  public refresh(names: unknown): Promise<SelectMenuData | SelectMenuData[]>;
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void;
}

// # export structures
declare class Event {
  public readonly manager: EventManager;

  public listen(): Promise<this>;
  public mute(): Promise<this>;
  public refresh(): Promise<this>;
  public remove(): Promise<void>;
}

declare class Sucrose extends Discord.Client {
  public readonly commands: CommandManager;

  public readonly events: EventManager;

  public readonly interactions: InteractionManager;

  static build(options: SucroseOptions): Promise<Sucrose>;
}

// # export interface
/**
 * automatic messages content regarding interactions
 */
export interface InteractionContent {
  /**
   * when the interaction encounters a global error
   * @param err - error encountered
   */
  ERROR?: (err: Error) => Discord.InteractionReplyOptions;

  /**
   * when the command is missing in Discord API
   * @param name - name of command
   */
  MISSING_COMMAND?: (name: string) => Discord.InteractionReplyOptions;

  /**
   * when the interaction is missing in local
   * @param name - name of command
   */
  MISSING_LOCAL_INTERACTION?: (name: string) => Discord.InteractionReplyOptions;

  /**
   * when the interaction exec is missing in local
   * @param name - name of command
   */
  MISSING_LOCAL_INTERACTION_EXEC?: (name: string) => Discord.InteractionReplyOptions;

  /**
   * when the subcommand is missing
   * @param name - name of command
   */
  MISSING_SUB_COMMAND?: (name: string) => Discord.InteractionReplyOptions;

  /**
   * when the subcommandgroup is missing in local
   * @param name - name of command
   */
  MISSING_SUB_COMMAND_GROUP?: (name: string) => Discord.InteractionReplyOptions;

  /**
   * when the when interaction is not allowed on guilds
   */
  PERMISSIONS_DENY_GUILDS?: () => Discord.InteractionReplyOptions;

  /**
   * when interaction is not allowed in private messages
   */
  PERMISSIONS_DENY_PRIVATE?: () => Discord.InteractionReplyOptions;

  /**
   * when interaction is prohibited in the channel
   * @param member - member who initiated the interaction
   * @param channels - authorized channels
   */
  PERMISSIONS_MISSING_ALLOW_CHANNELS?: (
    member: Discord.GuildMember,
    channels: Discord.Collection<string, Discord.GuildChannel | Discord.GuildBasedChannel>
  ) => Discord.InteractionReplyOptions;

  /**
   * when interaction is prohibited in the guild
   * @param member - member who initiated the interaction
   * @param guilds - authorized guilds
   */
  PERMISSIONS_MISSING_ALLOW_GUILDS?: (
    member: Discord.GuildMember,
    guilds: Discord.Collection<string, Discord.Guild>
  ) => Discord.InteractionReplyOptions;

  /**
   * when the user is not authorized
   * @param user - user who initiated the interaction
   * @param users - authorized users
   */
  PERMISSIONS_MISSING_ALLOW_USERS?: (
    user: Discord.User,
    users: Discord.Collection<string, Discord.User>
  ) => Discord.InteractionReplyOptions;

  /**
   * when user roles do not allow it
   * @param member - member who initiated the interaction
   * @param roles - authorized roles
   */
  PERMISSIONS_MISSING_ALLOW_ROLES?: (
    member: Discord.GuildMember,
    roles: Discord.Collection<string, Discord.Role>
  ) => Discord.InteractionReplyOptions;

  /**
   * when the client does not have the requested permissions
   * @param client - discord client
   * @param permissions - missing permissions
   */
  PERMISSIONS_MISSING_CLIENT?: (
    client: Discord.Client,
    permissions: Discord.PermissionString[]
  ) => Discord.InteractionReplyOptions;

  /**
   * when the member does not have the requested permissions
   * @param client - member who initiated the interaction
   * @param permissions - missing permissions
   */
  PERMISSIONS_MISSING_MEMBER?: (
    member: Discord.GuildMember,
    permissions: Discord.PermissionString[]
  ) => Discord.InteractionReplyOptions;
}

export interface ChatInput extends BaseInteraction {
  body: Discord.ChatInputApplicationCommandData;
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

export interface MessageContextMenu extends BaseInteraction {
  body: Discord.MessageApplicationCommandData;
  exec?: BaseExec<{ interaction: Discord.MessageContextMenuInteraction }>;
}

export interface Permissions {
  channels?: Discord.Snowflake[];
  client?: Discord.PermissionResolvable;
  guilds?: Discord.Snowflake[];
  users?: Discord.Snowflake[];
  member?: Discord.PermissionResolvable;
  roles?: Discord.Snowflake[];
  private?: boolean;
}

export interface SelectMenu extends BaseInteraction {
  data: Required<Discord.BaseMessageComponentOptions> & Discord.MessageSelectMenuOptions;
  exec?: BaseExec<{ interaction: Discord.SelectMenuInteraction }>;
}

export interface SucroseOptions extends Discord.ClientOptions {
  /**
   * allows you to change the structure's automatic messages, such as error messages
   */
  contents?: {
    /**
     * allows you to change automatic messages concerning your interactions, such as error messages
     */
    interaction?: InteractionContent;
  };

  /**
   * allows you to configure a specific environment for the structure to locate
   * @example
   * const env = \{
   *  source: 'src',
   *  ext: 'ts',
   * \}
   */
  env?: {
    /**
     * indicate the source folder of your project,
     * the folder that contains your index.js or index.ts as well as the command folders, etc...
     *
     * @remarks
     * @defaultValue ''
     */
    source?: string;

    /**
     * indicate the extension of your files so that the structure can be identified
     *
     * @remarks
     * @defaultValue 'js'
     */
    ext?: 'js' | 'ts';
  };

  /**
   * indicate the token of your discord bot here or in an .env file
   */
  token?: string;
}

export interface SubCommandGroup extends BaseInteraction {
  option: Discord.ApplicationCommandSubGroupData;
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

export interface SubCommand extends BaseInteraction {
  option: Discord.ApplicationCommandSubCommandData;
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

export interface UserContextMenu extends BaseInteraction {
  body: Discord.UserApplicationCommandData;
  exec?: BaseExec<{ interaction: Discord.UserContextMenuInteraction }>;
}

// # export types
export type Button<T extends keyof ButtonTypes = keyof ButtonTypes> = BaseInteraction & {
  data: ButtonTypes[T];
  exec?: BaseExec<{ interaction: Discord.ButtonInteraction }>;
};
export type EventHandler<E extends keyof Discord.ClientEvents> = BaseExec<{
  args: Discord.ClientEvents[E]
}>;

// # internal
interface ButtonTypes {
  link: Required<Discord.BaseMessageComponentOptions> & Discord.LinkButtonOptions;
  base: Required<Discord.BaseMessageComponentOptions> & Discord.InteractionButtonOptions;
}

interface CommandType {
  CHAT_INPUT: ChatInputData;
  USER: UserContextMenuData;
  MESSAGE: MessageContextMenuData;
}

type BaseExec<I> = (params: BaseParams & I) => Discord.Awaitable<void>;
type BaseInteraction = { permissions?: Permissions; };
type BaseParams = { sucrose: Sucrose };
type ButtonData<T extends keyof ButtonTypes = keyof ButtonTypes> = Button<T> & { path: string };
type ChatInputData = ChatInput & {
  options: Discord.Collection<string, CommandOptionData | SubCommandData> | null;
  path: string;
};
type CommandOption = SubCommandGroup | SubCommand;
type CommandOptionData = SubCommandGroupData | SubCommandData;
type CommandData<T extends keyof CommandType = keyof CommandType> = CommandType[T];
type DiscordCommand = Discord.UserContextMenuInteraction &
Discord.MessageContextMenuInteraction &
Discord.CommandInteraction;
type EventNames = keyof Discord.ClientEvents;
type InteractionData = CommandData | ButtonData | SelectMenuData;
type MessageContextMenuData = MessageContextMenu & { path: string; };
type SelectMenuData = SelectMenu & { path: string; };
type SubCommandData = SubCommand & { group?: string; path: string; parent: string; };
type SubCommandGroupData = SubCommandGroup & {
  options: Discord.Collection<string, SubCommandData>;
  path: string;
  parent: string;
};
type UserContextMenuData = UserContextMenu & { path: string; };

//! !!! A DECALER DANS LES ERREURS DIRECTEMENT
