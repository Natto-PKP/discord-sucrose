/* eslint-disable max-classes-per-file */

import type Discord from 'discord.js';

/**
 * @module discord-sucrose
 */

/**
 * Base structure for command manager
 * @category managers
 * @public
 */
declare class BaseInteractionCommandManager {
  public directory: DirectoryValue<true>;

  constructor(sucrose: Sucrose, options: BaseInteractionCommandManagerOptions);
  public cache: Discord.Collection<string, InteractionCommandData>;

  /**
   * Load and set a new command
   * @param file - file name
   * @example
   * ```js
   * await manager.add({
   *   body: {
   *    name: 'say',
   *    description: 'I will say something',
   *    type: ApplicationCommandType.ChatInput,
   *  },
   *
   *  exec: async ({ interaction }) => {
   *    const text = interaction.options.getString('text', true);
   *    await interaction.reply(text);
   *  },
   * });
   * ```
   * @returns
   */
  public async add(command: InteractionCommandData): Promise<InteractionCommandData>;

  /**
   * Send a existing command in Discord API
   * @param name - command name
   * @example
   * ```js
   * await manager.name('avatar');
   * ```
   * @returns
   */
  public async deploy(name: string): Promise<Discord.ApplicationCommand | null | undefined>;

  /**
   * Delete a existing command in Discord API
   * @param name - command name
   * @example
   * ```js
   * await manager.remove('avatar');
   * ```
   * @returns
   */
  public async undeploy(name: string): Promise<Discord.ApplicationCommand | null | undefined>;

  /**
   * Delete a existing command from the collection
   * @param name - command name
   * @example
   * ```js
   * manager.delete('avatar');
   * ```
   * @returns
   */
  public delete(name: string): boolean;

  /**
   * Delete and add an existing command
   * @param name - command name
   * @example
   * ```js
   * await manager.refresh('avatar');
   * ```
   * @returns
   */
  public async refresh(name: string): Promise<InteractionCommandData>;

  /**
   * Remove and define an existing command
   * @param name - command name
   * @example Restore a command
   * ```js
   * await manager.restore('avatar');
   * ```
   * @returns
   */
  public async restore(name: string): Promise<Discord.ApplicationCommand | null | undefined>;
}

/**
 * Base structure for basic discord.js interaction
 * @category managers
 * @public
 */
declare class BaseInteractionManager<T extends InteractionData = Types.InteractionData> {
  public cache: Discord.Collection<string, T>;

  /**
   * interactions directory
   */
  public directory: DirectoryValue<true>;

  constructor(options: BaseInteractionManagerOptions<T>);

  /**
   * Build interaction manager
   */
  public async build(): Promise<void>;

  /**
   * Add interaction
   */
  public add(interaction: T): void;

  /**
   * Delete and set an existing interaction
   * @param name - interaction customId
   * @example
   * ```js
   * await manager.refresh('interaction-name');
   * ```
   * @returns
   */
  public async refresh(name): Promise<this>;
}

/**
 * Base cooldown service
 * @category managers
 * @public
 */
declare class BaseCooldownManager<C = unknown> {
  /**
   * Cooldown cache
   * @defaultValue `Discord.Collection<string, number>`
   */
  public cache: C;

  constructor(cache?: C);

  /**
   * DO NOT OVERRIDE THIS
   */
  public isOver(params: {
    cooldowns: Cooldown[] | Cooldown;
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    id: string;
  });

  public get(params: CooldownMethodParams): Promise<CooldownValue | undefined>;

  public set(params: CooldownMethodParams & CooldownValue): Promise<void>;
}

/**
 * Some utils fonction for async
 * @category utils
 * @public
 */
declare class AsyncUtil {
  static every<T = unknown>(arr: T[], callback: Callback<T, boolean>): Promise<boolean>;
  static some<T = unknown>(arr: T[], callback: Callback<T, boolean>) : Promise<boolean>;
}

/**
 * Condition service
 * @category services
 * @public
 */
declare class ConditionService {
  static isAlright<P = { [key: string]: any }>(params: P & {
    sucrose: Types.Sucrose,
    conditions: Types.Condition<P>[] | Types.Condition<P>,
  }): Promise<boolean>;
}

/**
 * Structure for manager our event
 * @category managers
 * @public
 */
declare class Event<E extends EventNames = EventNames> {
  /**
   * determines whether the event is running or not
   * @defaultValue `false`
   */
  public disabled = false;

  /**
    * redirects to the event manager
    * @readonly
    * {@link EventManager}
    */
  public readonly manager: EventManager;

  /**
   * Each event modules represent a file in the event folder
   */
  public modules: Discord.Collection<string, EventModule>;

  /**
   * Path to event folder
   */
  public directory: DirectoryValue<true>;

  public constructor(public readonly name: E, options: EventOptions);

  /**
   * active this event - search et load event handler in your files and run event listener
   * @example
   * ```js
   * await event.listen();
   * ```
   */
  public async listen(): Promise<this>;

  /**
   * disable this event
   * @example
   * ```js
   * await event.mute();
   * ```
   */
  public async mute(): Promise<this>;

  /**
   * refresh this event - mute and listen event
   * @example
   * ```js
   * await event.refresh();
   * ```
   */
  public async refresh(): Promise<this>;

  /**
   * remove/delete this event - destroy this event
   * @example
   * ```js
   * await event.remove();
   * ```
   */
  public async remove(): Promise<void>;
}

/**
 * event manager
 * @category managers
 * @public
 */
declare class EventManager {
  public cache: Discord.Collection<EventNames, Event>;

  constructor(sucrose: Sucrose, options: EventManagerOptions);

  /**
    * load and build each event
    */
  public async build(): Promise<void>;

  /**
    * load one or multiple events
    * @example
    * ```js
    * await events.create("ready");
    * ```
    */
  public async add(name: EventNames): Promise<Event>;

  /**
    * active one or multiple events
    * @example
    * ```js
    * await events.listen("ready");
    * ```
    */
  public async listen(name: EventNames): Promise<Event>;

  /**
    * desactive one or multiple events
    * @example
    * ```js
    * await events.mute("ready");
    * ```
    */
  public async mute(name: EventNames): Promise<Event>;

  /**
    * refresh one or multiple events (remove() and add())
    * @example
    * ```js
    * await events.refresh("ready");
    * ```
    */
  public async refresh(
    name: EventNames
  ): Promise<Event>;

  /**
    * remove one or multiple events
    * @example
    * ```js
    * await events.remove("ready");
    * ```
    */
  public remove(name: EventNames): void;
}

/**
 * folder service
 * @category services
 * @public
 */
declare class FolderService {
  static search(options: {
    path: string,
    filter: { type: 'folder' | 'file', ext: string },
    nameOnly?: boolean,
    fileNameOnly?: boolean,
    depth?: boolean,
    autoExcludeFileOnRecursive?: boolean,
  }): string[];

  static load(path: string, prop?: string): Promise<unknown>;
}

/**
 * commands manager
 * @category managers
 * @public
 */
declare class InteractionCommandManager extends BaseInteractionCommandManager {
  /**
   * {@link InteractionGuildCommandManager}
   */
  public readonly guilds: Discord.Collection<Discord.Snowflake, InteractionGuildCommandManager>;

  constructor(sucrose: Sucrose, options: InteractionCommandManagerOptions);

  /**
   * load all global command and build potential guild command manager
   */
  public async build(): Promise<void>;
}

/**
 * guild command manager
 * @category managers
 * @public
 */
declare class InteractionGuildCommandManager extends BaseInteractionCommandManager {
  /**
   * id of the guild the manager is based on
   * @readonly
   */
  public readonly guildId: Discord.Snowflake;

  constructor(sucrose: Sucrose, options: GuildInteractionCommandManagerOptions);

  /**
   * load all guild commands
   */
  public async build(): Promise<void>;
}

/**
 * Structure for manage all classic interaction
 * @category managers
 * @public
 */
declare class InteractionManager {
  /**
   * autocomplete interaction manager
   */
  public autocompletes: BaseInteractionManager<AutocompleteData>;

  /**
   * buttons interaction manager
   */
  public buttons: BaseInteractionManager<ButtonData>;

  /**
   * commands interaction manager
   */
  public commands: InteractionCommandManager;

  /**
   * form modals interaction manager
   */
  public forms: BaseInteractionManager<FormData>;

  /**
   * select menus interaction manager
   */
  public selectMenus: BaseInteractionManager<SelectMenuData>;

  constructor(sucrose: Sucrose, options: BaseInteractionManagerOptions);

  /**
   * build this manager and all interaction manager
   */
  public async build(): Promise<void>;
}

/**
 * @public
 * @category services
 */
declare class Logger {
  /**
   * Logger console
   */
  public console: Console;

  /**
   * Logs directory
   * @defaultValue `null`
   */
  public directory: Console | null;

  constructor(options: LoggerOptions);

  /**
   * Handle multiple errors
   * @param errors
   */
  static handle(...errors: Error[]): void;

  /**
   * add some style to ur log
   * @param str - text
   * @param formats - styles to add
   * @example
   * ```js
   * const text = logger.style("i love ferret", 'rainbow');
   * console.log(text);
   * ```
   */
  static style(str: string, ...formats: LoggerLogFormat[]);

  /**
   * get current date formatted
   * @param format - convert date to string
   */
  static time(format = true): string | Date;

  /**
   * write a error in consoles
   * @param code
   * @param content
   * @param options
   */
  public error(code: Code, content: string | Error, options?: LoggerErrorOptions): void;

  /**
   * give a code with content message to write
   * @param code
   * @param content
   */
  public give(code: Code, content: Error | string): void;

  /**
   * write a table in consoles
   * @param content
   */
  public table(content: object | unknown[]): void;

  /**
   * write a message in consoles
   * @param message
   * @param options
   */
  public write(message: string, options?: LoggerWriteOptions): void;
}

/**
 * @public
 * @category managers
 */
declare class PermissionManager {
  public contents: PermissionContents;

  constructor(contents: PermissionContents);

  public isAuthorized(params: {
    interaction?: Discord.Interaction,
    message?: Discord.Message,
    permissions: Permission[] | Permission,
  }): Promise<void>;
}

/**
 * Sucrose client
 * @public
 * @category client
 * @example Initialize new Sucrose client
 * ```js
 * Sucrose.build({
 *   env: { ext: "ts", source: "src" },
 * });
 * ```
 */
declare class Sucrose extends Discord.Client {
  /**
   * cooldown service
   */
  public cooldown: BaseCooldownManager;

  /**
    * events manager
    * @readonly
    */
  public readonly events: EventManager;

  /**
    * interactions managers
    * @readonly
    */
  public readonly interactions: InteractionManager;

  /**
   * client logger
   * @readonly
   */
  public readonly logger: Logger;

  /**
   * permission service
   */
  public permission: PermissionManager;

  /**
   * build your Sucrose client
   * @param options - Sucrose options
   * @returns
   * @example
   * ```js
   * const client = await Sucrose.build(options);
   * ```
   */
  static build(options: SucroseOptions<true>): Promise<Sucrose>;
}

/**
 * Autocomplete interaction object
 * @category interactions
 * @public
 * @example
 * ```js
 * module.exports = {
 *  body: {
 *    command: 'command-name',
 *    option: 'option-name',
 *  },
 *
 *  exec: async ({ interaction }) => {
 *    await interaction.respond(['ferret', 'otter', 'cat']);
 *  },
 * };
 * ```
 */
export interface Autocomplete extends BaseInteraction<{
  interaction: Discord.AutocompleteInteraction
}> {
  /**
   * Interaction body
   */
  body: {
    /**
     * Command name
     */
    command: string;

    /**
     * Sub command group where is focus option
     */
    group?: string;

    /**
     * Sub command option and focus option
     */
    option?: string;
  };
}

/**
 * Autocomplete interaction data
 * @public
 */
export interface AutocompleteData extends Autocomplete {
  path: string;
}

/**
 * BaseInteractionCommandManagerOptions
 * @category options
 * @public
 */
export interface BaseInteractionCommandManagerOptions extends GlobalOptions {
  env: EnvironmentOptions;
  directory: DirectoryValue<true>;
}

/**
 * Base of all object (eventModule, Interaction)
 * @category bases
 * @public
 */
export interface BaseInteraction<P = { [key: string]: any }> extends GlobalBase<P> {
  /**
   * Manage cooldowns
   * @example
   * ```js
   * {
   *   type: "EVERYONE",
   *   value: 3 * 1000,
   * }
   * ```
   * @example
   * ```js
   * [
   *   {
   *     type: "ROLE",
   *     excluded: ["570642674151981135"],
   *     value: 5 * 1000,
   *   },
   *   {
   *     type: "GUILD_MEMBER",
   *     value: 1 * 1000,
   *   },
   * ]
   * ```
   */
  cooldowns?: Cooldown[] | Cooldown;

  /**
   * Manage interaction required permissions
   * @example
   * ```js
   * {
   *   type: "MEMBER",
   *   permissions: ["ADMINISTRATOR"],
   * }
   * ```
   * @example
   * ```js
   * [
   *   {
   *     type: "SELF",
   *     permissions: ["MANAGE_SERVER"],
   *   },
   *   {
   *     type: "CHANNEL",
   *     allowed: ["713309212855238707"],
   *   }
   * ]
   * ```
   */
  permissions?: Permission[] | Permission;
}

/**
 * BaseInteractionManager options
 * @category options
 * @public
 */
export interface BaseInteractionManagerOptions extends GlobalOptions {
  env: EnvironmentOptions;
  name: 'button' | 'select-menu' | 'autocomplete' | 'form';
  directory: DirectoryValue<true>;
}

/**
 * Button interaction object
 * @category interactions
 * @public
 * @example
 * ```js
 * const { ButtonStyle, ComponentType } = require('discord.js');
 *
 * module.exports = {
 *  body: {
 *    customId: 'use-me',
 *    type: ComponentType.Button,
 *    style: ButtonStyle.Primary,
 *    label: 'Use me',
 *  },
 *
 *  exec: async ({ interaction }) => {
 *    await interaction.reply('Yeaaaah');
 *  },
 * };
 * ```
 */
export interface Button extends BaseInteraction<{ interaction: Discord.ButtonInteraction }> {
  /**
   * Interaction body
   */
  body: Discord.ButtonComponentData;
}

/**
 * Button interaction data
 * @public
 */
export interface ButtonData extends Button { path: string; }

/**
 * ChatInput interaction
 * @category interactions
 * @public
 * @example
 * ```js
 * const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
 *
 * module.exports = {
 *  body: {
 *    name: 'say',
 *    description: 'I will say something',
 *    type: ApplicationCommandType.ChatInput, // No required for chat input
 *    options: [{
 *      name: 'text',
 *      description: 'text to say',
 *      type: ApplicationCommandOptionType.STRING,
 *      required: true,
 *    }],
 *  },
 *
 *  exec: async ({ interaction }) => {
 *    const text = interaction.options.getString('text', true);
 *    await interaction.reply(text);
 *  },
 * };
 * ```
 */
export interface ChatInput extends BaseInteraction<{
  interaction: Discord.ChatInputCommandInteraction
}> {
  /**
   * Interaction chat input body
   */
  body: Discord.ChatInputApplicationCommandData;
}

/**
 * ChatInputInteraction data
 * @public
 */
export interface ChatInputData extends ChatInput {
  path: string;
  options: Discord.Collection<string, ChatInputSubOptionData | ChatInputSubGroupOptionData>
}

/**
 * ChatInputSubGroupOption interaction
 * @category interactions
 * @public
 * @example
 * ```js
 * const { ApplicationCommandOptionType } = require('discord.js');
 *
 * module.exports = {
 *  body: {
 *    name: 'animals',
 *    description: 'select an animal to receive image',
 *    type: ApplicationCommandOptionType.SubCommandGroup,
 *  },
 * };
 * ```
 */
export interface ChatInputSubGroupOption extends BaseInteraction {
  /**
   * Interaction body
   */
  body: Discord.ApplicationCommandSubGroupData;
}

/**
 * ChatInputSubGroupOption data
 * @public
 */
export interface ChatInputSubGroupOptionData extends ChatInputSubGroupOption {
  path: string;
  options: Discord.Collection<string, ChatInputSubOptionData>;
}

/**
 * ChatInputSubOption
 * @category interactions
 * @public
 * @example
 * ```js
 * const { ApplicationCommandOptionType } = require('discord.js');
 *
 * module.exports = {
 *  body: {
 *    name: 'ferret',
 *    description: 'receive ferret image',
 *    type: ApplicationCommandOptionType.SubCommand,
 *    options: [{
 *      name: 'format',
 *      description: 'image format',
 *      type: ApplicationCommandOptionType.STRING,
 *    }],
 *  },
 *
 *  exec: async ({ interaction }) => {
 *    const format = interaction.options.getString('format') || 'png';
 *    await interaction.reply(`[insert cute-ferret.${format}]`);
 *  },
 * };
 * ```
 */
export interface ChatInputSubOption extends BaseInteraction<{
  interaction: Discord.ChatInputCommandInteraction
}> {
  /**
   * interaction body
   */
  body: Discord.ApplicationCommandSubCommandData;
}

/**
 * ChatInputSubOption data
 * @public
 */
export interface ChatInputSubOptionData extends ChatInputSubOption { path: string; }

/**
 * @public
 */
export interface CooldownMethodParams {
  key: string;
  cooldown: Cooldown;
  interaction?: Discord.Interaction;
  message?: Discord.Message;
}

/**
 * Configure directories for commands managers
 * @category options
 * @public
 */
export interface CommandDirectories<S extends boolean = false> {
  /**
   * Configure directory for globals commands
   * @defaultValue 'interactions/commands/globals'
   */
  globals: DirectoryValue<S>;

  /**
   * Configure directory for guilds commands
   * @defaultValue 'interactions/commands/guilds'
   */
  guilds: DirectoryValue<S>;
}

/**
 * @category bases
 * @public
 */
export interface GlobalBase<P = { [key: string]: any }> {
  /**
   * Manage custom conditions
   * @remarks
   * It's used for custom conditions,
   * you must manage the reply because is not handled by Sucrose.
   * You can do these example with just Permission
   * @example
   * ```js
   * { callback: ({ interaction }) => interaction.guild.id === '713172382042423352' }
   * ```
   * @example
   * ```js
   * [
   *   { callback: ({ interaction }) => interaction.guild.id === '713172382042423352' },
   *   { callback: ({ interaction }) => interaction.user.id === '1068866278321831987' },
   * ]
   * ```
   */
  conditions?: Condition<P>[] | Condition<P>;

  /**
   * Whatever you want, you can add it here
   */
  custom?: { [key: any]: any };

  /**
   * A field to add description
   */
  description?: string;

  /**
   * Add hooks to this
   */
  hooks?: {
    /**
     * this hook is executed after the execution of this
     * @param params
     * @returns
     */
    afterExecute?: (params: P & BaseParams) => Discord.Awaitable<unknown>;

    /**
     * this hook is executed before the execution of this
     * @param params
     * @returns
     */
    beforeExecute?: (params: P & BaseParams) => Discord.Awaitable<unknown>;
  }

  /**
   * customize with some tags
   * @example
   * ```js
   * ["moderation", "admin", "management"]
   * ```
   */
  tags?: string[];

  /**
   * callback executed when this is called
   * @param params
   */
  exec?: (params: P & BaseParams) => Discord.Awaitable<unknown>
}

/**
 * InteractionCommandManager options
 * @category options
 * @public
 */
export interface InteractionCommandManagerOptions extends BaseInteractionCommandManagerOptions {
  directories: CommandDirectories<true>;
}

/**
 * Configure directories for interactions manager
 * @category options
 * @public
 */
export interface Directories<P extends boolean = false, S extends boolean = false> {
  /**
   * Configure directory for events manager
   * @defaultValue 'events'
   */
  events: DirectoryValue<S>;

  /**
   * Configure directories form interactions manager
   */
  interactions: P extends true
    ? Partial<InteractionDirectories<P, S>>
    : InteractionDirectories<P, S>;
}

/**
 * App environment options
 * @category options
 * @public
 */
export interface EnvironmentOptions {
  /**
   * Source app directory
   * @defaultValue ''
   */
  source: string;

  /**
   * Define file extension (js or ts)
   * @defaultValue 'js'
   */
  ext: 'js' | 'ts';
}

/**
 * EventManager options
 * @category options
 * @public
 */
export interface EventManagerOptions extends GlobalOptions {
  env: EnvironmentOptions;
  directory: DirectoryValue<true>;
}

/**
 * EventModule
 * @category events
 * @public
 */
export interface EventModule<E extends EventNames>
  extends GlobalBase<{ args: Discord.ClientEvents[E] }> {
  /**
   * disable or not this module
   */
  disabled?: boolean;

  /**
   * name of this module
   */
  label: string;
}

/**
 * Event options
 * @category options
 * @public
 */
export interface EventOptions extends GlobalOptions {
  env: EnvironmentOptions;
  sucrose: Sucrose;
  directory: DirectoryValue<true>;
}

/**
 * all events
 * @category events
 * @public
 */
export interface Events {
  logger: LoggerEvents;
}

/**
 * all logger events
 * @category events
 * @public
 */
export interface LoggerEvents {
  log: [content: string | object | unknown[]];
  error: [content: string | Error];
  raw: [content: unknown];
}

/**
 * LoggerLogOptions
 * @category options
 * @public
 */
export interface LoggerLogOptions {
  color?: boolean;
  time?: boolean;
}

/**
 * loggerErrorOptions
 * @category options
 * @public
 */
export interface LoggerErrorOptions extends LoggerLogOptions {
  verbose?: boolean;
}

/**
 * @internal
 */
export interface LoggerLogStyles {
  reset: string,
  bright: string,
  dim: string,
  underscore: string,
  blink: string,
  reverse: string,
  hidden: string,

  colors: {
    black: { font: string, background: string },
    red: { font: string, background: string },
    green: { font: string, background: string },
    yellow: { font: string, background: string },
    blue: { font: string, background: string },
    magenta: { font: string, background: string },
    cyan: { font: string, background: string },
    white: { font: string, background: string },
    gray: { font: string, background: string },
  },
}

/**
 * LoggerWriteOptions
 * @category options
 * @public
 */
export interface LoggerWriteOptions extends LoggerLogOptions {
  code?: Code;
}

/**
 * Sucrose features
 * @category features
 * @public
 */
export interface Features<P extends boolean = false> {
  interactions: P extends true ? Partial<InteractionFeatures<true>> : InteractionFeatures;
}

/**
 * Form interaction
 * @category interactions
 * @public
 * @example
 * ```js
 * const { ComponentType, InteractionType, TextInputStyle } = require('discord.js');
 *
 * module.exports = {
 *  body: {
 *    customId: 'report',
 *    title: 'Report form',
 *    components: [{
 *      type: ComponentType.ActionRow,
 *      components: [{
 *        customId: 'reason',
 *        style: TextInputStyle.Paragraph,
 *        label: 'Report reason',
 *        minLength: 10,
 *        maxLength: 500,
 *      }],
 *    }],
 *  },
 *
 *  exec: async ({ interaction }) => {
 *    const reason = interaction.fields.getTextInputValue('reason');
 *    await interaction.reply(reason);
 *  }
 * };
 * ```
 */
export interface Form extends BaseInteraction<{ interaction: Discord.ModalSubmitInteraction }> {
  /**
   * Interaction form
   */
  body: Discord.ModalComponentData;
}

/**
 * FormInteraction data
 * @public
 */
export interface FormData extends Form { path: string; }

/**
 * Global options
 * @category options
 * @public
 */
export interface GlobalOptions<P extends boolean = false> {
  logging: P extends true ? Partial<SucroseLoggerOptions> : SucroseLoggerOptions;
}

/**
 * InteractionGuildCommandManager options
 * @category options
 * @public
 */
export interface GuildInteractionCommandManagerOptions
  extends BaseInteractionCommandManagerOptions {
  guildId: Discord.Snowflake;
}

/**
 * Interaction directories
 * @category options
 * @public
 */
export interface InteractionDirectories<P extends boolean = false, S extends boolean = false> {
  /**
   * Directory for autocompletes manager
   * @defaultValue 'interactions/autocompletes'
   */
  autocompletes: DirectoryValue<S>;

  /**
   * Directory for buttons manager
   * @defaultValue 'interactions/buttons'
   */
  buttons: DirectoryValue<S>;

  /**
   * Directory for forms manager
   * @defaultValue 'interactions/forms'
   */
  forms: DirectoryValue<S>;

  /**
   * Directory for selectMenus manager
   * @defaultValue 'interactions/select-menus'
   */
  selectMenus: DirectoryValue<S>;

  /**
   * Directory for commands manager
   */
  commands: P extends true ? Partial<CommandDirectories<S>> : CommandDirectories<S>;
}

/**
 * Interactions feature options
 * @category features
 * @public
 */
export interface InteractionFeatures /* <P extends boolean = false> */ {
  hooks?: InteractionHooks;
}

/**
 * @category hooks
 * @public
 */
export interface InteractionHooks {
  afterInteractionExecute?: (params: {
    interaction: Discord.Interaction,
    data: Interaction | InteractionCommand | ChatInputOption,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterButtonExecute?: (params: {
    interaction: Discord.ButtonInteraction,
    data: Button,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterSelectMenuExecute?: (params: {
    interaction: Discord.AnySelectMenuInteraction,
    data: SelectMenu,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterFormExecute?: (params: {
    interaction: Discord.ModalSubmitInteraction,
    data: Form,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterUserCommandExecute?: (params: {
    interaction: Discord.UserContextMenuCommandInteraction,
    data: UserContextCommand,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterMessageCommandExecute?: (params: {
    interaction: Discord.MessageContextMenuCommandInteraction,
    data: MessageContextCommand,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterChatInputExecute?: (params: {
    interaction: Discord.ChatInputCommandInteraction,
    data: ChatInput,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterCommandExecute?: (params: {
    interaction: Discord.CommandInteraction,
    data: InteractionCommand | ChatInputOption,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterChatInputOptionExecute?: (params: {
    interaction: Discord.ChatInputCommandInteraction,
    data: ChatInputOption,
  } & BaseParams) => Discord.Awaitable<unknown>;
  afterAutocompleteExecute?: (params: {
    interaction: Discord.AutocompleteInteraction,
    data: Autocomplete,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeInteractionExecute?: (params: {
    interaction: Discord.Interaction,
    data: Interaction | InteractionCommand | ChatInputOption,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeButtonExecute?: (params: {
    interaction: Discord.ButtonInteraction,
    data: Button,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeSelectMenuExecute?: (params: {
    interaction: Discord.AnySelectMenuInteraction,
    data: SelectMenu,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeFormExecute?: (params: {
    interaction: Discord.ModalSubmitInteraction,
    data: Form,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeUserCommandExecute?: (params: {
    interaction: Discord.UserContextMenuCommandInteraction,
    data: UserContextCommand,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeMessageCommandExecute?: (params: {
    interaction: Discord.MessageContextMenuCommandInteraction,
    data: MessageContextCommand,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeChatInputExecute?: (params: {
    interaction: Discord.ChatInputCommandInteraction,
    data: ChatInput,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeCommandExecute?: (params: {
    interaction: Discord.CommandInteraction,
    data: InteractionCommand | ChatInputOption,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeChatInputOptionExecute?: (params: {
    interaction: Discord.ChatInputCommandInteraction,
    data: ChatInputOption,
  } & BaseParams) => Discord.Awaitable<unknown>;
  beforeAutocompleteExecute?: (params: {
    interaction: Discord.AutocompleteInteraction,
    data: Autocomplete,
  } & BaseParams) => Discord.Awaitable<unknown>;
}

/**
 * Interaction manager options
 * @category options
 * @public
 */
export interface InteractionManagerOptions extends GlobalOptions {
  contents: InteractionManagerContents;
  directories: InteractionDirectories<false, true>;
  env: EnvironmentOptions;
  features: InteractionFeatures;
}

/**
 * Logger options
 * @category options
 * @public
 */
export interface LoggerOptions {
  directory?: string;
  verbose?: boolean;
}

/**
 * MessageContextCommand
 * @category interactions
 * @public
 * @example
 * ```js
 * const { ApplicationCommandType } = require('discord.js');
 *
 * module.exports = {
 *  body: {
 *    name: 'copy',
 *    description: 'Copy message content',
 *    type: ApplicationCommandType.Message,
 *  },
 *
 *  exec: async ({ interaction }) => {
 *    await interaction.reply(interaction.message.content);
 *  },
 * };
 * ```
 */
export interface MessageContextCommand extends BaseInteraction<{
  interaction: Discord.MessageContextMenuCommandInteraction
}> {
  /**
   * Interaction body
   */
  body: Discord.MessageApplicationCommandData;
}

/**
 * @public
 * MessageContextCommand data
 */
export interface MessageContextCommandData extends MessageContextCommand { path: string; }

/**
 * UserMenu interaction
 * @category interactions
 * @public
 * @example
 * ```js
 * const { ComponentType } = require('discord.js');
 *
 * module.exports = {
 *  body: {
 *    customId: 'select-me',
 *    type: ComponentType.SelectMenu,
 *    options: [
 *      { label: 'me', value: 'Yeaaah' },
 *      { label: 'no-me', value: 'Oh god' },
 *    ],
 *  },
 *
 *  exec: async ({ interaction }) => {
 *    const [value] = interaction.values;
 *    await interaction.reply(value);
 *  },
 * };
 * ```
 */
export interface SelectMenu extends BaseInteraction<{ interaction: SelectMenuInteraction }> {
  /**
   * Interaction body
   */
  body: SelectMenuComponent;
}

/**
 * @public
 * SelectMenuInteraction data
 */
export interface SelectMenuData extends SelectMenu { path: string; }

/**
 * Sucrose logger options
 * @category options
 * @public
 */
export interface SucroseLoggerOptions extends Required<LoggerOptions> {
  details: boolean;
  directory?: string;
}

/**
 * UserContextCommand
 * @category interactions
 * @public
 * @example
 * ```js
 * const { ApplicationCommandType } = require('discord.js');
 *
 * module.exports = {
 *  body: {
 *    name: 'avatar',
 *    description: 'Get user avatar',
 *    type: ApplicationCommandType.User,
 *  },
 *
 *  exec: async ({ interaction }) => {
 *    await interaction.reply(interaction.user.displayAvatarUrl());
 *  },
 * };
 * ```
 */
export interface UserContextCommand extends BaseInteraction<{
  interaction: Discord.UserContextMenuCommandInteraction
}> {
  /**
   * Interaction body
   */
  body: Discord.UserApplicationCommandData;
}

/**
 * UserContextCommand data
 * @public
 */
export interface UserContextCommandData extends UserContextCommand { path: string; }

/**
 * Sucrose options
 * @category options
 * @public
 */
export interface SucroseOptions<P extends boolean = false, S extends boolean = false>
  extends Discord.ClientOptions, Partial<GlobalOptions<P>> {
  cooldown?: BaseCooldownManager<unknown>;
  contents?: P extends true ? Partial<Contents> : Contents;
  directories?: P extends true ? Partial<Directories<true, S>> : Directories<false, S>;
  env?: P extends true ? Partial<EnvironmentOptions> : EnvironmentOptions;
  features?: P extends true ? Partial<Features<true>> : Features;
  token?: string;
}

/**
 * Interaction auto reply feature contents
 * @category contents
 * @public
 */
export interface InteractionContents {
  /**
   * when the interaction encounters a global error
   */
  ERROR: (
    params: { interaction: Discord.Interaction; error: Error; }
  ) => ContentReturn;

  /**
   * when the autocomplete interaction is missing
   */
  AUTOCOMPLETE_INTERACTION_MISSING: (
    params: { interaction: Discord.AutocompleteInteraction; key: string; }
  ) => ContentReturn;

  /**
   * when the autocomplete interaction exec function is not define
   */
  AUTOCOMPLETE_INTERACTION_MISSING_EXEC: (
    params: { interaction: Discord.AutocompleteInteraction; key: string; }
  ) => ContentReturn;

  /**
   * when the button interaction exec function is not define
   */
  BUTTON_INTERACTION_MISSING_EXEC: (
    params: { interaction: Discord.ButtonInteraction; customId: string; }
  ) => ContentReturn;

  /**
   * when the chat input interaction is missing
   */
  CHAT_INPUT_INTERACTION_MISSING: (
    params: { interaction: Discord.CommandInteraction; name: string; }
  ) => ContentReturn;

  /**
   * when the chat input interaction exec function is not define
   */
  CHAT_INPUT_INTERACTION_MISSING_EXEC: (
    params: { interaction: Discord.CommandInteraction; name: string; }
  ) => ContentReturn;

  /**
   * when the chat input group is missing
   */
  CHAT_INPUT_GROUP_MISSING: (
    params: { interaction: Discord.CommandInteraction; name: string; group: string; }
  ) => ContentReturn;

  /**
   * when the chat input group option is missing
   */
  CHAT_INPUT_GROUP_OPTION_MISSING: (
    params: {
      interaction: Discord.CommandInteraction;
      name: string;
      group: string;
      option: string;
    }
  ) => ContentReturn;

  /**
   * when the chat input group option exec function is not define
   */
  CHAT_INPUT_GROUP_OPTION_MISSING_EXEC: (
    params: {
      interaction: Discord.CommandInteraction;
      name: string;
      group: string;
      option: string;
    }
  ) => ContentReturn;

  /**
   * when the chat input option is missing
   */
  CHAT_INPUT_OPTION_MISSING: (
    params: { interaction: Discord.CommandInteraction; name: string; option: string; }
  ) => ContentReturn;

  /**
   * when the chat input option exec function is not define
   */
  CHAT_INPUT_OPTION_MISSING_EXEC: (
    params: { interaction: Discord.CommandInteraction; name: string; option: string; }
  ) => ContentReturn;

  /**
   * when the form interaction exec function is not define
   */
  FORM_INTERACTION_MISSING_EXEC: (
    params: { interaction: Discord.ModalSubmitInteraction; customId: string; }
  ) => ContentReturn;

  /**
   * when the message context menu exec function is not define
   */
  MESSAGE_CONTEXT_MENU_MISSING_EXEC: (
    params: { interaction: Discord.MessageContextCommandCommandInteraction; name: string; }
  ) => ContentReturn;

  /**
   * when no other interaction has been taken
   */
  UNKNOWN_INTERACTION: (params: { interaction: Discord.Interaction }) => ContentReturn

  /**
   * when the user context menu exec function is not define
   */
  USER_CONTEXT_MENU_MISSING_EXEC: (
    params: { interaction: Discord.UserContextCommandCommandInteraction; name: string; }
  ) => ContentReturn;

  /**
   * when the select menu exec function is not define
   */
  SELECT_MENU_INTERACTION_MISSING_EXEC: (
    params: { interaction: SelectMenuInteraction; customId: string; }
  ) => ContentReturn;
}

/**
 * Condition contents
 * @category contents
 * @public
 */
export interface ConditionContents {
  /**
   * When a custom condition failed
   */
  CONDITION_FAILED: (params: {
    conditions: Condition | Condition[];
    interaction?: Discord.Interaction;
    message?: Discord.Message;
  }) => ContentReturn;
}

/**
 * Cooldown contents
 * @category contents
 * @public
 */
export interface CooldownContents {
  /**
   * when an user hit an interaction cooldown
   */
  COOLDOWN_HIT: (params: {
    cooldown: Cooldown;
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    key: string;
  }) => ContentReturn;
}

/**
 * Permission
 * @category contents
 * @public
 */
export interface PermissionContents {
  /**
   * channel id is not allowed for this
   */
  CHANNEL_NOT_ALLOWED: (params: {
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    permission: Permission;
  }) => ContentReturn;

  /**
   * when interaction can only be used in private channel
   */
  GUILD_ONLY: (params: {
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    permission: Permission;
  }) => ContentReturn;

  /**
   * guild id is not allowed for this
   */
  GUILD_NOT_ALLOWED: (params: {
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    permission: Permission;
  }) => ContentReturn;

  /**
   * member don't have required permissions
   */
  MEMBER_PERMISSION_MISSING: (params: {
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    permission: Permission;
  }) => ContentReturn;

  /**
   * user id is not allowed to use this
   */
  USER_NOT_ALLOWED: (params: {
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    permission: Permission;
  }) => ContentReturn;

  /**
   * role id is not allowed to use this
   */
  ROLE_NOT_ALLOWED: (params: {
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    permission: Permission;
  }) => ContentReturn;

  /**
   *  when interaction can only be used in private message
   */
  PRIVATE_ONLY: (params: {
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    permission: Permission;
  }) => ContentReturn;

  /**
   * client don't have required permissions
   */
  SELF_PERMISSION_MISSING: (params: {
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    permission: Permission;
  }) => ContentReturn;
}

/**
 * @public
 */
export type BaseParams = { sucrose: Sucrose };

/**
 * @public
 */
export type ChatInputOption = ChatInputSubGroupOption | ChatInputSubOption;

/**
 * @public
 */
export type ChatInputOptionData = ChatInputSubGroupOptionData | ChatInputSubOptionData;

/**
 * @public
 */
export type Condition<P = { [key: string]: any }> = {
  callback: (params: P & BaseParams) => Discord.Awaitable<boolean>,
  label?: string;
  disabled?: boolean;
};

/**
 * @public
 */
export type Contents = InteractionContents
& CooldownContents
& PermissionContents
& ConditionContents;

/**
 * @public
 */
export type ContentReturn = Discord.Awaitable<
Discord.InteractionReplyOptions
| Discord.MessageReplyOptions
>;

/**
 * @public
 */
export type Cooldown = ({
  /**
   * @example
   * ```js
   * "ROLE" // based on role id
   * "CHANNEL" // based on channel id
   * "USER" // based on user id
   * "GUILD" // based on guild id
   * ```
   */
  type: 'ROLE' | 'CHANNEL' | 'USER' | 'GUILD';

  /**
   * Cooldown for id in included
   */
  included?: string[] | string;

  /**
   * Cooldown for id not in excluded
   */
  excluded?: string[] | string;
} | {
  /**
   * @example
   * ```js
   * "EVERYONE" // basic and global cooldown
   * "SHARED" // cooldown shared with everyone
   * "GUILD_MEMBER" // basic cooldown per member per guild
   * "CHANNEL_MEMBER" // cooldown per member per channel
   * ```
   */
  type: 'EVERYONE' | 'SHARED' | 'GUILD_MEMBER' | 'CHANNEL_MEMBER';
}) & {
  /**
   * Ms value
   */
  value: number;

  /**
   * Limit of cooldown stack. Cooldown stack can wait x time before the user get a warning
   */
  stack?: number;

  /**
   * Add a custom label to your cooldown
   * @defaultValue `undefined`
   * @example
   * ```js
   * interaction.cooldowns.find(p => p.label === "base cooldown");
   * ```
   */
  label?: string;

  /**
   * Let you disable any cooldown
   * @defaultValue `false`
   */
  disabled?: boolean;
};

/**
 * @public
 */
export type DirectoryValue<S extends boolean = false> = S extends true
  ? { path: string, depth: number | null }
  : { path: string, depth: number | null } | string;

/**
 * @public
 */
export type InteractionCommand = ChatInput | MessageContextCommand | UserContextCommand;

/**
 * @public
 */
export type InteractionCommandData = ChatInputData
| MessageContextCommandData
| UserContextCommandData;

/**
 * @public
 */
export type InteractionManagerContents = InteractionContents
& PermissionContents
& CooldownContents
& ConditionContents;

/**
* @internal
*/
export type LoggerLogFormat = 'rainbow' | keyof Omit<LoggerLogStyles, 'colors'> | `${keyof typeof LoggerLogStyles['colors']}` | `${keyof typeof LoggerLogStyles['colors']}-${'background' | 'font'}`;

/**
 * All interaction
 * @public
 */
export type Interaction = Autocomplete | Button | Form | SelectMenu;

/**
 * All interaction data
 * @public
 */
export type InteractionData = AutocompleteData | ButtonData | FormData | SelectMenuData;

/**
 * All select menu
 * @public
 */
export type SelectMenuComponent = (Discord.RoleSelectMenuComponent & {
  type: Discord.ComponentType.RoleSelect
}) | (Discord.UserSelectMenuComponent & { type: Discord.ComponentType.UserSelect })
| (Discord.MentionableSelectMenuComponent & { type: Discord.ComponentType.MentionableSelect })
| (Discord.StringSelectMenuComponent & { type: Discord.ComponentType.StringSelect })
| (Discord.ChannelSelectMenuComponent & { type: Discord.ComponentType.ChannelSelect });

export type SelectMenuInteraction = Discord.AnySelectMenuInteraction;

/**
 * @public
 */
export type Permission = ({
  /**
   * @example
   * ```js
   * "ROLE" // based on role id
   * "CHANNEL" // based on channel id
   * "USER" // based on user id
   * "GUILD" // based on guild id
   * ```
   */
  type: 'CHANNEL' | 'ROLE' | 'USER' | 'GUILD';

  /**
   * allowed ids
   */
  allowed?: string[] | string;

  /**
   * id denied
   */
  denied?: string[] | string;
} | {
  /**
   * @example
   * ```js
   * "SELF" // client permissions
   * "MEMBER" // member permissions
   * ```
   */
  type: 'SELF' | 'MEMBER'

  /**
   * list of permissions required
   */
  permissions: Discord.PermissionResolvable;
} | {
  /**
   * @example
   * ```js
   * "PRIVATE_ONLY" // only usable in private message
   * "GUILD_ONLY" // only usable in guild
   * ```
   */
  type: 'PRIVATE_ONLY' | 'GUILD_ONLY'
}) & {
  /**
   * Add a custom label to your permission
   * @defaultValue `undefined`
   * @example
   * ```js
   * interaction.permissions.find(p => p.label === "base permission");
   * ```
   */
  label?: string;

  /**
   * Let you disable any permission
   * @defaultValue `false`
   */
  disabled?: boolean;
};

/**
 * @internal
 */
type Code = keyof typeof Codes;

/**
 * @internal
 */
type CooldownValue = { value: number; stack?: number };

/**
 * @internal
 */
type EventNames = keyof Discord.ClientEvents;

/**
 * @internal
 */
type Return = any;

/**
 * @internal
 */
enum Codes {
  'FATAL' = '\x1b[1m\x1b[31m🔥 FATAL\x1b[0m',
  'ERROR' = '\x1b[1m\x1b[31m✖ ERROR\x1b[0m',
  'WARN' = '\x1b[1m\x1b[33m🔔 WARN\x1b[0m',
  'INFO' = '\x1b[1m\x1b[36m🔎 INFO\x1b[0m',
  'SUCCESS' = '\x1b[1m\x1b[32m✔ SUCCESS\x1b[0m',
}
