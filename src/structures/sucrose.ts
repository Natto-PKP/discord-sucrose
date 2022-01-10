/* Dependencies */
import { Client, ClientOptions } from 'discord.js';

/* Services */
import { Logger } from './services/logger';

/* Managers */
import { EventManager } from './managers/events';
import { InteractionManager } from './managers/interactions';

/* Typings */
import { SucroseOptions } from './typings';

/**
 * Sucrose client
 */
export class Sucrose extends Client {
  public events: EventManager;
  public interactions: InteractionManager;

  public constructor(clientOptions: ClientOptions, sucroseOptions: SucroseOptions = {}) {
    super(clientOptions); // Give options to Client

    const eventOptions = sucroseOptions.events;
    const customParams = sucroseOptions.customParams;

    this.events = new EventManager(this, { ...eventOptions, customParams }); // Attach new EventManager
    this.interactions = new InteractionManager(this, { customParams }); // Attach new InteractionManager

    this.login(process.env.TOKEN); // Connect bot application to Discord API

    this.build(); // Build this client
  }

  /**
   * Build all managers
   */
  private async build(): Promise<void> {
    const start = Date.now();

    /**
     * Fetch client application
     */
    await new Promise<void>(async (resolve, reject) => {
      this.on('ready', async () => {
        await this.application?.fetch().catch((error) => {
          if (error instanceof Error) {
            Logger.warn(error);
            reject(error.message);
          }
        });

        resolve();
      });
    }).catch(Logger.error); // [end] Fetch client application

    await this.interactions.build().catch((errors) => Logger.handler(errors, 'INTERACTION_MANAGER')); // Build interactions
    await this.events.build().catch((errors) => Logger.handler(errors, 'EVENT_MANAGER')); // Build events

    Logger.blank();
    Logger.success(`${this.user?.tag} is online ! o7 (${Date.now() - start} ms)`);
  } // [end] Build all managers
} // [end] Sucrose client
