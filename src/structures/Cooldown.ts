import type Discord from 'discord.js';
import { Callback } from 'src/typings';
import { Base, BaseData } from './Base';
import { Sucrose } from '../Sucrose';

/**
 * Cooldown execute params
 * @internal
 */
export interface CooldownExecuteParams {
  /**
   * Discord channel
   */
  channel?: Discord.Channel | null;

  /**
   * Discord guild
   */
  guild?: Discord.Guild | null;

  /**
   * Discord member
   */
  member?: Discord.GuildMember | Discord.APIInteractionGuildMember | null;

  /**
   * Discord user
   */
  user?: Discord.User | null;

  /**
   * Sucrose client
   */
  sucrose?: Sucrose | null;

  /**
   * Discord client
   */
  client: Discord.Client;
}

/**
 * Cooldown data
 * @internal
 */
interface GlobalCooldownData extends BaseData {
  duration: number;
  stack?: number | null;
}

/**
 * Basic cooldown data
 * @public
 */
export interface BasicCooldownData extends GlobalCooldownData {
  /**
   * @example
   * ```ts
   * type = 'USER'; // cooldown per user
   * type = 'CHANNEL'; // cooldown per channel
   * type = 'GUILD'; // cooldown per guild
   * type = 'ROLE'; // cooldown per role
   * ```
   */
  type: 'USER' | 'CHANNEL' | 'GUILD' | 'ROLE';

  /**
   * add ids who can't bypass the cooldown
   */
  includes?: string[] | null;

  /**
   * add ids who can bypass the cooldown
   */
  excludes?: string[] | null;
}

/**
 * Custom cooldown data
 * @public
 */
export interface CustomCooldownData extends GlobalCooldownData {
  /**
   * custom type let you create your own cooldown condition
   */
  type: 'CUSTOM';

  /**
   * custom condition must return a boolean
   */
  condition: Callback<CooldownExecuteParams, boolean> | null;
}

/**
 * Other cooldown data
 * @public
 */
export interface OtherCooldownData extends GlobalCooldownData {
  /**
   * if you want to use the cooldown only in private channel or only in guild
   */
  type: 'ONLY_PRIVATE' | 'ONLY_GUILD';
}

/**
 * Cooldown data
 * @public
 * @example
 * ```ts
 * import { CooldownData } from 'sucrose';
 *
 * export default <CooldownData>{
 *   label: 'my-custom-cooldown',
 *   type: 'CUSTOM',
 *   duration: 3000,
 *   stack: 1,
 *   condition: () => true,
 * };
 */
export type CooldownData = BasicCooldownData | CustomCooldownData | OtherCooldownData;

/**
 * Cooldown type
 * @public
 */
export type CooldownType = 'USER' | 'CHANNEL' | 'GUILD' | 'ROLE' | 'CUSTOM' | 'ONLY_PRIVATE' | 'ONLY_GUILD';

const DEFAULT_DURATION = 3000;

/**
 * Cooldown
 * @public
 * @example
 * ```ts
 * import { Cooldown } from 'sucrose';
 *
 * const cooldown = new Cooldown('my-custom-cooldown');
 * cooldown.setDuration(3000);
 * cooldown.setStack(1);
 * cooldown.setCondition(() => true);
 *
 * export default cooldown;
 * ```
 * @example
 * ```ts
 * import { Cooldown } from 'sucrose';
 *
 * const data = <CooldownData>{
 *   label: 'my-custom-cooldown',
 *   type: 'USER',
 *   duration: 3000,
 *   stack: 1,
 *   includes: ['123456789012345678'],
 *   excludes: ['123456789012345678'],
 * };
 *
 * export default new Cooldown(data);
 */
export class Cooldown extends Base {
  public override label: string;

  /**
   * @example
   * ```ts
   * type = 'USER'; // cooldown per user
   * type = 'CHANNEL'; // cooldown per channel
   * type = 'GUILD'; // cooldown per guild
   * type = 'ROLE'; // cooldown per role
   * type = 'CUSTOM'; // custom cooldown
   * type = 'ONLY_PRIVATE'; // cooldown only in private channel
   * type = 'ONLY_GUILD'; // cooldown only in guild
   * ```
   */
  public type: CooldownType;

  /**
   * cooldown duration in ms
   * @default 3000
   */
  public duration = DEFAULT_DURATION;

  /**
   * stack is the number of times the cooldown can be triggered before it is blocked
   */
  public stack?: number | null;

  /**
   * add ids who can't bypass the cooldown
   */
  public includes?: string[] | null;

  /**
   * add ids who can bypass the cooldown
   */
  public excludes?: string[] | null;

  /**
   * custom condition must return a boolean
   */
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
      this.includes = cooldown.includes;
      this.excludes = cooldown.excludes;
      this.condition = cooldown.condition as CustomCooldownData['condition'];
    } else {
      this.label = cooldown.label;
      this.type = cooldown.type;
      this.duration = cooldown.duration;
      this.stack = cooldown.stack;
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
      includes: this.includes,
      excludes: this.excludes,
      condition: this.condition,
    } as CooldownData;
  }

  /**
   * set cooldown type
   * @param type - cooldown type
   * @returns - this
   */
  public setType(type: CooldownType): this {
    this.type = type;
    return this;
  }

  /**
   * set cooldown duration
   * @param duration - cooldown duration in ms
   * @returns - this
   */
  public setDuration(duration: number): this {
    this.duration = duration;
    return this;
  }

  /**
   * set stack
   * @param stack - stack in number
   * @returns - this
   */
  public setStack(stack: number | null): this {
    this.stack = stack;
    return this;
  }

  /**
   * set condition
   * @param condition - custom function who return a boolean
   * @returns - this
   */
  public setCondition(condition: CustomCooldownData['condition']): this {
    this.condition = condition;
    return this;
  }

  /**
   * add ids who can't bypass the cooldown
   * @param includes - ids to add
   * @returns - this
   */
  public addIncludes(...includes: string[]): this {
    this.includes = this.includes ?? [];
    this.includes.push(...includes);
    return this;
  }

  /**
   * remove ids who can't bypass the cooldown
   * @param includes - ids to remove
   * @returns - this
   */
  public removeIncludes(...includes: string[]): this {
    this.includes = this.includes?.filter((include) => !includes.includes(include)) ?? null;
    return this;
  }

  /**
   * set ids who can't bypass the cooldown
   * @param includes - ids to set
   * @returns - this
   */
  public setIncludes(includes: string[] | null): this {
    this.includes = includes;
    return this;
  }

  /**
   * add ids who can bypass the cooldown
   * @param excludes - ids to add
   * @returns - this
   */
  public addExcludes(...excludes: string[]): this {
    this.excludes = this.excludes ?? [];
    this.excludes.push(...excludes);
    return this;
  }

  /**
   * remove ids who can bypass the cooldown
   * @param excludes - ids to remove
   * @returns - this
   */
  public removeExcludes(...excludes: string[]): this {
    this.excludes = this.excludes?.filter((exclude) => !excludes.includes(exclude)) ?? null;
    return this;
  }

  /**
   * set ids who can bypass the cooldown
   * @param excludes - ids to set
   * @returns - this
   */
  public setExcludes(excludes: string[] | null): this {
    this.excludes = excludes;
    return this;
  }
}
