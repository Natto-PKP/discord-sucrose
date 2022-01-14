/* Dependencies */
import { Client, ClientOptions, ClientUser } from 'discord.js';

/* Services */
import { Logger } from './services/logger';

/* Managers */
import { EventManager } from './managers/events';
import { InteractionManager } from './managers/interactions';

/* Typings */
import { SucroseOptions } from './typings';
import { CommandManager } from './managers/commands';

//? Sucrose client
export class Sucrose extends Client {
  /**
   * @property
   * @public
   * @type
   */
  public commands: CommandManager;

  /**
   * @property
   * @public
   * @type { EventManager }
   */
  public events: EventManager;

  /**
   * @property
   * @public
   * @type { InteractionManager }
   */
  public interactions: InteractionManager;

  /**
   * @constructor
   * @public
   * @param { ClientOptions } clientOptions
   * @param { SucroseOptions | undefined } sucroseOptions
   * @example
   * new Sucrose({ intents: 14319, partials: ['CHANNEL'] });
   *
   * const customParams = { foo: 'bar' };
   * new Sucrose({ intents: 14319, partials: ['CHANNEL'] }, { customParams });
   */
  public constructor(clientOptions: ClientOptions, sucroseOptions: SucroseOptions = {}) {
    super(clientOptions); // Give options to Client

    const eventOptions = sucroseOptions.events;
    const customParams = sucroseOptions.customParams;

    this.commands = new CommandManager(this); // Attach new CommandManager
    this.events = new EventManager(this, { ...eventOptions, customParams }); // Attach new EventManager
    this.interactions = new InteractionManager(this, { customParams }); // Attach new InteractionManager

    this.login(process.env.TOKEN); // Connect bot application to Discord API

    this.build(); // Build this client
  }

  /**
   * Build structures
   * @method
   * @private
   * @async
   * @returns { Promise<void> }
   */
  private async build(): Promise<void> {
    const start = Date.now();

    //? Fetch client application
    await new Promise<void>((resolve, reject) => {
      this.on('ready', async () => {
        this.application
          ?.fetch()
          .then(() => resolve())
          .catch((err) => {
            Logger.warn(err);
            reject(err.message);
          });
      });
    }).catch(Logger.error); //? [end] Fetch client application

    await this.commands.build().catch((errors) => Logger.handler(errors, 'COMMAND_MANAGER')); // Build commands
    await this.interactions.build().catch((errors) => Logger.handler(errors, 'INTERACTION_MANAGER')); // Build interactions
    await this.events.build().catch((errors) => Logger.handler(errors, 'EVENT_MANAGER')); // Build events

    Logger.blank();
    Logger.success(`${this.user?.tag} is online ! o7 (${Date.now() - start} ms)`);
    Logger.blank();

    this.emit('ready', (<ClientUser>this.user).client);
  } //? [end] build
} //? [end] Sucrose
