import { Client } from 'discord.js';
import { existsSync, lstatSync } from 'fs';
import path from 'path';

/* Types */
import type Types from '../../typings';

import Logger from '../services/Logger';
import { SError } from '../errors';

import EventManager from '../managers/EventManager';
import CommandManager from '../managers/CommandManager';
import InteractionManager from '../managers/InteractionManager';

import * as contents from '../services/Messages';

export default class Sucrose extends Client implements Types.Sucrose {
  public readonly commands: Types.CommandManager;

  public readonly events: Types.EventManager;

  public readonly interactions: Types.InteractionManager;

  private constructor(options: Types.SucroseOptions) {
    super(options);

    // ! file extension
    const ext = options.env?.extension || 'js';
    if (!/(js|ts)$/.test(ext)) throw SError('FATAL', 'extension must be ".js" or ".ts"');

    // ! source directory
    const source = path.join('./', options.env?.source || './');
    if (!existsSync(source)) SError('FATAL', `source directory "${source}" does not exist`);
    if (!lstatSync(source).isDirectory()) SError('FATAL', `source directory "${source}" is not a folder`);
    const env = { ext, path: source };

    // ! event manager
    const eventsDir = path.join(source, 'events');
    this.events = new EventManager(this, { env, path: eventsDir, ignores: options.ignores?.events || [] });

    // ! command manager
    const commandsDir = path.join(source, 'commands');
    this.commands = new CommandManager(this, { env, path: commandsDir });

    // ! interaction manager
    const interactionsDir = path.join(source, 'interactions');
    this.interactions = new InteractionManager(this, {
      content: {
        ...(<Required<Types.InteractionContent>>contents.interaction),
        ...(options.contents?.interaction || {}),
      },
      env,
      path: interactionsDir,
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

    // ! application log
    const connected = () => Logger.give('SUCCESS', 'Application is connected to discord');
    await sucrose.login(process.env.TOKEN || process.env.DISCORD_TOKEN || options.token);
    if (!sucrose.isReady()) {
      await new Promise<void>((res) => {
        res(connected());
      });
    } else connected();

    // ! managers
    await sucrose.events.build().then(() => {
      if (!sucrose.events.collection.size) return;
      Logger.give('SUCCESS', 'Discord.js events loaded');
    }, Logger.handle);

    await sucrose.commands.build().then(() => {
      if (!sucrose.commands.collection.size && !sucrose.commands.guilds.size) return;
      Logger.give('SUCCESS', 'Slash commands loaded');
    }, Logger.handle);

    await sucrose.interactions.build().then(() => {
      if (!sucrose.interactions.buttons.collection.size && !sucrose.interactions.selectMenus.collection.size) return;
      Logger.give('SUCCESS', 'Interactions loaded');
    }, Logger.handle);

    Logger.write('');
    Logger.give('INFO', 'https://github.com/Natto-PKP/typescript-discord');
    Logger.give('INFO', `Sucrose structure was launched in ${Date.now() - now}ms`);
    Logger.write('\n');

    return sucrose;
  }
}
