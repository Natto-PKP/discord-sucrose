import type Discord from 'discord.js';
import Sucrose from 'src/Sucrose';
import Base, { type BaseData } from './Base';

export interface PermissionExecuteParams {
  channel?: Discord.Channel | null;
  guild?: Discord.Guild | null;
  member?: Discord.GuildMember | Discord.APIInteractionGuildMember | null;
  user?: Discord.User | null;
  sucrose?: Sucrose | null;
  client: Discord.Client;
}

export interface BasicPermissionData extends BaseData {
  type: 'ROLE' | 'USER' | 'CHANNEL' | 'GUILD';
  allowed?: string[] | null;
  denied?: string[] | null;
}

export interface DiscordPermissionData extends BaseData {
  type: 'SELF' | 'MEMBER';
  permissions: Discord.PermissionResolvable;
}

export interface CustomPermissionData extends BaseData {
  type: 'CUSTOM';
  condition: ((params: PermissionExecuteParams) => Promise<boolean> | boolean) | null;
}

export interface OtherPermissionData extends BaseData {
  type: 'ONLY_PRIVATE' | 'ONLY_GUILD';
}

export type PermissionType = 'ROLE' | 'USER' | 'CHANNEL' | 'GUILD' | 'SELF' | 'MEMBER' | 'CUSTOM' | 'ONLY_PRIVATE' | 'ONLY_GUILD';

export type PermissionData = BasicPermissionData
| DiscordPermissionData | CustomPermissionData | OtherPermissionData;

export default class Permission extends Base {
  public override label: string;

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
