/* Dependencies */
import { Base, ClientEvents } from 'discord.js';
import { readdirSync, existsSync } from 'fs';

/* Typing */
import { Sucrose } from '../sucrose';
import { __event, BaseParams } from '../typings/index';
import { Params as CustomParams } from '../typings/custom';

/* Service */
import { SucroseError, Logger } from '../services/logger';
import { ConsoleLoading, StringProgressBar } from '../services/util';

const [dir, ext] = process.env.PROD == 'true' ? ['dist', 'js'] : ['src', 'ts'];

/**
 * Event manager
 */
class Event {
  private name: keyof ClientEvents;
  private sucrose: Sucrose;
  private base: BaseParams;

  public constructor(name: keyof ClientEvents, params: BaseParams) {
    if (!existsSync(`./${dir}/events/${name}/handler.${ext}`)) throw new SucroseError('ERROR', 'EVENT_MISSING_HANDLER');

    this.sucrose = params.sucrose; // Save sucrose client
    this.name = name; // Save name of this event
    this.base = params; // Base object to push in event listener
  }

  /**
   * Build this event
   */
  public async build<K extends keyof ClientEvents>(): Promise<void> {
    const content: __event<K> = await import(`../../events/${this.name}/handler.${ext}`);
    this.sucrose.on(this.name, async (...args) => content.listener({ ...this.base, args }));

    // Emit the ready event
    if (this.name === 'ready') {
      const user = this.sucrose.user;
      if (user) this.sucrose.emit('ready', user.client);
    }
  } // [end] Build this event

  /**
   * Refresh this event
   */
  public async refresh(): Promise<void> {
    this.sucrose.removeAllListeners(this.name); // Remove all listener of this event
    delete require.cache[require.resolve(`../events/${this.name}/handler.${ext}`)]; // Remove file in node cache
    await this.build(); // Rebuild this event
  } // [end] Refresh this event
}

/**
 * Event manager
 */
export class EventManager {
  public collection: Map<keyof ClientEvents, Event> = new Map();

  private sucrose: Sucrose;
  private options: { ignores?: Array<keyof ClientEvents>; custom_params: CustomParams };

  /**
   * Events manager
   * @param sucrose
   * @param options
   */
  public constructor(sucrose: Sucrose, options: { ignores?: Array<keyof ClientEvents>; custom_params: CustomParams }) {
    this.sucrose = sucrose;
    this.options = options;
  }

  /**
   * Build each events
   * @async
   */
  public async build(): Promise<void> {
    const cache: { errors: Error[]; i: number } = { errors: [], i: 0 };
    const files = readdirSync(`./${dir}/events`);

    if (files.length) {
      const content = () => `${StringProgressBar(cache.i + 1, files.length)}/${files.length} events processed`;
      const loading = new ConsoleLoading(content()); // Start loading console line

      for await (const file of files) {
        cache.i++; // Increment event index in logger cache

        try {
          const name = file as keyof ClientEvents; // file is a keyof ClientEvents
          if (this.options.ignores?.includes(name)) continue; // Ignore if this event name is in ignores array

          const event = new Event(name, { sucrose: this.sucrose, ...this.options.custom_params }); // Create new event
          this.collection.set(name, event); // Push event in events array
          await event.build(); // Build this event
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error);
        }

        loading.content = content(); // set new state in loading console line
      }

      loading.clear(); // clear loading console line

      if (cache.errors.length) throw cache.errors; // throw all errors of guilds commands section
      Logger.log(`${files.length} events loaded`, 'EVENT_MANAGER');
    }
  } // [end] Build each events
} // [end] Event manager
