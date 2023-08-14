import type Discord from 'discord.js';
import Permission, { PermissionData } from './Permission';
import Cooldown, { CooldownData } from './Cooldown';
import BaseExecutable, { type BaseExecutableData, type BaseExecutableParams } from './BaseExecutable';

type Perm = Permission | PermissionData;
type Coold = Cooldown | CooldownData;

export interface BaseInteractionParams extends BaseExecutableParams {
  interaction: Discord.Interaction;
}

export interface BaseInteractionData<P = { }, B = unknown> extends BaseExecutableData<P> {
  body: B;
  permissions?: (Perm)[] | Perm | null;
  cooldowns?: (Coold)[] | (Coold) | null;
}

export default class BaseInteraction<P = { }, B = unknown> extends BaseExecutable<P> {
  public body: B;

  public permissions?: (Perm)[] | Perm | null;

  public cooldowns?: (Coold)[] | (Coold) | null;

  constructor(data?: BaseInteractionData<P, B> | BaseInteraction<P, B> | null) {
    super(data);

    const d = (data instanceof BaseInteraction ? data.data : data) ?? this.data;
    this.body = d.body as B;
    this.permissions = d.permissions ?? null;
    this.cooldowns = d.cooldowns ?? null;
  }

  public override get data(): BaseInteractionData<P> {
    return {
      ...super.data,
      body: this.body,
      permissions: this.permissions,
      cooldowns: this.cooldowns,
    };
  }

  public addPermissions(...permissions: (Perm)[]): this {
    if (!this.permissions) this.permissions = [];
    if (!(this.permissions instanceof Array)) this.permissions = [this.permissions];
    this.permissions.push(...permissions);
    return this;
  }

  public addCooldowns(...cooldowns: (Coold)[]): this {
    if (!this.cooldowns) this.cooldowns = [];
    if (!(this.cooldowns instanceof Array)) this.cooldowns = [this.cooldowns];
    this.cooldowns.push(...cooldowns);
    return this;
  }

  public removePermissions(...permissions: (Perm)[]): this {
    if (!this.permissions) return this;
    if (!(this.permissions instanceof Array)) this.permissions = [this.permissions];
    this.permissions = this.permissions.filter((permission) => !permissions.some((p) => (typeof p !== 'string' ? p.label : p) === permission.label));
    return this;
  }

  public removeCooldowns(...cooldowns: (Coold | string)[]): this {
    if (!this.cooldowns) return this;
    if (!(this.cooldowns instanceof Array)) this.cooldowns = [this.cooldowns];
    this.cooldowns = this.cooldowns.filter((cooldown) => !cooldowns.some((c) => (typeof c !== 'string' ? c.label : c) === cooldown.label));
    return this;
  }
}
