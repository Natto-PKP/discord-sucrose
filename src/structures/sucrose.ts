/* Dependencies */
import { Client, ClientOptions } from 'discord.js';

/* Services */
import { Logger } from './services/logger';

/* Managers */
import { EventManager } from './managers/events';
import { InteractionManager } from './managers/interactions';

/* Typings */
import { Params as CustomParams } from 'src/structures/typings/custom';

/**
 * Sucrose client
 */
export class Sucrose extends Client {
  public events: EventManager;
  public interactions: InteractionManager;

  public constructor(options: ClientOptions, custom_params?: CustomParams) {
    super(options); // Give options to Client

    custom_params = <CustomParams>custom_params;
    this.events = new EventManager(this, { custom_params }); // Attach new EventManager
    this.interactions = new InteractionManager(this, { custom_params }); // Attach new InteractionManager

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
