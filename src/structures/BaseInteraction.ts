import type Discord from 'discord.js';
import { Permission, PermissionData } from './Permission';
import { Cooldown, CooldownData } from './Cooldown';
import { BaseExecutable, type BaseExecutableData, type BaseExecutableParams } from './BaseExecutable';

/**
 * Base interaction params
 * @public
 */
export interface BaseInteractionParams extends BaseExecutableParams {
  interaction: Discord.Interaction;
}

/**
 * Base interaction data
 * @public
 * @example
 * ```ts
 * import { BaseInteractionData } from 'sucrose';
 *
 * export default <BaseInteractionData>{
 *   label: 'my-interaction',
 *   body: null,
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface BaseInteractionData<P, B> extends BaseExecutableData<P> {
  body?: B | null;
  permissions?: (Permission | PermissionData | string)[]
  | Permission | PermissionData | string | null;
  cooldowns?: (Cooldown | CooldownData | string)[] | (Cooldown | CooldownData | string) | null;
}

/**
 * Base interaction
 * @public
 * @example
 * ```ts
 * import { BaseInteraction } from 'sucrose';
 *
 * const interaction = new BaseInteraction();
 * interaction.setLabel('my-interaction');
 * interaction.setExecute(() => console.log('Hello world!'));
 *
 * export default interaction;
 * ```
 * @example
 * ```ts
 * import { BaseInteraction } from 'sucrose';
 *
 * const data = <BaseInteractionData>{
 *   label: 'my-interaction',
 *   body: null,
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new BaseInteraction(data);
 */
export class BaseInteraction<P, B> extends BaseExecutable<P> {
  public body: BaseInteractionData<P, B>['body'];

  /**
   * add one or multiple permissions to the interaction
   */
  public permissions: BaseInteractionData<P, B>['permissions'];

  /**
   * add one or multiple cooldowns to the interaction
   */
  public cooldowns: BaseInteractionData<P, B>['cooldowns'];

  constructor(data?: BaseInteractionData<P, B> | BaseInteraction<P, B> | null) {
    super(data);

    const dt = data ?? this.data;
    if (!dt) return;

    this.body = dt.body;
    this.permissions = dt.permissions ?? null;
    this.cooldowns = dt.cooldowns ?? null;
  }

  public override get data(): BaseInteractionData<P, B> {
    return {
      ...super.data,
      body: this.body,
      permissions: this.permissions,
      cooldowns: this.cooldowns,
    };
  }

  /**
   * add one or multiple permissions to the interaction
   * @param permissions - permission to add
   * @returns - this
   */
  public addPermissions(permissions: (Permission | PermissionData | string)[]): this {
    if (!this.permissions) this.permissions = [];
    if (!(this.permissions instanceof Array)) this.permissions = [this.permissions];
    this.permissions.push(...permissions);
    return this;
  }

  /**
   * add one or multiple cooldowns to the interaction
   * @param cooldowns - cooldown to add
   * @returns - this
   */
  public addCooldowns(...cooldowns: (Cooldown | CooldownData | string)[]): this {
    if (!this.cooldowns) this.cooldowns = [];
    if (!(this.cooldowns instanceof Array)) this.cooldowns = [this.cooldowns];
    this.cooldowns.push(...cooldowns);
    return this;
  }

  /**
   * remove one or multiple permissions from the interaction
   * @param permissions - permission to remove
   * @returns - this
   */
  public removePermissions(...permissions: (Permission | PermissionData | string)[]): this {
    if (!this.permissions) return this;
    if (!(this.permissions instanceof Array)) this.permissions = [this.permissions];

    this.permissions = this.permissions.filter((permission) => !permissions.some(
      (p) => (typeof p !== 'string' ? p.label : p) === (typeof permission !== 'string' ? permission.label : permission),
    ));

    return this;
  }

  /**
   * remove one or multiple cooldowns from the interaction
   * @param cooldowns - cooldown to remove
   * @returns - this
   */
  public removeCooldowns(...cooldowns: (Cooldown | CooldownData | string | string)[]): this {
    if (!this.cooldowns) return this;
    if (!(this.cooldowns instanceof Array)) this.cooldowns = [this.cooldowns];

    this.cooldowns = this.cooldowns.filter((cooldown) => !cooldowns.some(
      (c) => (typeof c !== 'string' ? c.label : c) === (typeof cooldown !== 'string' ? cooldown.label : cooldown),
    ));

    return this;
  }

  /**
   * set permissions to the interaction
   * @param permissions - permission to set
   * @returns - this
   */
  public setPermissions(...permissions: (Permission | PermissionData | string)[]): this {
    this.permissions = permissions;
    return this;
  }

  /**
   * set cooldowns to the interaction
   * @param cooldowns - cooldown to set
   * @returns - this
   */
  public setCooldowns(...cooldowns: (Cooldown | CooldownData | string)[]): this {
    this.cooldowns = cooldowns;
    return this;
  }

  /**
   * set body
   * @param body - body to set
   * @returns - this
   */
  public setBody(body: B): this {
    this.body = body;
    return this;
  }
}
