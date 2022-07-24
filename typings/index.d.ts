/* eslint-disable max-classes-per-file */

/**
 * @module discord-sucrose
 */

import type Discord from 'discord.js';

/**
 * Base structure for command manager
 * @category managers
 *
 * @public
 * @example Initialize BaseCommandManager
 * ```js
 * new BaseCommandManager(sucrose, options);
 * ```
 */
declare class BaseCommandManager extends Discord.Collection<string, CommandData> {
  constructor(sucrose: Sucrose, options: BaseCommandManagerOptions);

  /**
   * Load and set a new command
   * @param file
   * @example Add a new command
   * ```js
   * manager.add('command.js')
   * ```
   * @returns
   */
  public async add(file: string): Promise<CommandData>;

  /**
   * Send a existing command in discord api
   * @param name
   * @example Send a command
   * ```js
   * manager.name('commandName')
   * ```
   * @returns
   */
  public async define(name: string): Promise<Discord.ApplicationCommand | null | undefined>;

  /**
   * Delete a existing command in discord api
   * @param name
   * @example Delete a command
   * ```js
   * manager.remove('commandName')
   * ```
   * @returns
   */
  public async remove(name: string): Promise<Discord.ApplicationCommand | null | undefined>;

  /**
   * Delete and add an existing command
   * @param name
   * @example Refresh a command
   * ```js
   * manager.refresh('commandName')
   * ```
   * @returns
   */
  public async refresh(name: string): Promise<CommandData>;

  /**
   * Remove and define an existing command
   * @param name
   * @example Restore a command
   * ```js
   * manager.restore('commandName')
   * ```
   * @returns
   */
  public async restore(name: string): Promise<Discord.ApplicationCommand | null | undefined>;
}

/**
 * Base structure for basic discord.js interaction
 * @category managers
 *
 * @public
 * @example Initialize new BaseInteractionManager
 * ```js
 * new BaseInteractionManager(options);
 * ```
 */
declare class BaseInteractionManager<T extends InteractionData = InteractionData>
  extends Discord.Collection<string, T> {
  /**
   * Define interactions directory
   */
  public path: string;

  constructor(options: BaseInteractionManagerOptions<T>);

  /**
   * Build this interaction manager
   */
  public async build(): Promise<void>;

  /**
   * Delete and set an existing interaction
   * @param name
   *
   * @example
   * ```js
   * manager.refresh('interaction-name');
   * ```
   *
   * @returns
   */
  public async refresh(name): Promise<this>;
}

/**
 * commands manager
 * @category managers
 *
 * @public
 * @example Initialize new CommandManager
 * ```js
 * new CommandManager(sucrose, options)
 * ```
 */
declare class CommandManager extends BaseCommandManager implements Types.CommandManager {
  /**
   * GuildCommandManager collection
   */
  public readonly guilds: Discord.Collection<Discord.Snowflake, GuildCommandManager>;

  constructor(sucrose: Sucrose, options: CommandManagerOptions);

  /**
   * load all global command and build potential guild command manager
   */
  public async build(): Promise<void>;
}

/**
 * Structure for manager our event
 * @category managers
 *
 * @public
 * @example Initialize new Event
 * ```js
 * new Event(options);
 * ```
 */
declare class Event<E extends EventNames = EventNames> {
  /**
   * determines whether the event is running or not
   * @readonly
   * @defaultValue false
   */
  public disabled = false;

  /**
    * redirects to the event manager
    * @readonly
    * @remarks
    * See {@link EventManager}
    */
  public readonly manager: EventManager;

  /**
   * Path to event folder
   */
  public path: string;

  public constructor(public readonly name: E, options: EventOptions);

  /**
   * active this event - search et load event handler in your files and run event listener
   *
   * @example
   * ```js
   * await event.listen();
   * ```
   */
  public async listen(): Promise<this>;

  /**
   * disable this event
   *
   * @example
   * ```js
   * await event.mute();
   * ```
   */
  public async mute(): Promise<this>;

  /**
   * refresh this event - mute and listen event
   *
   * @example
   * ```js
   * await event.refresh();
   * ```
   */
  public async refresh(): Promise<this>;

  /**
 * remove/delete this event - destroy this event
 *
 * @example
 * ```js
 * await event.refresh();
 * ```
 */
  public async remove(): Promise<void>;
}

/**
 * event manager
 * @category managers
 *
 * @public
 * @example Initialize EventManager
 * ```js
 * new EventManager(sucrose, options)
 * ```
 */
declare class EventManager extends Discord.Collection<Types.EventNames, Event> {
  constructor(sucrose: Sucrose, options: EventManagerOptions);

  /**
    * load and build each event
    */
  public async build(): Promise<void>;

  /**
    * load one or multiple events
    *
    * @example
    * ```js
    * await events.create("ready");
    * ```
    */
  public async add(name: EventNames): Promise<Event>;

  /**
    * active one or multiple events
    *
    * @example
    * ```js
    * await events.listen("ready");
    * ```
    */
  public async listen(name: EventNames): Promise<Event>;

  /**
    * desactive one or multiple events
    *
    * @example
    * ```js
    * await events.mute("ready");
    * ```
    */
  public async mute(name: EventNames): Promise<Event>;

  /**
    * refresh one or multiple events (remove() and add())
    *
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
    *
    * @example
    * ```js
    * await events.remove("ready");
    * ```
    */
  public remove(name: EventNames): void;
}

/**
 * guild command manager
 * @category managers
 *
 * @public
 * @example Initialize new GuildCommandManager
 * ```js
 * new GuildCommandManager(sucrose, options);
 * ```
 */
declare class GuildCommandManager extends BaseCommandManager {
  /**
   * id of the guild the manager is based on
   * @readonly
   */
  public readonly guildId: Discord.Snowflake;

  constructor(sucrose: Types.Sucrose, options: Types.GuildCommandManagerOptions);

  /**
   * load all guild commands
   */
  public async build(): Promise<void>;
}

/**
 * Structure for manage all classic interaction
 * @category managers
 *
 * @public
 * @example Initialize new InteractionManager
 * ```js
 * new InteractionManager(sucrose, options);
 * ```
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
  static console: Console;

  static clear(): void;

  /**
   * get current date formatted
   *
   * @param format - allow to format date (default true)
   */
  static date(format = true): string | Date;

  /**
   * give a code with content message to write
   *
   * @param code - code of log level
   * @param content - content to log
   */
  static give(code: Code, content: Error | string): void;

  /**
   * handle errors array
   *
   * @param errors - array or errors to log
   */
  static handle(...errors: Error[]): void;

  /**
   * Generate loading bar
   *
   * @param total
   */
  static* loading(total: number): Generator<void, void, { index: number; message: string; }>;

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

/**
 * Sucrose client
 *
 * @public
 * @example Initialize new Sucrose client
 * ```js
 * const client = await Sucrose.build(options);
 * ```
 */
declare class Sucrose extends Discord.Client {
  /**
   * commands manager
   * @readonly
   */
  public readonly commands: CommandManager;

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
   * build your Sucrose client
   *
   * @param options - Sucrose options
   * @returns Sucrose
   *
   * @example
   * ```js
   * const client = await Sucrose.build(options);
   * ```
   */
  static async build(options: SucroseOptions): Promise<Sucrose>;
}

/**
 * Autocomplete interaction object
 * @category interactions
 *
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
export interface Autocomplete {
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

  /**
   * Trigger when this interaction is called
   */
  exec?: BaseInteractionExec<{ interaction: Discord.AutocompleteInteraction }>;
}

/**
 * Autocomplete interaction data
 * @public
 */
export interface AutocompleteData extends Autocomplete {
  path: string;
}

/**
 * BaseCommandManagerOptions
 * @category options
 * @public
 */
export interface BaseCommandManagerOptions extends GlobalOptions {
  env: EnvironmentOptions;
  directory: string;
}

/**
 * Base interaction
 * @public
 */
export interface BaseInteraction { path: string; }

/**
 * BaseInteractionManager options
 * @category options
 * @public
 */
export interface BaseInteractionManagerOptions extends GlobalOptions {
  env: EnvironmentOptions;
  name: string;
  directory: string;
}

/**
 * Button interaction object
 * @category interactions
 *
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
export interface Button {
  /**
   * Interaction body
   */
  body: Discord.ButtonComponentData;

  /**
   * Trigger when this interaction is called
   */
  exec?: BaseInteractionExec<{ interaction: Discord.ButtonInteraction }>;

  permissions?: Permissions;
}

/**
 * Button interaction data
 * @public
 */
export interface ButtonData extends Button { path: string; }

/**
 * ChatInput interaction
 * @category interactions
 *
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
export interface ChatInput {
  /**
   * Interaction chat input body
   */
  body: Discord.ChatInputApplicationCommandData;

  /**
   * Trigger when this interaction is called
   */
  exec?: BaseInteractionExec<{ interaction: Discord.ChatInputCommandInteraction }>;

  permissions?: Permissions;
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
 *
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
export interface ChatInputSubGroupOption {
  /**
   * Interaction body
   */
  body: Discord.ApplicationCommandSubGroupData;
  permissions?: Permissions;
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
 *
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
export interface ChatInputSubOption {
  /**
   * interaction body
   */
  body: Discord.ApplicationCommandSubCommandData;

  /**
   * Trigger when this interaction is called
   */
  exec?: BaseInteractionExec<{ interaction: Discord.ChatInputCommandInteraction }>;
  permissions?: Permissions;
}

/**
 * ChatInputSubOption data
 * @public
 */
export interface ChatInputSubOptionData extends ChatInputSubOption { path: string; }

/**
 * Configure directories for commands managers
 * @public
 */
export interface CommandDirectories {
  /**
   * Configure directory for globals commands
   * @defaultValue 'commands/globals'
   */
  globals: string,

  /**
   * Configure directory for guilds commands
   * @defaultValue 'commands/guilds'
   */
  guilds: string,
}

/**
 * CommandManager options
 * @category options
 * @public
 */
export interface CommandManagerOptions extends BaseCommandManagerOptions {
  directories: CommandDirectories;
}

/**
 * Configure directories for interactions manager
 * @public
 */
export interface Directories {
  /**
   * Configure directories for commands manager
   */
  commands: CommandDirectories;

  /**
   * Configure directory for events manager
   * @defaultValue 'events'
   */
  events: string;

  /**
   * Configure directories form interactions manager
   */
  interactions: InteractionDirectories;
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
  directory: string;
}

/**
 * Event options
 * @category options
 * @public
 */
export interface EventOptions extends GlobalOptions {
  env: EnvironmentOptions;
  sucrose: Sucrose;
  path: string;
}

/**
 * Sucrose features
 * @features
 * @public
 */
export interface Features {
  interactions: InteractionFeatures;
}

/**
 * Form interaction
 * @category interactions
 *
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
export interface Form {
  /**
   * Interaction form
   */
  body: Discord.ModalComponentData;

  /**
   * Trigger when this interaction is called
   */
  exec?: BaseInteractionExec<{ interaction: Discord.ModalSubmitInteraction }>;
  permissions?: Permissions;
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
export interface GlobalOptions {
  logging: LoggingOptions;
}

/**
 * GuildCommandManager options
 * @category options
 * @public
 */
export interface GuildCommandManagerOptions extends BaseCommandManagerOptions {
  guildId: Discord.Snowflake;
}

/**
 * AutoReply to interaction (error message)
 * @category features
 * @public
 */
export interface InteractionAutoReplyFeature {
  /**
   * @defaultValue true
   */
  active: boolean;

  /**
   * Custom reply message
   */
  contents: InteractionAutoReplyContents;
}

/**
 * Interaction directories
 * @public
 */
export interface InteractionDirectories {
  /**
   * Directory for autocompletes manager
   * @defaultValue 'interactions/autocompletes'
   */
  autocompletes: string;

  /**
   * Directory for buttons manager
   * @defaultValue 'interactions/buttons'
   */
  buttons: string;

  /**
   * Directory for forms manager
   * @defaultValue 'interactions/forms'
   */
  forms: string;

  /**
   * Directory for selectMenus manager
   * @defaultValue 'interactions/select-menus'
   */
  selectMenus: string;
}

/**
 * Interactions feature options
 * @category features
 * @public
 */
export interface InteractionFeatures {
  autoReply: InteractionAutoReplyFeature;
}

/**
 * Interaction manager options
 * @category options
 * @public
 */
export interface InteractionManagerOptions extends GlobalOptions {
  directories: InteractionDirectories;
  features: InteractionFeatures;
  env: EnvironmentOptions;
}

/**
 * Logging options
 * @category options
 * @public
 */
export interface LoggingOptions {
  /**
   * Active loading bar when your app start
   * @default true
   */
  loadings: boolean;

  /**
   * Active log details when your app start (console.table of interactions loaded)
   * @default false
   */
  details: boolean;
}

/**
 * MessageContextMenu
 * @category interactions
 *
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
export interface MessageContextMenu {
  /**
   * Interaction body
   */
  body: Discord.MessageApplicationCommandData;

  /**
   * Trigger when this interaction is called
   */
  exec?: BaseInteractionExec<{ interaction: Discord.MessageContextMenuCommandInteraction }>
  permissions?: Permissions;
}

/**
 * @public
 * MessageContextMenu data
 */
export interface MessageContextMenuData extends MessageContextMenu { path: string; }

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
 * UserMenu interaction
 * @category interactions
 *
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
export interface SelectMenu {
  /**
   * Interaction body
   */
  body: Discord.SelectMenuComponent;

  /**
   * Trigger when this interaction is called
   */
  exec?: BaseInteractionExec<{ interaction: Discord.SelectMenuInteraction }>;
  permissions?: Permissions;
}

/**
 * @public
 * SelectMenuInteraction data
 */
export interface SelectMenuData extends SelectMenu { path: string; }

/**
 * UserContextMenu
 * @category interactions
 *
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
export interface UserContextMenu {
  /**
   * Interaction body
   */
  body: Discord.UserApplicationCommandData;

  /**
   * Trigger when this interaction is called
   */
  exec?: BaseInteractionExec<{ interaction: Discord.UserContextMenuCommandInteraction }>;
  permissions?: Permissions;
}

/**
 * UserContextMenu data
 * @public
 */
export interface UserContextMenuData extends UserContextMenu { path: string; }

/**
 * Interaction auto reply feature contents
 * @category contents
 * @public
 */
export interface InteractionAutoReplyContents {
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
    params: { interaction: Discord.MessageContextMenuCommandInteraction; name: string; }
  ) => ContentReturn;

  /**
   * when no other interaction has been taken
   */
  UNKNOWN_INTERACTION: (params: { interaction: Discord.Interaction }) => ContentReturn

  /**
   * when the user context menu exec function is not define
   */
  USER_CONTEXT_MENU_MISSING_EXEC: (
    params: { interaction: Discord.UserContextMenuCommandInteraction; name: string; }
  ) => ContentReturn;

  /**
   * when the client missing permissions
   */
  PERMISSIONS_CLIENT_MISSING: (
    params: { interaction: Discord.Interaction; permissions: Discord.PermissionsString[]; }
  ) => ContentReturn;

  /**
   * when the current guild is not allowed
   */
  PERMISSIONS_CURRENT_GUILD_NOT_ALLOWED: (
    params: { interaction: Discord.Interaction; guildIDs: Discord.Snowflake[]; }
  ) => ContentReturn;

  /**
   * when the guild channel is not allowed
   */
  PERMISSIONS_CURRENT_GUILD_CHANNEl_NOT_ALLOWED: (
    params: { interaction: Discord.Interaction; channelIDs: Discord.Snowflake[]; }
  ) => ContentReturn;

  /**
   * when guid is not allowed
   */
  PERMISSIONS_GUILD_NOT_ALLOWED: (
    params: { interaction: Discord.Interaction; }
  ) => ContentReturn;

  /**
   * when the member missing permissions
   */
  PERMISSIONS_CURRENT_MEMBER_MISSING: (
    params: { interaction: Discord.Interaction; permissions: Discord.PermissionsString[]; }
  ) => ContentReturn;

  /**
   * when one of allowed roles is missing in member
   */
  PERMISSIONS_MEMBER_ALLOW_ROLES_MISSING: (
    params: { interaction: Discord.Interaction; roleIDs: Discord.Snowflake[]; }
  ) => ContentReturn;

  /**
   * when the user is not allowed
   */
  PERMISSIONS_CURRENT_USER_NOT_ALLOWED: (
    params: { interaction: Discord.Interaction; userIDs: Discord.Snowflake[]; }
  ) => ContentReturn;

  /**
   * when private channel is not allowed
   */
  PERMISSIONS_PRIVATE_CHANNEL_NOT_ALLOWED: (
    params: { interaction: Discord.Interaction; }
  ) => ContentReturn;

  /**
   * when the select menu exec function is not define
   */
  SELECT_MENU_INTERACTION_MISSING_EXEC: (
    params: { interaction: Discord.SelectMenuInteraction; customId: string; }
  ) => ContentReturn;
}

/**
 * Sucrose options
 * @category options
 * @public
 */
export interface SucroseOptions extends Discord.ClientOptions, Partial<GlobalOptions> {
  directories?: Partial<Directories>;
  env?: Partial<EnvironmentOptions>;
  features?: Partial<Features>;
  token?: string;
}

/**
 * Base interaction exec
 * @public
 */
export type BaseInteractionExec<T> = (params: BaseParams & T) => Return;

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
export type Command = ChatInput | MessageContextMenu | UserContextMenu;

/**
 * @public
 */
export type CommandData = ChatInputData | MessageContextMenuData | UserContextMenuData;

/**
 * @public
 */
export type EventHandler<E extends EventNames> = (
  params: EventHandlerParams<E>
) => unknown;

/**
 * @public
 */
export type EventHandlerParams<E extends EventNames> = BaseParams & {
  args: Discord.ClientEvents[E];
};

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
 * @internal
 */
type ContentReturn = Discord.InteractionReplyOptions | Promise<Discord.InteractionReplyOptions >;

/**
 * @internal
 */
type EventNames = keyof Discord.ClientEvents;

/**
 * @internal
 */
type MessageReturn = Promise<Discord.MessageOptions> | Discord.MessageOptions;

/**
 * @internal
 */
type Return = unknown;

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

/**
 * @internal
 */
type Code = keyof typeof Codes;
