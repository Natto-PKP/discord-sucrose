/* eslint-disable max-classes-per-file */
import type Discord from 'discord.js';

/**
 * @module types
 */

// # export manager
declare class AutocompleteInteractionManager {
  /**
   * collection of autocomplete
   */
  public collection: Discord.Collection<string, AutocompleteData>;

  constructor(options: { ext: 'js' | 'ts'; path: string; });

  /**
   * upload the files to add your autocomplete to the collection
   *
   * @param files - string or string array of files to load
   *
   * @example
   * await manager.add(["command.ts", "command-option.ts"]);
   * await manager.add("command.ts");
   */
  public add(files: string): Promise<AutocompleteData>;
  public add(files: string[]): Promise<AutocompleteData[]>;
  public add(files: unknown): Promise<AutocompleteData | AutocompleteData[]>;

  /**
   * refresh one or more autocomplete (remove() and add())
   *
   * @param names - name or names array of autocomplete to refresh
   *
   * @example
   * await manager.refresh(["command", "command-option"]);
   * await manager.refresh("command");
   */
  public refresh(names: string): Promise<AutocompleteData>;
  public refresh(names: string[]): Promise<AutocompleteData[]>;
  public refresh(names: unknown): Promise<AutocompleteData | AutocompleteData[]>;

  /**
   * remove one or more autocomplete
   *
   * @param names - name or names array of autocomplete to remove
   *
   * @example
   * await manager.remove(["command", "command-option"]);
   * await manager.remove("command");
   */
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void;
}

declare class BaseCommandManager {
  /**
   * collection of commands
   */
  public collection: Discord.Collection<string, CommandData>;

  public constructor(sucrose: Sucrose, options: { path: string, ext: 'js' | 'ts' });

  /**
   * load one or more commands
   *
   * @param files - string or string array of files to load
   *
   * @example
   * await manager.add('file.ts');
   * await manager.add(['file.ts', 'another-file.ts']);
   */
  public add(files: string[]): Promise<CommandData[]>;
  public add(files: string): Promise<CommandData>;
  public add(files: unknown): Promise<CommandData[] | CommandData>;

  /**
   * create one or more commands in discord api
   *
   * @param names - string or string array of names
   *
   * @example
   * await manager.define('say');
   * await manager.define(['say', 'user']);
   */
  public define(names: string): Promise<Discord.ApplicationCommand>;
  public define(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public define(names: unknown): Promise<Discord.ApplicationCommand | Discord.ApplicationCommand[]>;

  /**
   * remove command from discord api
   *
   * @param names - string or string array of names to delete
   *
   * @example
   * await manager.delete('say');
   * await manager.delete(['say', 'user']);
   */
  public delete(names: string): Promise<Discord.ApplicationCommand>;
  public delete(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public delete(names: unknown): Promise<Discord.ApplicationCommand | Discord.ApplicationCommand[]>;

  /**
   * refresh command in local (remove() and add())
   *
   * @param names - string or string array of names to refresh
   *
   * @example
   * await manager.refresh('say');
   * await manager.refresh(['say', 'user']);
   */
  public refresh(names: string[]): Promise<CommandData[]>;
  public refresh(names: string): Promise<CommandData>;
  public refresh(names: unknown): Promise<CommandData[] | CommandData>;

  /**
   * restore command(s) from discord api (delete() and define())
   *
   * @param names - string or string array of names to restore
   *
   * @example
   * await manager.restore('say');
   * await manager.restore(['say', 'user']);
   */
  public restore(names: string): Promise<Discord.ApplicationCommand>;
  public restore(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public restore(names: unknown): Promise< Discord.ApplicationCommand
  | Discord.ApplicationCommand[] >;

  /**
   * remove command(s) in local
   *
   * @param names - string or string array of names to remove
   *
   * @example
   * await manager.remove('say');
   * await manager.remove(['say', 'user']);
   */
  public remove(names: string[]): void;
  public remove(names: string): void;
  public remove(names: unknown): void;
}

declare class ButtonInteractionManager {
  /**
   * collection of buttons
   */
  public collection: Discord.Collection<string, ButtonData>;

  constructor(options: { ext: 'js' | 'ts'; path: string; });

  /**
   * upload the files to add your buttons to the collection
   *
   * @param files - string or string array of files to load
   *
   * @example
   * await buttons.add(["useme.ts", "google.ts"]);
   * await buttons.add("useme.ts");
   */
  public add(files: string): Promise<ButtonData>;
  public add(files: string[]): Promise<ButtonData[]>;
  public add(files: unknown): Promise<ButtonData | ButtonData[]>;

  /**
   * refresh one or more button (remove() and add())
   *
   * @param names - name or names array of button to refresh
   *
   * @example
   * await buttons.refresh(["useme", "google"]);
   * await buttons.refresh("useme");
   */
  public refresh(names: string): Promise<ButtonData>;
  public refresh(names: string[]): Promise<ButtonData[]>;
  public refresh(names: unknown): Promise<ButtonData | ButtonData[]>;

  /**
   * remove one or more button
   *
   * @param names - name or names array of button to remove
   *
   * @example
   * await buttons.remove(["useme", "google"]);
   * await buttons.remove("useme");
   */
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void;
}

declare class CommandManager extends BaseCommandManager {
  /**
   * guild command managers collection
   */
  public guilds: Discord.Collection<string, GuildCommandManager>;

  public build(): Promise<void>;
}

declare class EventManager {
  /**
   * Collection of Event
   */
  public collection: Discord.Collection<EventNames, Event>;

  public constructor(sucrose: Sucrose, options: { ext: 'js' | 'ts'; path: string; });

  public build(): Promise<void>;

  /**
   * load one or multiple events
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.create("ready");
   * await events.create(["ready", "messageCreate", "messageDelete"]);
   */
  public add(events: EventNames[]): Promise<Event[]>;
  public add(events: EventNames): Promise<Event>;
  public add(events: unknown): Promise<Event[] | Event>;

  /**
   * active one or multiple events
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.listen("ready");
   * await events.listen(["ready", "messageCreate", "messageDelete"]);
   */
  public listen(events: EventNames[]): Promise<Event>;
  public listen(events: EventNames): Promise<Event>;
  public listen(events: unknown): Promise<Event[] | Event>;

  /**
   * desactive one or multiple events
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.mute("ready");
   * await events.mute(["ready", "messageCreate", "messageDelete"]);
   */
  public mute(events: EventNames[]): Promise<Event[]>;
  public mute(events: EventNames): Promise<Event>;
  public mute(events: unknown): Promise<Event[] | Event>;

  /**
   * refresh one or multiple events (remove() and add())
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.refresh("ready");
   * await events.refresh(["ready", "messageCreate", "messageDelete"]);
   */
  public refresh(events: EventNames[]): Promise<Event[]>;
  public refresh(events: EventNames): Promise<Event>;
  public refresh(events: unknown): Promise<Event[] | Event>;

  /**
   * remove one or multiple events
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.remove("ready");
   * await events.remove(["ready", "messageCreate", "messageDelete"]);
   */
  public remove(events: EventNames[]): void;
  public remove(events: EventNames): void;
  public remove(events: unknown): void;
}

declare class GuildCommandManager extends BaseCommandManager {
  /**
   * id of the guild the manager is based on
   * @readonly
   */
  public readonly guildId: string;

  public constructor(guildId: string, sucrose: Sucrose, options: { ext: 'js' | 'ts', path: string });

  public build(): Promise<void>;
}

declare class InteractionManager {
  /**
   * manager or autocompletes
   */
  public autocompletes: AutocompleteInteractionManager;

  /**
   * manager of buttons
   */
  public buttons: ButtonInteractionManager;

  /**
   * manager of form modals
   */
  public forms: FormModalInteractionManager;

  /**
   * manager of select menu
   */
  public selectMenus: SelectMenuInteractionManager;

  public constructor(sucrose: Sucrose, options: {
    contents: Required<InteractionContent>;
    ext: 'js' | 'ts';
    path: string;
  });

  public build(): Promise<void>;
}

declare class FormModalInteractionManager {
  public collection: Discord.Collection<string, FormData>;

  constructor(options: { ext: 'js' | 'ts'; path: string; });

  /**
   * load one or multiple file
   *
   * @param files - string or array of string
   *
   * @example
   * await manager.add('file.ts');
   * await manager.add(['file.ts', 'other-file.ts']);
   */
  public add(files: string): Promise<FormData>;
  public add(files: string[]): Promise<FormData[]>;
  public add(files: unknown): Promise<FormData | FormData[]>;

  /**
   * refresh one or multiple file (remove() and add())
   *
   * @param names - string or array of string
   *
   * @example
   * await manager.refresh('ticket');
   * await manager.refresh(['ticket', 'report']);
   */
  public refresh(names: string): Promise<FormData>;
  public refresh(names: string[]): Promise<FormData[]>;
  public refresh(names: unknown): Promise<FormData | FormData[]>;

  /**
   * remove one or multiple file
   *
   * @param names - string or array of string
   *
   * @example
   * await manager.remove('ticket');
   * await manager.remove(['ticket', 'report']);
   */
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void;
}

declare class SelectMenuInteractionManager {
  public collection: Discord.Collection<string, SelectMenuData>;

  constructor(options: { ext: 'js' | 'ts'; path: string; });

  /**
   * load one or multiple file
   *
   * @param files - string or array of string
   *
   * @example
   * await manager.add('file.ts');
   * await manager.add(['file.ts', 'other-file.ts']);
   */
  public add(files: string): Promise<SelectMenuData>;
  public add(files: string[]): Promise<SelectMenuData[]>;
  public add(files: unknown): Promise<SelectMenuData | SelectMenuData[]>;

  /**
   * refresh one or multiple file (remove() and add())
   *
   * @param names - string or array of string
   *
   * @example
   * await manager.refresh('select-me');
   * await manager.refresh(['select-me', 'no-select-meee']);
   */
  public refresh(names: string): Promise<SelectMenuData>;
  public refresh(names: string[]): Promise<SelectMenuData[]>;
  public refresh(names: unknown): Promise<SelectMenuData | SelectMenuData[]>;

  /**
   * remove one or multiple file
   *
   * @param names - string or array of string
   *
   * @example
   * await manager.remove('select-me');
   * await manager.remove(['select-me', 'no-select-meee']);
   */
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

  /**
   * get current date formatted
   *
   * @param format - allow to format date (default true)
   */
  static date(format?: boolean): string | Date;

  /**
   * handle errors array
   *
   * @param errors - array or errors to log
   */
  static handle(...errors: Error[]): void;

  /**
   * give a code with content message to write
   *
   * @param code - code of log level
   * @param content - content to log
   */
  static give(code: Code, content: Error | string): void;

  /**
   * write a table in consoles
   *
   * @param content - content to log
   */
  static table(content: object | unknown[]): void;

  /**
   * write a message in consoles
   *
   * @param message - message to write
   */
  static write(message: string): void;
}

// # export structures
declare class Event {
  /**
   * redirects to the event manager
   * @readonly
   * @see {@link EventManager}
   */
  public readonly manager: EventManager;

  /**
   * event name
   */
  public readonly name: EventNames;

  /**
   * active this event - search et load event handler in your files and run event listener
   *
   * @returns current event
   *
   * @example
   * await event.listen();
   */
  public listen(): Promise<this>;

  /**
   * disable this event
   *
   * @returns current event
   *
   * @example
   * await event.mute();
   */
  public mute(): Promise<this>;

  /**
   * refresh this event - mute and listen event
   *
   * @returns current event
   *
   * @example
   * await event.refresh();
   */
  public refresh(): Promise<this>;

  /**
   * remove/delete this event - destroy this event
   *
   * @returns current event
   *
   * @example
   * await event.refresh();
   */
  public remove(): Promise<void>;
}

declare class Sucrose extends Discord.Client {
  /**
   * access the commands manager
   * @readonly
   */
  public readonly commands: CommandManager;

  /**
   * access the events manager
   * @readonly
   */
  public readonly events: EventManager;

  /**
   * access the interactions manager
   * @readonly
   */
  public readonly interactions: InteractionManager;

  /**
   * build your Sucrose client
   *
   * @param options - Sucrose options
   * @returns Sucrose
   *
   * @example
   * (async () =\> \{
   *   await Sucrose.build(\{ env: \{ source: 'src', ext: 'ts' \} \})
   * \})()
   */
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
 * autocomplete interaction
 * @public
 */
export interface Autocomplete {
  /**
   * the autocomplete body
   */
  body: { command: string; option?: string; };

  /**
   * function that will be executed when the command or command + option is called
   */
  exec?: BaseExec<{ interaction: Discord.AutocompleteInteraction }>;
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
  exec?: BaseExec<{ interaction: Discord.ChatInputCommandInteraction }>;
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
  exec?: BaseExec<{ interaction: Discord.MessageContextMenuCommandInteraction }>;
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
   * defined if the command is usable in private or not
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
  data: Discord.SelectMenuComponentData;

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
  exec?: BaseExec<{ interaction: Discord.UserContextMenuCommandInteraction }>;
}

// # export types
/**
 * button
 * @public
 */
export type Button = BaseInteraction & {
  /**
   * button body
   */
  data: Discord.ButtonComponentData;

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

/**
 * form
 * @public
 */
export type Form = BaseInteraction & {
  /**
   * form body
   */
  data: Discord.ModalComponentData;

  /**
   * function executed when the form modal is activated
   */
  exec?: BaseExec<{ interaction: Discord.ModalSubmitInteraction }>
};

// # internal
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
type AutocompleteData = Autocomplete & { path: string; };

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
type ButtonData = Button & { path: string };

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
type FormData = Form & { path: string };

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
