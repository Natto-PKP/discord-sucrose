/* eslint-disable max-classes-per-file */

import type Discord from 'discord.js';
import type { Code } from '../src/enums/errors';

// ? MANAGERS
// # command manager

declare class BaseManager<T extends InteractionData> {
  public collection: Discord.Collection<string, T>;
  public add(files: string): Promise<T>;
  public add(files: string[]): Promise<T[]>;
  public refresh(names: string): Promise<T>;
  public refresh(names: string[]): Promise<T[]>;
  public remove(names: string): void;
  public remove(names: string[]): void;
}

declare class BaseCommandManager extends BaseManager<CommandData> {
  public define(names: string): Promise<Discord.ApplicationCommand>;
  public define(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public delete(names: string): Promise<Discord.ApplicationCommand>;
  public delete(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public restore(names: string): Promise<Discord.ApplicationCommand>;
  public restore(names: string[]): Promise<Discord.ApplicationCommand[]>;
}

declare class ButtonInteractionManager extends BaseManager<ButtonData> {}
declare class SelectMenuInteractionManager extends BaseManager<SelectMenuData> {}

declare class CommandManager extends BaseCommandManager {
  public guilds: Discord.Collection<string, GuildCommandManager>;
  public build(): Promise<void>;
}

// # EventManager
declare class EventManager {
  public collection: Discord.Collection<keyof Discord.ClientEvents, Event>;
  public build(): Promise<void>;
  public add(events: Array<keyof Discord.ClientEvents>): Promise<Event[]>;
  public add(events: keyof Discord.ClientEvents): Promise<Event>;
  public listen(events: Array<keyof Discord.ClientEvents>): Promise<Event[]>;
  public listen(events: keyof Discord.ClientEvents): Promise<Event>;
  public mute(events: Array<keyof Discord.ClientEvents>): Promise<Event[]>;
  public mute(events: keyof Discord.ClientEvents): Promise<Event>;
  public refresh(events: Array<keyof Discord.ClientEvents>): Promise<Event[]>;
  public refresh(events: keyof Discord.ClientEvents): Promise<Event>;
  public remove(events: Array<keyof Discord.ClientEvents>): void;
  public remove(events: keyof Discord.ClientEvents): void;
}

declare class GuildCommandManager extends BaseCommandManager {
  public readonly guildId: string;
  public build(): Promise<void>;
}

// # InteractionManager
declare class InteractionManager {
  public buttons: ButtonInteractionManager;

  public selectMenus: SelectMenuInteractionManager;
  public build(): Promise<void>;
}

// ? SERVICES

declare class Logger {
  static console: Console;
  static date(format: boolean) : string | Date;
  static error(err: Error): void;
  static handle(...errors: Error[]): void;
  static give(code: Code, content: string): void;
  static table(content: object | unknown[]): void;
  static write(message: string): void;
}

// ? STRUCTURES

// # Sucrose
declare class Sucrose extends Discord.Client {
  public readonly commands: CommandManager;

  public readonly interactions: InteractionManager;

  public readonly events: EventManager;
  static build(options: SucroseOptions): Promise<Sucrose>;
}

export interface SucroseOptions extends Discord.ClientOptions {
  contents?: { interaction?: InteractionContent };
  env?: BaseEnvironmentOptions;
  token?: string;
}

// # Event
declare class Event<E extends keyof Discord.ClientEvents = keyof Discord.ClientEvents> {
  public readonly manager: EventManager;

  public readonly name: E;
  public constructor(name: keyof Discord.ClientEvents, options: EventOptions);
  public listen(): Promise<this>;
  public mute(): Promise<this>;
  public refresh(): Promise<this>;
  public remove(): Promise<void>;
}

// ? INTERFACES

interface BaseEventManagerOptions {
  foo: 'bar';
}

interface BaseEnvironmentOptions {
  source?: string;
  extension?: 'js' | 'ts';
}

interface ButtonTypes {
  link: Required<Discord.BaseMessageComponentOptions> & Discord.LinkButtonOptions;
  base: Required<Discord.BaseMessageComponentOptions> & Discord.InteractionButtonOptions;
}

interface CommandManagerOptions {
  env: EnvironmentOptions;
  path: string;
}

interface CommandType {
  CHAT_INPUT: ChatInputData;
  USER: UserContextMenuData;
  MESSAGE: MessageContextMenuData;
}
interface BaseInteraction {
  permissions?: Permissions;
}

interface ChatInputData extends ChatInput {
  options: Discord.Collection<string, CommandOptionData | SubCommandData> | null;
  path: string;
}

interface EnvironmentOptions {
  path: string;
  ext: string;
}

interface EventOptions {
  sucrose: Sucrose;
  path: string;
}

interface EventManagerOptions {
  env: EnvironmentOptions;
  path: string;
}

interface InteractionManagerOptions {
  content: Required<InteractionContent>;
  env: EnvironmentOptions;
  path: string;
}

interface SubCommandGroupData extends SubCommandGroup {
  options: Discord.Collection<string, SubCommandData>;
  path: string;
  parent: string;
}

interface SubCommandData extends SubCommand {
  group?: string;
  path: string;
  parent: string;
}

interface MessageContextMenuData extends MessageContextMenu {
  path: string;
}

interface UserContextMenuData extends UserContextMenu {
  path: string;
}

interface SelectMenuData extends SelectMenu {
  path: string;
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
  allow?: Omit<Permissions, 'allow' | 'deny'>;
  channels?: Discord.Snowflake[];
  client?: Discord.PermissionResolvable;
  deny?: Omit<Permissions, 'allow' | 'deny'>;
  guilds?: Discord.Snowflake[];
  members?: Discord.Snowflake[];
  user?: Discord.PermissionResolvable;
  roles?: Discord.Snowflake[];
}

export interface SelectMenu extends BaseInteraction {
  data: Required<Discord.BaseMessageComponentOptions> & Discord.MessageSelectMenuOptions;
  exec?: BaseExec<{ interaction: Discord.SelectMenuInteraction }>;
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

// ? TYPES

type BaseExec<I> = (params: BaseParams & I) => Discord.Awaitable<void>;
type BaseParams = { sucrose: Sucrose };
type ButtonData<T extends keyof ButtonTypes = keyof ButtonTypes> = Button<T> & { path: string };
type CommandOption = SubCommandGroup | SubCommand;
type CommandOptionData = SubCommandGroupData | SubCommandData;
type CommandData<T extends keyof CommandType = keyof CommandType> = CommandType[T];
type DiscordCommand = Discord.UserContextMenuInteraction &
Discord.MessageContextMenuInteraction &
Discord.CommandInteraction;
type InteractionData = CommandData | ButtonData | SelectMenuData;

export type Button<T extends keyof ButtonTypes = keyof ButtonTypes> = BaseInteraction & {
  data: ButtonTypes[T];
  exec?: BaseExec<{ interaction: Discord.ButtonInteraction }>;
};
export type EventHandler<E extends keyof Discord.ClientEvents> = BaseExec<{
  args: Discord.ClientEvents[E]
}>;

// ? CONTENTS

interface InteractionContent {
  ERROR?: (err: Error) => Discord.InteractionReplyOptions;
  MISSING_CLIENT_PERMISSIONS?: (
    client: Discord.Client,
    permissions: Discord.PermissionString[]
  ) => Discord.InteractionReplyOptions;
  MISSING_SUB_COMMAND?: (name: string) => Discord.InteractionReplyOptions;
  MISSING_SUB_COMMAND_GROUP?: (name: string) => Discord.InteractionReplyOptions;
  MISSING_COMMAND?: (name: string) => Discord.InteractionReplyOptions;
  MISSING_LOCAL_INTERACTION?: (name: string) => Discord.InteractionReplyOptions;
  MISSING_LOCAL_INTERACTION_EXEC?: (name: string) => Discord.InteractionReplyOptions;
  MISSING_MEMBER_PERMISSIONS?: (
    member: Discord.GuildMember,
    permissions: Discord.PermissionString[]
  ) => Discord.InteractionReplyOptions;
}
