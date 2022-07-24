import { Client } from 'discord.js';

/* Types */
import type Types from '../typings';

import Logger from './services/Logger';
import EventManager from './managers/EventManager';
import CommandManager from './managers/CommandManager';
import InteractionManager from './managers/InteractionManager';
import * as defaults from './options';

/**
 * Sucrose client
 * @public
 * @example Initialize new Sucrose client
 * ```js
 * const client = await Sucrose.build(options);
 * ```
 */
export default class Sucrose extends Client {
  /**
   * commands manager
   * @readonly
   */
  public readonly commands: CommandManager;

  /**
   * events manager
   * @readonly
   */
  public readonly events: EventManager;

  /**
   * interactions managers
   * @readonly
   */
  public readonly interactions: InteractionManager;

  private constructor(options: Types.SucroseOptions) {
    super(options);

    const opts = options;
    opts.directories = defaults.getDirectoriesOptions(opts);
    opts.env = defaults.getEnvironmentOptions(opts);
    opts.logging = defaults.getLoggingOptions(opts);
    opts.features = defaults.getFeaturesOptions(opts);

    this.commands = new CommandManager(this, defaults.getCommandManagerOptions(opts));
    this.events = new EventManager(this, defaults.getEventManagerOptions(opts));
    this.interactions = new InteractionManager(this, defaults.getInteractionManagerOptions(opts));
  }

  /**
   * build your Sucrose client
   *
   * @param options - Sucrose options
   * @returns Sucrose
   *
   * @example
   * ```js
   * const client = await Sucrose.build(options);
   * ```
   */
  static async build(options: Types.SucroseOptions): Promise<Sucrose> {
    const client = new Sucrose(options);
    const now = Date.now();

    // application log
    await client.login(process.env.TOKEN || process.env.DISCORD_TOKEN || options.token);
    if (!client.isReady()) {
      await new Promise<void>((res) => { client.on('ready', () => res()); });
      client.removeAllListeners('ready');
    }

    // managers
    await client.commands.build().catch(Logger.handle);
    await client.interactions.build().catch(Logger.handle);
    await client.events.build().catch(Logger.handle);

    Logger.write('');
    Logger.give('INFO', 'https://github.com/Natto-PKP/discord-sucrose');
    Logger.give('INFO', `Launched in ${Date.now() - now}ms`);
    Logger.write('\n');

    return client;
  }
}
