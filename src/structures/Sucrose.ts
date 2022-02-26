import { Client } from 'discord.js';
import { existsSync, lstatSync } from 'fs';
import path from 'path';

import Logger from '../services/Logger';
import { SError } from '../errors';

import EventManager from '../managers/EventManager';
import CommandManager from '../managers/CommandManager';
import InteractionManager from '../managers/InteractionManager';

import * as contents from '../services/Messages';

/* Types */
import type Types from '../../typings';

export default class Sucrose extends Client implements Types.Sucrose {
  public readonly commands: Types.CommandManager;

  public readonly events: Types.EventManager;

  public readonly interactions: Types.InteractionManager;

  private constructor(options: Types.SucroseOptions) {
    super(options);

    const environment = process.env.NODE_ENV || options.env?.type || 'development';
    const outputDir = process.env.OUTPUT_ENV || options.env?.directories?.output || 'dist';
    const sourceDir = process.env.SOURCE_ENV || options.env?.directories?.source || 'src';
    const commandsDir = process.env.COMMANDS_DIR || options.env?.directories?.commands || 'commands';
    const eventsDir = process.env.EVENTS_DIR || options.env?.directories?.events || 'events';
    const interactionsDir = process.env.INTERACTIONS_DIR || options.env?.directories?.interactions || 'interactions';
    const [dir, ext] = environment === 'production' ? [outputDir, 'js'] : [sourceDir, 'ts'];
    const basePath = path.join(process.cwd(), dir);

    if (!existsSync(basePath)) SError('FATAL', 'working folder path does not exist');
    if (!lstatSync(basePath).isDirectory()) SError('FATAL', 'working folder path is not a folder');

    const env = <Types.EnvironmentOptions>{ ext, path: basePath };

    // # EventManager
    this.events = new EventManager(this, {
      env,
      path: path.join(basePath, eventsDir),
      ignores: options.ignores?.events || [],
    });

    // # CommandManager
    this.commands = new CommandManager(this, { env, path: path.join(basePath, commandsDir) });

    // # InteractionManager
    this.interactions = new InteractionManager(this, {
      content: {
        ...(<Required<Types.InteractionContent>>contents.interaction),
        ...(options.contents?.interaction || {}),
      },
      env,
      path: path.join(basePath, interactionsDir),
    });
  }

  /**
   * Build your application
   * @param options
   * @returns
   */
  static async build(options: Types.SucroseOptions): Promise<Types.Sucrose> {
    const sucrose = new Sucrose(options);

    const now = Date.now();

    // # application log
    await sucrose.login(process.env.TOKEN || process.env.DISCORD_TOKEN || options.token);
    await new Promise<void>((res) => {
      sucrose.once('ready', () => {
        Logger.give('SUCCESS', 'Application is connected to discord');
        res();
      });
    });

    // # managers
    await sucrose.events.build().then(() => Logger.give('SUCCESS', 'Discord.js events loaded'), Logger.handle);
    await sucrose.commands.build().then(() => Logger.give('SUCCESS', 'Slash commands loaded'), Logger.handle);
    await sucrose.interactions.build().then(() => Logger.give('SUCCESS', 'Interactions loaded'), Logger.handle);

    Logger.write('');
    Logger.give('INFO', 'https://github.com/Natto-PKP/typescript-discord');
    Logger.give('INFO', `Sucrose structure was launched in ${Date.now() - now}ms`);
    Logger.write('\n');

    return sucrose;
  }
}
