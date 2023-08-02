import type Discord from 'discord.js';
import Base, { type BaseData } from './Base';
import type { BaseExecute, BaseExecuteParams } from './BaseExecutable';

export type Permissions = Discord.PermissionResolvable;
export type PermissionExecuteParams<P> = BaseExecuteParams & P;

export type PermissionType = 'ROLE' | 'USER' | 'CHANNEL' | 'GUILD' | 'SELF' | 'MEMBER' | 'GUILD_ONLY' | 'PRIVATE_ONLY' | 'CUSTOM';

export type IdPermission = {
  type: 'ROLE' | 'USER' | 'CHANNEL' | 'GUILD';
  allowed?: string[] | null;
  denied?: string[] | null;
};

export type BasicPermission = {
  type: 'SELF' | 'MEMBER';
  allowed?: Permissions | null;
  denied?: Permissions | null;
};

export type CustomPermission<P = { }> = {
  type: 'CUSTOM';
  condition: BaseExecute<P, boolean>;
};

export type OtherPermission = { type: 'GUILD_ONLY' | 'PRIVATE_ONLY'; };

export type PermissionData<P = { }> = BaseData & (
  IdPermission
  | BasicPermission
  | OtherPermission
  | CustomPermission<P>
);

export type PermissionDefaultParams = { args: any[], [key: string]: any };

const PermissionTypes = ['ROLE', 'USER', 'CHANNEL', 'GUILD', 'SELF', 'MEMBER', 'GUILD_ONLY', 'PRIVATE_ONLY'];

export default class Permission<
  Params = { },
  Data extends PermissionData<Params> = PermissionData<Params>,
> extends Base<Data> {
  public override verify(data?: Data) {
    const object = data ?? this.data;

    super.verify(object);

    if (!object.type) throw new Error('data.type is required.');
    if (!PermissionTypes.includes(object.type)) throw new Error(`data.type must be one of ${PermissionTypes.join(', ')}.`);

    if (['ROLE', 'USER', 'CHANNEL', 'GUILD'].includes(object.type)) {
      const perm = object as IdPermission;
      if (perm.allowed && !Array.isArray(perm.allowed)) throw new Error('data.allowed must be an array.');
      if (perm.allowed && !perm.allowed.every((id) => typeof id === 'string')) throw new Error('data.allowed must be an array of strings.');
      if (perm.denied && !Array.isArray(perm.denied)) throw new Error('data.denied must be an array.');
      if (perm.denied && !perm.denied.every((id) => typeof id === 'string')) throw new Error('data.denied must be an array of strings.');
    }

    if (['SELF', 'MEMBER'].includes(object.type)) {
      const perm = object as BasicPermission;
      if (perm.allowed && (typeof perm.allowed !== 'string' || typeof perm.allowed !== 'bigint' || !Array.isArray(perm.allowed))) throw new Error('data.allowed must be a bigint or a string.');
      if (Array.isArray(perm.allowed) && !perm.allowed.every((p) => typeof p === 'string')) throw new Error('data.allowed must be an array of strings.');
      if (perm.denied && (typeof perm.denied !== 'string' || typeof perm.denied !== 'bigint' || !Array.isArray(perm.denied))) throw new Error('data.denied must be a bigint or a string.');
      if (Array.isArray(perm.denied) && !perm.denied.every((p) => typeof p === 'string')) throw new Error('data.denied must be an array of strings.');
    }

    if (object.type === 'CUSTOM') {
      const perm = object as CustomPermission<Params>;
      if (!perm.condition) throw new Error('data.condition is required.');
      if (typeof perm.condition !== 'function') throw new Error('data.condition must be a function.');
    }

    return true;
  }

  public setType(type: PermissionType): this {
    this.data.type = type;
    return this;
  }

  public setAllowed(allowed: Permissions | string[] | null): this {
    if (['CUSTOM', 'GUILD_ONLY', 'PRIVATE_ONLY'].includes(this.data.type)) throw new Error('Cannot set allowed on this type of permission.');
    (this.data as IdPermission | BasicPermission).allowed = allowed;
    return this;
  }

  public setDenied(denied: Permissions | string[] | null): this {
    if (['CUSTOM', 'GUILD_ONLY', 'PRIVATE_ONLY'].includes(this.data.type)) throw new Error('Cannot set denied on this type of permission.');
    (this.data as IdPermission | BasicPermission).denied = denied;
    return this;
  }

  public setCondition(condition: BaseExecute<Params, boolean>): this {
    if (this.data.type !== 'CUSTOM') throw new Error('Cannot set condition on this type of permission.');
    (this.data as unknown as CustomPermission<Params>).condition = condition;
    return this;
  }

  public get type() {
    return this.data.type;
  }

  public get allowed() {
    return 'allowed' in this.data ? this.data.allowed ?? null : null;
  }

  public get denied() {
    return 'denied' in this.data ? this.data.denied ?? null : null;
  }

  public get condition() {
    return 'condition' in this.data ? this.data.condition : null;
  }
}
