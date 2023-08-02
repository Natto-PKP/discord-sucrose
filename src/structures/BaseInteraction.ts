import Discord from 'discord.js';
import BaseExecutable, { type BaseExecutableData, BaseExecuteParams } from './BaseExecutable';
import Cooldown, { type CooldownData } from './Cooldown';
import Permission, { type PermissionData } from './Permission';

export interface BaseInteractionData<
  Params = { },
  Body = unknown,
> extends BaseExecutableData<Params> {
  cooldowns?: Cooldown<Params>[] | null;
  permissions?: Permission<Params>[] | null;
  body: Body;
}

export interface BaseInteractionExecuteParams extends BaseExecuteParams {
  interaction: Discord.Interaction;
}

/**
 * @public
 */
export default class BaseInteraction<
  Params = { },
  Data extends BaseInteractionData<Params> = BaseInteractionData<Params>,
> extends BaseExecutable<Params, Data> {
  /**
   * Add cooldown
   * @param cooldown - Cooldown
   * @returns - This
   */
  public addCooldown(cooldown: Cooldown<Params> | CooldownData<Params>): this {
    const instance = new Cooldown(cooldown);
    if (!this.data.cooldowns) this.data.cooldowns = [instance];
    else this.data.cooldowns.push(instance);
    return this;
  }

  /**
   * Add permission
   * @param permission - Permission
   * @returns - This
   */
  public addPermission(permission: Permission<Params> | PermissionData<Params>): this {
    const instance = new Permission<Params>(permission);
    if (!this.data.permissions) this.data.permissions = [instance as Permission<Params>];
    else this.data.permissions.push(instance as Permission<Params>);
    return this;
  }

  /**
   * Remove cooldown
   * @param cooldown - Cooldown
   * @returns - This
   */
  public removeCooldown(cooldown: Cooldown | CooldownData | string): this {
    if (!this.data.cooldowns) return this;
    const data = cooldown instanceof Cooldown ? cooldown.toJSON() : cooldown;
    const label = typeof data === 'string' ? data : data.label;
    this.data.cooldowns = this.data.cooldowns.filter((c) => c.label !== label);
    return this;
  }

  /**
   * Remove permission
   * @param permission - Permission
   * @returns - This
   */
  public removePermission(permission: Permission | PermissionData | string): this {
    if (!this.data.permissions) return this;
    const data = permission instanceof Permission ? permission.toJSON() : permission;
    const label = typeof data === 'string' ? data : data.label;
    this.data.permissions = this.data.permissions.filter((p) => p.label !== label);
    return this;
  }

  /**
   * Set cooldowns
   * @param cooldowns - Cooldowns
   * @returns - This
   */
  public setCooldowns(cooldowns: (Cooldown<Params> | CooldownData<Params>)[] | null): this {
    if (!cooldowns) {
      this.data.cooldowns = null;
      return this;
    }

    const instances = cooldowns.map((c) => new Cooldown(c));
    this.data.cooldowns = instances;
    return this;
  }

  /**
   * Set body
   * @param body - Body
   * @returns - This
   */
  public setBody(body: Data['body']): this {
    this.data.body = body;
    return this;
  }

  /**
   * Set permissions
   * @param permissions - Permissions
   * @returns - This
   */
  public setPermissions(permissions: (Permission<Params> | PermissionData<Params>)[]): this {
    const instances = permissions.map((p) => new Permission<Params>(p));
    this.data.permissions = instances;
    return this;
  }

  public get cooldowns() {
    return this.data.cooldowns;
  }

  public get body() {
    return this.data.body;
  }

  public get permissions() {
    return this.data.permissions;
  }
}
