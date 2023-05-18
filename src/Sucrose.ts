import { Client } from 'discord.js';

/* Types */
import type Types from '../typings';

import Logger from './services/Logger';
import EventManager from './managers/EventManager';
import InteractionManager from './managers/InteractionManager';
import BaseCooldownManager from './managers/BaseCooldownManager';
import PermissionManager from './managers/PermissionManager';
import * as defaults from './options';

/**
 * Sucrose client
 */
export default class Sucrose extends Client {
  /**
   * Can be override
   */
  public cooldown: BaseCooldownManager<unknown>;

  public readonly events: EventManager;

  public readonly interactions: InteractionManager;

  public readonly logger: Logger;

  public readonly permission: PermissionManager;

  private constructor(options: Types.SucroseOptions) {
    super(options);

    // # init sucrose options
    const opts = options as unknown as Required<Types.SucroseOptions<false, true>>;
    opts.env = defaults.getEnvironmentOptions(options);
    opts.directories = defaults.getDirectoriesOptions(options);
    opts.features = defaults.getFeaturesOptions(options);
    opts.logging = defaults.getLoggingOptions(options);

    // # complete sucrose options
    opts.contents = defaults.getContentsOptions(opts);

    // # define cooldown service
    this.cooldown = options.cooldown || new BaseCooldownManager();

    // # define permission service
    const permissionContents = defaults.getPermissionContentsOptions(opts);
    this.permission = new PermissionManager(permissionContents);

    // # define sucrose managers
    const eventManagerOptions = defaults.getEventManagerOptions(opts);
    const interactionManagerOptions = defaults.getInteractionManagerOptions(opts);

    this.events = new EventManager(this, eventManagerOptions);
    this.interactions = new InteractionManager(this, interactionManagerOptions);
    this.logger = new Logger(opts.logging);
  }

  static async build(options: Types.SucroseOptions): Promise<Sucrose> {
    const client = new Sucrose(options);
    const now = Date.now(); // get start date

    client.on('error', () => {}); // fix "node:events:491; throw er; // Unhandled 'error' event" error

    // # application login
    await client.login(process.env.TOKEN || process.env.DISCORD_TOKEN || options.token);
    if (!client.isReady()) {
      await new Promise<void>((res) => { client.on('ready', () => res()); });
      client.removeAllListeners('ready');
    }

    // # build sucrose managers
    await client.interactions.build().catch((err: Error) => client.logger.handle(err));
    await client.events.build().catch((err: Error) => client.logger.handle(err));

    // # sucrose logs
    client.logger.write('', { time: false });
    client.logger.give('INFO', 'https://github.com/Natto-PKP/discord-sucrose');
    client.logger.give('INFO', `Launched in ${Date.now() - now}ms`);
    client.logger.write('\n', { time: false });

    if (client.events.cache.has('ready')) client.emit('ready', client as Client);

    return client;
  }
}
