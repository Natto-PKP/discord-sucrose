import Discord from 'discord.js';
import type { DirectoryOptions, EnvOptions } from '../../typings';
import CooldownManager from '../managers/CooldownManager';
import Logger from './Logger';

export interface SucroseOptions extends Discord.ClientOptions {
  directories?: {
    commands?: DirectoryOptions | null;
    events?: DirectoryOptions | null;
    buttons?: DirectoryOptions | null;
    selectMenus?: DirectoryOptions | null;
    autocompletes?: DirectoryOptions | null;
    modals?: DirectoryOptions | null;
  } | null;
  env?: EnvOptions | null;
  logger?: {
    verbose?: boolean;
    colored?: boolean;
  }
}

export type SucroseClientOptions = Omit<SucroseOptions, 'intents'> & { intents: Discord.IntentsBitField };

/**
 * Sucrose
 * @public
 */
export default class Sucrose extends Discord.Client {
  private logger: Logger;

  public override options: SucroseClientOptions;

  public cooldowns: CooldownManager;

  constructor(options: SucroseOptions) {
    super(options);

    this.options = options as SucroseClientOptions;

    this.logger = new Logger('Sucrose', { ...options.logger, console });
    this.cooldowns = new CooldownManager();

    this.once('ready', async () => {
      this.logger.info('Ready!');

      await this.load();
    });
  }

  private async load() {

  }
}
