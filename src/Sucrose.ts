import { Client } from 'discord.js';

/* Types */
import type Types from '../typings';

import Logger from './services/Logger';
import EventManager from './managers/EventManager';
import CommandManager from './managers/CommandManager';
import InteractionManager from './managers/InteractionManager';
import * as defaults from './options';

export default class Sucrose extends Client {
  public readonly commands: CommandManager;

  public readonly events: EventManager;

  public readonly interactions: InteractionManager;

  private constructor(options: Types.SucroseOptions) {
    super(options);

    const opts = options as Required<Types.SucroseOptions<true>>;
    opts.directories = defaults.getDirectoriesOptions(options);
    opts.env = defaults.getEnvironmentOptions(options);
    opts.features = defaults.getFeaturesOptions(options);
    opts.logging = defaults.getLoggingOptions(options);

    this.commands = new CommandManager(this, defaults.getCommandManagerOptions(options));
    this.events = new EventManager(this, defaults.getEventManagerOptions(options));
    this.interactions = new InteractionManager(
      this,
      defaults.getInteractionManagerOptions(options),
    );
  }

  static async build(options: Types.SucroseOptions): Promise<Sucrose> {
    const client = new Sucrose(options);
    const now = Date.now();

    // application log
    await client.login(process.env.TOKEN || process.env.DISCORD_TOKEN || options.token);
    if (!client.isReady()) {
      await new Promise<void>((res) => { client.on('ready', () => res()); });
      client.removeAllListeners('ready');
    }

    const logger = new Logger(defaults.getLoggingOptions(options));

    // managers
    await client.commands.build().catch((err) => logger.handle(err));
    await client.interactions.build().catch((err) => logger.handle(err));
    await client.events.build().catch((err) => logger.handle(err));

    logger.write('', { time: false });
    logger.give('INFO', 'https://github.com/Natto-PKP/discord-sucrose');
    logger.give('INFO', `Launched in ${Date.now() - now}ms`);
    logger.write('\n', { time: false });

    if (client.events.has('ready')) client.emit('ready', client as Client);

    return client;
  }
}
