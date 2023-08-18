import type Discord from 'discord.js';
import Permission, { PermissionData } from './Permission';
import Cooldown, { CooldownData } from './Cooldown';
import BaseExecutable, { type BaseExecutableData, type BaseExecutableParams } from './BaseExecutable';

type Perm = Permission | PermissionData | string;
type Coold = Cooldown | CooldownData | string;

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
export interface BaseInteractionData<P = { }, B = any> extends BaseExecutableData<P> {
  body: B;
  permissions?: (Perm)[] | Perm | null;
  cooldowns?: (Coold)[] | (Coold) | null;
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
export default class BaseInteraction<P = { }, B = any> extends BaseExecutable<P> {
  /**
   * body interaction, discord.js will handle this
   */
  public body: B;

  /**
   * add one or multiple permissions to the interaction
   */
  public permissions?: (Perm)[] | Perm | null;

  /**
   * add one or multiple cooldowns to the interaction
   */
  public cooldowns?: (Coold)[] | (Coold) | null;

  constructor(data?: BaseInteractionData<P, B> | BaseInteraction<P, B> | null) {
    super(data);

    const d = (data instanceof BaseInteraction ? data.data : data) ?? this.data;
    this.body = d.body as B;
    this.permissions = d.permissions ?? null;
    this.cooldowns = d.cooldowns ?? null;
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
  public addPermissions(...permissions: (Perm)[]): this {
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
  public addCooldowns(...cooldowns: (Coold)[]): this {
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
  public removePermissions(...permissions: (Perm)[]): this {
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
  public removeCooldowns(...cooldowns: (Coold | string)[]): this {
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
  public setPermissions(...permissions: (Perm)[]): this {
    this.permissions = permissions;
    return this;
  }

  /**
   * set cooldowns to the interaction
   * @param cooldowns - cooldown to set
   * @returns - this
   */
  public setCooldowns(...cooldowns: (Coold)[]): this {
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
