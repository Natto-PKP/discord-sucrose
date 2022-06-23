/* eslint-disable max-classes-per-file */

/**
 * @module types
 */

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

// # export services
export enum Codes {
  'FATAL' = '\x1b[1m\x1b[31m🔥 FATAL\x1b[0m',
  'ERROR' = '\x1b[1m\x1b[31m✖ ERROR\x1b[0m',
  'WARN' = '\x1b[1m\x1b[33m🔔 WARN\x1b[0m',
  'INFO' = '\x1b[1m\x1b[36m🔎 INFO\x1b[0m',
  'SUCCESS' = '\x1b[1m\x1b[32m✔ SUCCESS\x1b[0m',
}

export type Code = keyof typeof Codes;

type ErrorCode = 'FATAL' | 'ERROR' | 'WARN';

declare class Logger {
  static console: Console;

  static date(format?: boolean): string | Date;
  static handle(...errors: Error[]): void;
  static give(code: Code, content: Error | string): void;
  static table(content: object | unknown[]): void;
  static write(message: string): void;
}

// # export structures
declare class Event {
  public readonly manager: EventManager;

  public readonly name: EventNames;

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
 * @public
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

/**
 * chat input interaction
 * @public
 */
export interface ChatInput extends BaseInteraction {
  /**
   * the command body that will be sent to the API
   */
  body: Discord.ChatInputApplicationCommandData;

  /**
   * the function that will be executed when the command is called
   */
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

/**
 * message context menu interaction
 * @public
 */
export interface MessageContextMenu extends BaseInteraction {
  /**
   * the message context menu body that will be sent to the API
   */
  body: Discord.MessageApplicationCommandData;

  /**
   * the function that will be executed when the message context menu is called
   */
  exec?: BaseExec<{ interaction: Discord.MessageContextMenuInteraction }>;
}

/**
 * permissions object
 * @public
 */
export interface Permissions {
  /**
   * allows only authorized channels
   */
  channels?: Discord.Snowflake[];

  /**
   * request specific permissions from the client
   */
  client?: Discord.PermissionResolvable;

  /**
   * allows only authorized guilds
   */
  guilds?: Discord.Snowflake[];

  /**
   * allows only authorized users
   */
  users?: Discord.Snowflake[];

  /**
   * request member permissions
   */
  member?: Discord.PermissionResolvable;

  /**
   * allows only authorized roles
   */
  roles?: Discord.Snowflake[];

  /**
   * defined if the command is user in private or not
   * @beta
   */
  private?: boolean;
}

/**
 * select menu interaction
 * @public
 */
export interface SelectMenu extends BaseInteraction {
  /**
   * select menu body
   */
  data: Required<Discord.BaseMessageComponentOptions> & Discord.MessageSelectMenuOptions;

  /**
   * function executed when the select menu is activated
   */
  exec?: BaseExec<{ interaction: Discord.SelectMenuInteraction }>;
}

/**
 * sucrose client options
 * @public
 */
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
     * @defaultValue ''
     */
    source?: string;

    /**
     * indicate the extension of your files so that the structure can be identified
     *
     * @defaultValue 'js'
     */
    ext?: 'js' | 'ts';
  };

  /**
   * indicate the token of your discord bot here or in an .env file
   */
  token?: string;
}

/**
 * sub command group
 * @public
 */
export interface SubCommandGroup extends BaseInteraction {
  /**
   * sub command group body
   */
  option: Discord.ApplicationCommandSubGroupData;

  /**
   * function executed when the sub command group is activated
   */
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

/**
 * sub command
 * @public
 */
export interface SubCommand extends BaseInteraction {
  /**
   * sub command body
   */
  option: Discord.ApplicationCommandSubCommandData;

  /**
   * function executed when the sub command is activated
   */
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

/**
 * user context menu interaction
 * @public
 */
export interface UserContextMenu extends BaseInteraction {
  /**
   * user context menu body
   */
  body: Discord.UserApplicationCommandData;

  /**
   * function executed when the user context menu is activated
   */
  exec?: BaseExec<{ interaction: Discord.UserContextMenuInteraction }>;
}

// # export types
/**
 * button
 * @public
 */
export type Button<T extends keyof ButtonTypes = keyof ButtonTypes> = BaseInteraction & {
  /**
   * button body
   */
  data: ButtonTypes[T];

  /**
   * function executed when the button is activated
   */
  exec?: BaseExec<{ interaction: Discord.ButtonInteraction }>;
};

/**
 * event handler
 * @public
 */
export type EventHandler<E extends keyof Discord.ClientEvents> = BaseExec<{
  args: Discord.ClientEvents[E]
}>;

// # internal
/**
 * @public
 */
interface ButtonTypes {
  link: Required<Discord.BaseMessageComponentOptions> & Discord.LinkButtonOptions;
  base: Required<Discord.BaseMessageComponentOptions> & Discord.InteractionButtonOptions;
}

/**
 * @public
 */
interface CommandType {
  CHAT_INPUT: ChatInputData;
  USER: UserContextMenuData;
  MESSAGE: MessageContextMenuData;
}

/**
 * @public
 */
type BaseExec<I> = (params: BaseParams & I) => Discord.Awaitable<void>;

/**
 * @public
 */
type BaseInteraction = { permissions?: Permissions; };

/**
 * @public
 */
type BaseParams = { sucrose: Sucrose };

/**
 * @public
 */
type ButtonData<T extends keyof ButtonTypes = keyof ButtonTypes> = Button<T> & { path: string };

/**
 * @public
 */
type ChatInputData = ChatInput & {
  options: Discord.Collection<string, CommandOptionData | SubCommandData> | null;
  path: string;
};

/**
 * @public
 */
type CommandOption = SubCommandGroup | SubCommand;

/**
 * @public
 */
type CommandOptionData = SubCommandGroupData | SubCommandData;

/**
 * @public
 */
type CommandData<T extends keyof CommandType = keyof CommandType> = CommandType[T];

/**
 * @public
 */
type DiscordCommand = Discord.UserContextMenuInteraction &
Discord.MessageContextMenuInteraction &
Discord.CommandInteraction;

/**
 * @public
 */
type EventNames = keyof Discord.ClientEvents;

/**
 * @public
 */
type InteractionData = CommandData | ButtonData | SelectMenuData;

/**
 * @public
 */
type MessageContextMenuData = MessageContextMenu & { path: string; };

/**
 * @public
 */
type SelectMenuData = SelectMenu & { path: string; };

/**
 * @public
 */
type SubCommandData = SubCommand & { group?: string; path: string; parent: string; };

/**
 * @public
 */
type SubCommandGroupData = SubCommandGroup & {
  options: Discord.Collection<string, SubCommandData>;
  path: string;
  parent: string;
};

/**
 * @public
 */
type UserContextMenuData = UserContextMenu & { path: string; };
