import type Discord from 'discord.js';
import Base, { BaseData } from './Base';
import Sucrose from '../Sucrose';

export interface CooldownExecuteParams {
  channel?: Discord.Channel;
  guild?: Discord.Guild;
  member?: Discord.GuildMember;
  user?: Discord.User;
  self: Cooldown;
  sucrose: Sucrose;
  client: Discord.Client;
}

export interface GlobalCooldownData extends BaseData {
  duration: number;
  stack?: number | null;
  includeDiscordBots?: boolean | null;
}

export interface BasicCooldownData extends GlobalCooldownData {
  type: 'USER' | 'CHANNEL' | 'GUILD' | 'ROLE';
  includes?: string[] | null;
  excludes?: string[] | null;
}

export interface CustomCooldownData extends GlobalCooldownData {
  type: 'CUSTOM';
  condition: ((params: CooldownExecuteParams) => Promise<boolean> | boolean) | null;
}

export interface OtherCooldownData extends GlobalCooldownData {
  type: 'ONLY_PRIVATE' | 'ONLY_GUILD';
}

export type CooldownData = BasicCooldownData | CustomCooldownData | OtherCooldownData;

export type CooldownType = 'USER' | 'CHANNEL' | 'GUILD' | 'ROLE' | 'CUSTOM' | 'ONLY_PRIVATE' | 'ONLY_GUILD';

export const DEFAULT_DURATION = 3000;

export default class Cooldown extends Base {
  public override label: string;

  public type: CooldownType;

  public duration = DEFAULT_DURATION;

  public stack?: number | null;

  public includeDiscordBots?: boolean | null;

  public includes?: string[] | null;

  public excludes?: string[] | null;

  public condition?: CustomCooldownData['condition'];

  public constructor(cooldown: CooldownData | Cooldown | string) {
    super();

    if (typeof cooldown === 'string') {
      this.label = cooldown;
      this.type = 'CUSTOM';
    } else if (cooldown instanceof Cooldown) {
      this.label = cooldown.label;
      this.type = cooldown.type;
      this.duration = cooldown.duration;
      this.stack = cooldown.stack;
      this.includeDiscordBots = cooldown.includeDiscordBots;
      this.includes = cooldown.includes;
      this.excludes = cooldown.excludes;
      this.condition = cooldown.condition as CustomCooldownData['condition'];
    } else {
      this.label = cooldown.label;
      this.type = cooldown.type;
      this.duration = cooldown.duration;
      this.stack = cooldown.stack;
      this.includeDiscordBots = cooldown.includeDiscordBots;
      this.includes = 'includes' in cooldown ? cooldown.includes : null;
      this.excludes = 'excludes' in cooldown ? cooldown.excludes : null;
      this.condition = 'condition' in cooldown ? cooldown.condition as CustomCooldownData['condition'] : null;
    }
  }

  public override get data(): CooldownData {
    return {
      ...super.data,
      type: this.type,
      duration: this.duration,
      stack: this.stack,
      includeDiscordBots: this.includeDiscordBots,
      includes: this.includes,
      excludes: this.excludes,
      condition: this.condition,
    } as CooldownData;
  }

  public addIncludes(...includes: string[]): this {
    this.includes = this.includes ?? [];
    this.includes.push(...includes);
    return this;
  }

  public removeIncludes(...includes: string[]): this {
    this.includes = this.includes?.filter((include) => !includes.includes(include)) ?? null;
    return this;
  }

  public addExcludes(...excludes: string[]): this {
    this.excludes = this.excludes ?? [];
    this.excludes.push(...excludes);
    return this;
  }

  public removeExcludes(...excludes: string[]): this {
    this.excludes = this.excludes?.filter((exclude) => !excludes.includes(exclude)) ?? null;
    return this;
  }
}
