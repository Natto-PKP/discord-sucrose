import { Client } from 'discord.js';
import path from 'path';

/* Types */
import type Types from '../typings';

import Logger from './services/Logger';
import EventManager from './managers/EventManager';
import CommandManager from './managers/CommandManager';
import InteractionManager from './managers/InteractionManager';

import * as contents from './contents';

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

    const env = { source: '', ext: 'js', ...(options.env || {}) } as Types.EnvironmentOptions;
    const logging = {
      details: false,
      loading: true,
      ...(options.logging || {}),
    } as Types.LoggingOptions;
    const params = { env, logging };
    const srcPath = path.join(process.cwd(), env.source);

    this.commands = new CommandManager(this, {
      ...params,
      path: path.join(srcPath, options.directories?.commands || 'commands'),
    });

    this.events = new EventManager(this, {
      ...params,
      path: path.join(srcPath, options.directories?.events || 'events'),
    });

    this.interactions = new InteractionManager(this, {
      ...params,
      directories: {
        autocompletes: options.directories?.interactions?.autocompletes || 'autocompletes',
        buttons: options.directories?.interactions?.buttons || 'buttons',
        forms: options.directories?.interactions?.forms || 'forms',
        selectMenus: options.directories?.interactions?.selectMenus || 'select-menus',
        source: options.directories?.interactions?.source || 'interactions',
      },
      features: {
        autoReply: {
          active: Boolean(options.features?.interactions?.autoReply?.active),
          contents: {
            ...contents.InteractionAutoReplyContents,
            ...(options.features?.interactions?.autoReply?.contents || {}),
          },
        },
      },
      path: path.join(srcPath, options.directories?.interactions?.source || 'interactions'),
    });
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
