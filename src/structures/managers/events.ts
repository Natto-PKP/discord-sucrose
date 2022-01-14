/* Dependencies */
import { readdirSync, existsSync, lstatSync } from 'fs-extra';
import path from 'path';

/* Typing */
import { Sucrose } from '../sucrose';
import { BaseParams, EventManagerOptions, EventHandler, EventListener } from '../typings/index';
import Discord from 'discord.js';

/* Service */
import { SucroseError, Logger, ConsoleLoading } from '../services/logger';
import { stringProgressBar } from '../services/util';

const ext = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

//? Event manager
class Event<T extends keyof Discord.ClientEvents> {
  private base: BaseParams;
  private path: string;
  private sucrose: Sucrose;

  /**
   * Your event function
   * @property
   * @public
   * @type { EventHandler<T> | null }
   */
  public handler: EventHandler<T> | null;

  /**
   * Event listener
   * @property
   * @public
   * @type { EventHandler<T> | null }
   */
  public listener: EventListener<T> | null;

  /**
   * @constructor
   * @public
   * @param { keyof ClientEvents } name
   * @param { BaseParams } params
   * @example
   * new Event('messageCreate', { sucrose })
   */
  public constructor(private name: T, params: BaseParams) {
    this.path = path.join(__dirname, '../../events', name, 'handler.' + ext);
    if (!existsSync(this.path)) throw new SucroseError('ERROR', 'EVENT_MISSING_HANDLER');

    this.base = params; // Base object to push in event listener
    this.handler = null;
    this.listener = null;
    this.name = name; // Save name of this event
    this.sucrose = params.sucrose; // Save sucrose client
  }

  /**
   * Build an event
   * @method
   * @public
   * @async
   * @returns { Promise<void> }
   */
  public async build(): Promise<void> {
    const handler = <EventHandler<T>>(await import(this.path)).default;
    const listener: EventListener<T> = async (...args) => {
      try {
        await handler({ ...this.base, args });
      } catch (errors) {
        if (errors instanceof Error) Logger.error(errors);
        if (Array.isArray(errors) && errors.every((err) => err instanceof Error)) Logger.handler(errors);
      }
    };

    this.handler = handler;
    this.listener = listener;

    await this.listen();
  } //? [end] build

  /**
   * Listen/Active an event
   * @method
   * @public
   * @async
   * @returns { Promise<void> }
   * @example
   * await event.listen()
   */
  public async listen(): Promise<void> {
    if (!this.listener) throw new SucroseError('ERROR', 'EVENT_LISTENER_NULL');
    this.sucrose.on(this.name, this.listener);
  }

  /**
   * Refresh an event
   * @method
   * @public
   * @async
   * @returns { Promise<void> }
   * @example
   * await event.refresh()
   */
  public async refresh(): Promise<void> {
    this.remove();
    await this.build(); // Rebuild this event
  } //? [end] refresh

  /**
   * Remove/Desactive an event
   * @method
   * @public
   * @async
   * @returns { void }
   * @example
   * event.remove()
   */
  public async remove(): Promise<void> {
    if (!this.listener) throw new SucroseError('ERROR', 'EVENT_LISTENER_NULL');
    this.sucrose.removeListener(this.name, <(...args: unknown[]) => void>this.listener); // Remove all listener of this event
    delete require.cache[this.path]; // Remove file in node cache
  } //? [end] remove
}

//? Event manager
export class EventManager {
  /**
   * @property
   * @public
   * @type { Map<keyof Discord.ClientEvents, Event<keyof Discord.ClientEvents>> }
   */
  public collection: Map<keyof Discord.ClientEvents, Event<keyof Discord.ClientEvents>> = new Map();

  /**
   * Events manager
   * @constructor
   * @public
   * @param { Sucrose } sucrose
   * @param { EventManagerOptions } options
   */
  public constructor(private sucrose: Sucrose, private options: EventManagerOptions) {
    this.sucrose = sucrose;
    this.options = options;
  }

  /**
   * Build all events
   * @method
   * @public
   * @async
   * @returns { Promise<void> }
   */
  public async build(): Promise<void> {
    const basePath = path.join(__dirname, '../../events');
    const dirs = readdirSync(basePath).filter((file) => lstatSync(path.join(basePath, file)).isDirectory());
    if (!dirs.length) return;

    const cache = { errors: <Error[]>[], i: 0 };
    const content = () => `${stringProgressBar(cache.i + 1, dirs.length)}/${dirs.length} events processed`;
    const loading = new ConsoleLoading(content()); // Start loading console line

    //? Loop all events folder
    for await (const dir of dirs) {
      cache.i++; // Increment event index in logger cache

      try {
        const name = dir as keyof Discord.ClientEvents; // file is a keyof ClientEvents
        if (this.options.ignores?.includes(name)) continue; // Ignore if this event name is in ignores array

        const event = new Event(name, { sucrose: this.sucrose, ...this.options.customParams }); // Create new event
        this.collection.set(name, event); // Push event in events array
        await event.build(); // Build this event

        loading.content = content(); // set new state in loading console line
      } catch (error) {
        if (error instanceof Error) cache.errors.push(error);
      }
    } //? [end] Loop all events folder

    loading.clear(); // clear loading console line

    if (cache.errors.length) throw cache.errors; // throw all errors of guilds commands section
    Logger.log(`${dirs.length} events loaded`, 'EVENT_MANAGER');
  } //? [end] build
} //? [end] EventManager
