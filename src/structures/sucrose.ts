/* Dependencies */
import { Client, ClientOptions } from 'discord.js';

/* Services */
import { Logger } from './services/logger';

/* Managers */
import { EventManager } from './managers/events';
import { InteractionManager } from './managers/interactions';

/**
 * Sucrose client
 */
export class Sucrose extends Client {
  public events: EventManager;
  public interactions: InteractionManager;

  public constructor(options: ClientOptions) {
    super(options); // Give options to Client

    this.events = new EventManager(this); // Attach new EventManager
    this.interactions = new InteractionManager(this); // Attach new InteractionManager

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
    }); // [end] Fetch client application

    await this.events.build().catch((errors) => Logger.handler(errors, 'EVENT_MANAGER')); // Build events
    await this.interactions.build().catch((errors) => Logger.handler(errors, 'INTERACTION_MANAGER')); // Build interactions

    Logger.blank();
    Logger.success(`${this.user?.tag} is online ! o7 (${Date.now() - start} ms)`);
  } // [end] Build all managers
} // [end] Sucrose client
