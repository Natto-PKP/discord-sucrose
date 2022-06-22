import { Client } from 'discord.js';
import { existsSync, lstatSync } from 'fs';
import path from 'path';

/* Types */
import type { InteractionContent, SucroseOptions } from '../../typings';

import Logger from '../services/Logger';
import { SError } from '../errors';

import EventManager from '../managers/EventManager';
import CommandManager from '../managers/CommandManager';
import InteractionManager from '../managers/InteractionManager';

import * as contents from '../services/Messages';

/**
 * custom discord client for structure
 *
 * @remarks
 *
 * @example
 * Sucrose.build(\{ env: \{ source: 'src', ext: 'ts' \} \})
 */
export default class Sucrose extends Client {
  /**
   * access the commands manager
   * @public
   * @readonly
   */
  public readonly commands: CommandManager;

  /**
   * access the events manager
   * @public
   * @readonly
   */
  public readonly events: EventManager;

  /**
   * access the interactions manager
   * @public
   * @readonly
   */
  public readonly interactions: InteractionManager;

  private constructor(options: SucroseOptions) {
    super(options);

    // file language
    const ext = options.env?.ext || 'js';
    if (!/(js|ts)$/.test(ext)) throw SError('FATAL', 'extension must be ".js" or ".ts"');

    // source directory
    const source = path.join('./', options.env?.source || './');
    if (!existsSync(source)) SError('FATAL', `source directory "${source}" does not exist`);
    if (!lstatSync(source).isDirectory()) SError('FATAL', `source directory "${source}" is not a folder`);
    const env = { ext, path: source };

    this.events = new EventManager(this, { ...env, path: path.join(source, 'events') });
    this.commands = new CommandManager(this, { ...env, path: path.join(source, 'commands/global') });
    this.interactions = new InteractionManager(this, {
      contents: {
        ...(<Required<InteractionContent>>contents.interaction),
        ...(options.contents?.interaction || {}),
      },
      ...env,
      path: path.join(source, 'interactions'),
    });
  }

  /**
   * build your Sucrose client
   *
   * @remarks
   *
   * @param options - Sucrose options
   * @returns Sucrose
   *
   * @example
   * (async () =\> \{
   *   await Sucrose.build(\{ env: \{ source: 'src', ext: 'ts' \} \})
   * \})()
   */
  static async build(options: SucroseOptions): Promise<Sucrose> {
    const sucrose = new Sucrose(options);
    const now = Date.now();

    // application log
    const connected = () => Logger.give('SUCCESS', 'Application is connected to discord');
    await sucrose.login(process.env.TOKEN || process.env.DISCORD_TOKEN || options.token);
    if (!sucrose.isReady()) {
      await new Promise<void>((res) => { sucrose.on('ready', () => res(connected())); });
      sucrose.removeAllListeners('ready');
    } else connected();

    // managers
    await sucrose.commands.build().then(() => {
      if (!sucrose.commands.collection.size && !sucrose.commands.guilds.size) return;
      Logger.give('SUCCESS', 'Slash commands loaded');
    }, Logger.handle);

    await sucrose.interactions.build().then(() => {
      if (!sucrose.interactions.buttons.collection.size
        && !sucrose.interactions.selectMenus.collection.size) return;
      Logger.give('SUCCESS', 'Interactions loaded');
    }, Logger.handle);

    await sucrose.events.build().then(() => {
      if (!sucrose.events.collection.size) return;
      Logger.give('SUCCESS', 'Discord.js events loaded');
    }, Logger.handle);

    Logger.write('');
    Logger.give('INFO', 'https://github.com/Natto-PKP/discord-sucrose');
    Logger.give('INFO', `Sucrose structure was launched in ${Date.now() - now}ms`);
    Logger.write('\n');

    return sucrose;
  }
}
