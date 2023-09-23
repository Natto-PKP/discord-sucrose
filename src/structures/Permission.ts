import type Discord from 'discord.js';
import { Sucrose } from '../Sucrose';
import type { Callback } from './BaseExecutable';
import { Base, type BaseData } from './Base';

/**
 * Cooldown execute params
 * @internal
 */
export interface PermissionExecuteParams {
  channel?: Discord.Channel | null;
  guild?: Discord.Guild | null;
  member?: Discord.GuildMember | Discord.APIInteractionGuildMember | null;
  user?: Discord.User | null;
  sucrose?: Sucrose | null;
  client: Discord.Client;
}

/**
 * Cooldown data
 * @public
 */
export interface BasicPermissionData extends BaseData {
  /**
   * @example
   * ```ts
   * type = 'ROLE'; // permission for role
   * type = 'USER'; // permission for user
   * type = 'CHANNEL'; // permission for channel
   * type = 'GUILD'; // permission for guild
   * ```
   */
  type: 'ROLE' | 'USER' | 'CHANNEL' | 'GUILD';

  /**
   * add ids who is allowed to execute this command
   */
  allowed?: string[] | null;

  /**
   * add ids who is denied to execute this command
   */
  denied?: string[] | null;
}

/**
 * Cooldown data
 * @public
 */
export interface DiscordPermissionData extends BaseData {
  /**
   * @example
   * ```ts
   * type = 'SELF'; // permission for current bot
   * type = 'MEMBER'; // permission for user member
   * ```
   */
  type: 'SELF' | 'MEMBER';

  /**
   * add needed permissions to execute this command
   */
  permissions: Discord.PermissionResolvable;
}

/**
 * Cooldown data
 * @public
 */
export interface CustomPermissionData extends BaseData {
  /**
   * custom type allows you to create your own permission with a condition
   */
  type: 'CUSTOM';

  /**
   * custom condition must return a boolean
   */
  condition: Callback<PermissionExecuteParams, boolean> | null;
}

export interface OtherPermissionData extends BaseData {
  /**
   * if you want to allow only in private channel or only in guild
   */
  type: 'ONLY_PRIVATE' | 'ONLY_GUILD';
}

/**
 * Permission type
 * @public
 */
export type PermissionType = 'ROLE' | 'USER' | 'CHANNEL' | 'GUILD' | 'SELF' | 'MEMBER' | 'CUSTOM' | 'ONLY_PRIVATE' | 'ONLY_GUILD';

/**
 * Permission data
 * @public
 */
export type PermissionData = BasicPermissionData
| DiscordPermissionData | CustomPermissionData | OtherPermissionData;

/**
 * Permission class
 * @public
 * @example
 * ```ts
 * const permission = new Permission({
 *   label: 'admin',
 *   type: 'ROLE',
 *   allowed: ['123456789'],
 * });
 * ```
 */
export class Permission extends Base {
  public type: PermissionType;

  public allowed?: string[] | null;

  public denied?: string[] | null;

  public permissions?: Discord.PermissionResolvable | null;

  public condition?: CustomPermissionData['condition'];

  public constructor(permission: PermissionData | Permission | string) {
    super();

    if (typeof permission === 'string') {
      this.label = permission;
      this.type = 'CUSTOM';
    } else if (permission instanceof Permission) {
      this.label = permission.label;
      this.type = permission.type;
      this.allowed = permission.allowed;
      this.denied = permission.denied;
      this.permissions = permission.permissions;
      this.condition = permission.condition as CustomPermissionData['condition'];
    } else {
      this.label = permission.label;
      this.type = permission.type;
      this.allowed = 'allowed' in permission ? permission.allowed : null;
      this.denied = 'denied' in permission ? permission.denied : null;
      this.permissions = 'permissions' in permission ? permission.permissions : null;
      this.condition = 'condition' in permission ? permission.condition as CustomPermissionData['condition'] : null;
    }
  }

  public override get data(): PermissionData {
    return {
      ...super.data,
      type: this.type,
      allowed: this.allowed,
      denied: this.denied,
      permissions: this.permissions,
      condition: this.condition,
    } as PermissionData;
  }

  public addAllowed(...allowed: string[]): this {
    this.allowed = this.allowed ?? [];
    this.allowed.push(...allowed);
    return this;
  }

  public addDenied(...denied: string[]): this {
    this.denied = this.denied ?? [];
    this.denied.push(...denied);
    return this;
  }

  public removeAllowed(...allowed: string[]): this {
    this.allowed = this.allowed?.filter((allow) => !allowed.includes(allow)) ?? null;
    return this;
  }

  public removeDenied(...denied: string[]): this {
    this.denied = this.denied?.filter((deny) => !denied.includes(deny)) ?? null;
    return this;
  }
}
