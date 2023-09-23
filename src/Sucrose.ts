/* eslint-disable no-underscore-dangle */
import Discord from 'discord.js';
import { CooldownManager } from './managers/CooldownManager';
import { InteractionManager, type InteractionManagerOptions } from './managers/InteractionManager';
import { PermissionManager } from './managers/PermissionManager';
import { EventManager } from './managers/EventManager';

/**
 * Discord client options with extra options for Sucrose
 * @public
 * @extends Discord.ClientOptions
 */
export type SucroseOptions = Discord.ClientOptions & {
  /**
   * Override if you want to customize them, per default all managers are created
   */
  managers?: {
    /**
     * Override the cooldowns manager if you want to use a custom cache or else
     */
    cooldowns?: CooldownManager | null;
    interactions?: InteractionManager | null;
    events?: EventManager | null;
  } & InteractionManagerOptions['managers'];
};

/**
 * Sucrose client is an extension of Discord.Client with extra options
 * @public
 * @extends Discord.Client
 * @example
 * ```js
 * const { Sucrose } = require('sucrose');
 * const { GatewayIntentBits, Partials } = require('discord.js');
 *
 * const client = new Sucrose({
 *   intents: [GatewayIntentBits.Guilds],
 *   partials: [Partials.Channel],
 * });
 * ```
 * @example
 * ```ts
 * import { Sucrose } from 'sucrose';
 * import { GatewayIntentBits, Partials } from 'discord.js';
 *
 * const client = new Sucrose({
 *   intents: [GatewayIntentBits.Guilds],
 *   partials: [Partials.Channel],
 * });
 * ```
 */
export class Sucrose extends Discord.Client {
  /**
   * interact with the cooldowns manager
   */
  public cooldowns: CooldownManager;

  /**
   * interact with the permissions manager
   */
  public permissions: PermissionManager;

  /**
   * interact with the interactions manager
   */
  public interactions: InteractionManager;

  /**
   * interact with the events manager
   */
  public events: EventManager;

  constructor(options: SucroseOptions) {
    super(options);

    // # create all managers
    this.cooldowns = options.managers?.cooldowns || new CooldownManager();
    this.permissions = options.managers?.permissions || new PermissionManager();

    const managers = {
      cooldowns: this.cooldowns,
      permissions: this.permissions,
      buttons: options.managers?.buttons,
      commands: options.managers?.commands,
      modals: options.managers?.modals,
      selectMenus: options.managers?.selectMenus,
    };

    // # create all interactions managers
    this.interactions = options.managers?.interactions || new InteractionManager({
      managers,
      sucrose: this,
    });

    // # listen interactionCreate event
    this.interactions.listen(this);

    // # create events manager
    this.events = options.managers?.events || new EventManager({
      sucrose: this,
    });

    // # listen all events
    this.events.listenAll();
  }
}
