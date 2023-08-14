/* eslint-disable no-underscore-dangle */
import Discord from 'discord.js';
import CooldownManager from './managers/CooldownManager';
import InteractionManager, { type InteractionManagerOptions } from './managers/InteractionManager';

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

  public interactions: InteractionManager;

  constructor(options: SucroseOptions) {
    super(options);

    this.options = options as SucroseClientOptions;
    this.cooldowns = options.managers?.cooldowns || new CooldownManager();

    const managers = {
      cooldowns: this.cooldowns,
      buttons: options.managers?.buttons,
    };

    this.interactions = options.managers?.interactions || new InteractionManager({ managers });
  }
}
