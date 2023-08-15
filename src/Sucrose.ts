/* eslint-disable no-underscore-dangle */
import Discord from 'discord.js';
import CooldownManager from './managers/CooldownManager';
import InteractionManager, { type InteractionManagerOptions } from './managers/InteractionManager';
import PermissionManager from './managers/PermissionManager';

export type SucroseOptions = Discord.ClientOptions & {
  managers?: {
    cooldowns?: CooldownManager | null;
    interactions?: InteractionManager | null;
  } & InteractionManagerOptions['managers'];
};

export type SucroseClientOptions = Omit<SucroseOptions, 'intents'> & { intents: Discord.IntentsBitField };

/**
 * Sucrose
 * @public
 */
export default class Sucrose extends Discord.Client {
  public override options: SucroseClientOptions;

  public cooldowns: CooldownManager;

  public permissions: PermissionManager;

  public interactions: InteractionManager;

  constructor(options: SucroseOptions) {
    super(options);

    this.options = options as SucroseClientOptions;

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
  }
}
