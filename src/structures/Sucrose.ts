import { Client } from 'discord.js';
import path from 'path';

import { Logger } from '../services/logger';
import { interactionsContents } from '../utils/contents';

/* Managers */
import { CommandManager } from '../managers/CommandManager';
import { InteractionManager } from '../managers/InteractionManager';
import { EventManager } from '../managers/EventManager';

/* Types */
import type Types from '../../typings';

export class Sucrose extends Client implements Types.Sucrose {
  public readonly commands: Types.CommandManager;
  public readonly interactions: Types.InteractionManager;
  public readonly events: Types.EventManager;

  private constructor(options: Types.SucroseOptions) {
    super(options);

    // ! ENVIRONMENT
    const env = <Types.EnvironmentOptions>{
      type: options.env?.type || process.env.NODE_ENV || 'development',
      outputDir: options.env?.outputDir || process.env.OUTPUT_DIRECTORY || 'dist',
      sourceDir: options.env?.sourceDir || process.env.OUTPUT_DIRECTORY || 'src',
    };

    [env.directory, env.extension] = env.type === 'production' ? [env.outputDir, 'js'] : [env.sourceDir, 'ts'];

    // # commands
    const commandsDir = options.events?.directory || process.env.COMMANDS_DIRECTORY || 'commands';
    this.commands = new CommandManager(this, {
      directory: commandsDir,
      env,
      path: path.join(env.directory, commandsDir),
    });

    // # events
    const eventsDir = options.events?.directory || process.env.EVENTS_DIRECTORY || 'events';
    this.events = new EventManager(this, {
      directory: eventsDir,
      env,
      ignore: [...(options.events?.ignore || [])],
      path: path.join(env.directory, eventsDir),
    });

    // # interactions
    const interactionsDir = options.interactions?.directory || process.env.INTERACTIONS_DIRECTORY || 'interactions';
    this.interactions = new InteractionManager(this, {
      contents: { ...interactionsContents, ...options.interactions?.contents },
      directory: interactionsDir,
      env,
      path: path.join(env.directory, interactionsDir),
    });
  }

  /**
   * Buid an new client of Sucrose
   * @param options
   * @returns
   * @example
   * const sucrose = await Sucrose.build({ intents: [] })
   */
  static async build(options: Types.SucroseOptions): Promise<Types.Sucrose> {
    const sucrose = new Sucrose(options);

    await sucrose.login(options.token || process.env.DISCORD_TOKEN || process.env.TOKEN);
    await new Promise((res) => sucrose.once('ready', res));

    // # managers
    await sucrose.commands.build().catch((err) => Logger.handle(err, 'COMMAND_MANAGER'));
    await sucrose.interactions.build().catch((err) => Logger.handle(err, 'INTERACTION_MANAGER'));
    await sucrose.events.build().catch((err) => Logger.handle(err, 'EVENT_MANAGER'));

    return sucrose;
  }
}
