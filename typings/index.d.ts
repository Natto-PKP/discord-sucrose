import type Discord from 'discord.js';

// ! GLOBAL
// ? TYPES
type BaseExec<I> = (params: BaseParams & I) => Discord.Awaitable<void>;
type BaseParams = { sucrose: Sucrose };

// ! CLASSES
// ? MANAGERS
// # command manager
declare class CommandManager extends Discord.ApplicationCommandManager {
  public global: Collection<string, CommandData>;
  public guilds: Collection<Discord.Snowflake, Collection<string, CommandData>>;
  public constructor(sucrose: Sucrose, options: CommandManagerOptions);
  public add(files: string[], guildId?: Discord.Snowflake): Promise<CommandData[]>;
  public add(files: string, guildId?: Discord.Snowflake): Promise<CommandData>;
  public build(): Promise<void>;
  public refresh(names: string[], guildId?: Discord.Snowflake): Promise<CommandData[]>;
  public refresh(names: string, guildId?: Discord.Snowflake): Promise<CommandData>;
  public remove(names: string[], guildId?: Discord.Snowflake): void;
  public remove(names: string, guildId?: Discord.Snowflake): void;
}

// # event manager
declare class EventManager {
  public collection: Collection<keyof Discord.ClientEvents, Event>;
  public constructor(sucrose: Sucrose, options: EventManagerOptions);
  public add(events: Array<keyof Discord.ClientEvents>): Promise<Event[]>;
  public add(events: keyof Discord.ClientEvents): Promise<Event>;
  public build(): Promise<void>;
  public listen(events: Array<keyof Discord.ClientEvents>): Promise<Event[]>;
  public listen(events: keyof Discord.ClientEvents): Promise<Event>;
  public mute(events: Array<keyof Discord.ClientEvents>): Promise<Event[]>;
  public mute(events: keyof Discord.ClientEvents): Promise<Event>;
  public refresh(events: Array<keyof Discord.ClientEvents>): Promise<Event[]>;
  public refresh(events: keyof Discord.ClientEvents): Promise<Event>;
  public remove(events: Array<keyof Discord.ClientEvents>): void;
  public remove(events: keyof Discord.ClientEvents): void;
}

// # interaction manager
declare class InteractionManager {
  public buttons: Collection<string, ButtonData>;
  public selectMenus: Collection<string, SelectMenuData>;
  public constructor(sucrose: Sucrose, options: InteractionManagerOptions);
  public add<T extends keyof InteractionManagerReturn>(
    type: T,
    files: string[]
  ): Promise<InteractionManagerReturn[T][]>;
  public add<T extends keyof InteractionManagerReturn>(type: T, files: string): Promise<InteractionManagerReturn[T]>;
  public build(): Promise<void>;
  public refresh<T extends keyof InteractionManagerReturn>(
    type: T,
    names: string[]
  ): Promise<InteractionManagerReturn[T][]>;
  public refresh<T extends keyof InteractionManagerReturn>(
    type: T,
    names: string
  ): Promise<InteractionManagerReturn[T]>;
}

// ? STRUCTURES
// # event
declare class Event<E extends keyof Discord.ClientEvents = keyof Discord.ClientEvents> {
  public readonly manager: EventManager;
  public readonly name: E;
  public constructor(name: keyof Discord.ClientEvents, options: EventOptions);
  public listen(): Promise<Event<E>>;
  public mute(): Promise<Event<E>>;
  public refresh(): Promise<Event<E>>;
  public remove(): void;
}

// # sucrose
declare class Sucrose extends Discord.Client {
  public readonly commands: CommandManager;
  public readonly interactions: InteractionManager;
  public readonly events: EventManager;
  private constructor(options: SucroseOptions);
  static build(options: SucroseOptions): Promise<Sucrose>;
}

// ! INTERFACES & TYPES
// ? INTERACTIONS
interface BaseInteraction {
  permissions?: Permissions;
}

// # command
export interface ChatInput extends BaseInteraction {
  body: Discord.ChatInputApplicationCommandData;
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

interface ChatInputData extends ChatInput {
  options: Collection<string, CommandOptionData | SubCommandData> | null;
  path: string;
}

export interface SubCommandGroup extends BaseInteraction {
  option: Discord.ApplicationCommandSubGroupData;
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

interface SubCommandGroupData extends SubCommandGroup {
  options: Collection<string, SubCommandData>;
  path: string;
  parent: string;
}

export interface SubCommand extends BaseInteraction {
  option: Discord.ApplicationCommandSubCommandData;
  exec?: BaseExec<{ interaction: Discord.CommandInteraction }>;
}

interface SubCommandData extends SubCommand {
  group?: string;
  path: string;
  parent: string;
}

export interface MessageContextMenu extends BaseInteraction {
  body: Discord.MessageApplicationCommandData;
  exec?: BaseExec<{ interaction: Discord.MessageContextMenuInteraction }>;
}

interface MessageContextMenuData extends MessageContextMenu {
  path: string;
}

export interface UserContextMenu extends BaseInteraction {
  body: Discord.UserApplicationCommandData;
  exec?: BaseExec<{ interaction: Discord.UserContextMenuInteraction }>;
}

interface UserContextMenuData extends UserContextMenu {
  path: string;
}

interface CommandType {
  CHAT_INPUT: ChatInputData;
  USER: UserContextMenuData;
  MESSAGE: MessageContextMenuData;
}

type CommandOption = SubCommandGroup | SubCommand;
type CommandOptionData = SubCommandGroupData | SubCommandData;
type CommandData<T extends keyof CommandType = keyof CommandType> = CommandType[T];

// # buttons
interface ButtonTypes {
  link: Required<Discord.BaseMessageComponentOptions> & Discord.LinkButtonOptions;
  base: Required<Discord.BaseMessageComponentOptions> & Discord.InteractionButtonOptions;
}

export type Button<T extends keyof ButtonTypes = keyof ButtonTypes> = BaseInteraction & {
  data: ButtonTypes[T];
  exec?: BaseExec<{ interaction: Discord.ButtonInteraction }>;
};

type ButtonData<T extends keyof ButtonTypes = keyof ButtonTypes> = Button<T> & { path: string };

// # select menus
export interface SelectMenu extends BaseInteraction {
  data: Required<Discord.BaseMessageComponentOptions> & Discord.MessageSelectMenuOptions;
  exec?: BaseExec<{ interaction: Discord.SelectMenuInteraction }>;
}

interface SelectMenuData extends SelectMenu {
  path: string;
}

interface InteractionManagerReturn {
  buttons: ButtonData;
  selectMenus: SelectMenuData;
}

// ? OPTIONS
// # command manager options
interface BaseCommandManagerOptions {
  directory?: string;
}

interface CommandManagerOptions extends Required<BaseCommandManagerOptions> {
  env: EnvironmentOptions;
  path: string;
}

// # environment options
interface BaseEnvironmentOptions {
  type?: 'production' | 'development';
  outputDir?: string;
  sourceDir?: string;
}

interface EnvironmentOptions extends Required<BaseEnvironmentOptions> {
  directory: string;
  extension: string;
}

// # event manager options
interface BaseEventManagerOptions {
  directory?: string;
  ignore?: Array<keyof Discord.ClientEvents>;
}

interface EventManagerOptions extends Required<BaseEventManagerOptions> {
  env: EnvironmentOptions;
  path: string;
}

// # event options
interface EventOptions {
  sucrose: Sucrose;
  path: string;
}

export type EventHandler<E extends keyof Discord.ClientEvents> = BaseExec<{ args: Discord.ClientEvents[E] }>;

// # interaction manager options
interface InteractionContentOptions {
  MISSING_CLIENT_PERMISSIONS: (
    client: Discord.Client,
    permissions: Discord.PermissionString[]
  ) => Discord.InteractionReplyOptions;
  MISSING_SUB_COMMAND: (name: string) => Discord.InteractionReplyOptions;
  MISSING_SUB_COMMAND_GROUP: (name: string) => Discord.InteractionReplyOptions;
  MISSING_COMMAND: (name: string) => Discord.InteractionReplyOptions;
  MISSING_LOCAL_INTERACTION: (name: string) => Discord.InteractionReplyOptions;
  MISSING_LOCAL_INTERACTION_EXEC: (name: string) => Discord.InteractionReplyOptions;
  MISSING_MEMBER_PERMISSIONS: (
    member: Discord.GuildMember,
    permissions: Discord.PermissionString[]
  ) => Discord.InteractionReplyOptions;
}

interface BaseInteractionManagerOptions {
  contents?: InteractionContentOptions;
  directory?: string;
}

interface InteractionManagerOptions extends Required<BaseInteractionManagerOptions> {
  env: EnvironmentOptions;
  path: string;
}

// # sucrose options
interface SucroseOptions extends Discord.ClientOptions {
  commands?: BaseCommandManagerOptions;
  env?: BaseEnvironmentOptions;
  events?: BaseEventManagerOptions;
  interactions?: BaseInteractionManagerOptions;
  token?: string;
}

// ! UTILS
// # collection
declare class Collection<K, V> extends Discord.Collection<K, V> {
  public get array(): [K, V][];
}

// # permissions
export interface Permissions {
  allow?: Omit<Permissions, 'allow' | 'deny'>;
  channels?: Discord.Snowflake[];
  client?: Discord.PermissionResolvable;
  deny?: Omit<Permissions, 'allow' | 'deny'>;
  guilds?: Discord.Snowflake[];
  members?: Discord.Snowflake[];
  user?: Discord.PermissionResolvable;
  roles?: Discord.Snowflake[];
}
