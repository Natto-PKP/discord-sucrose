import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError } from '../errors';
import Logger from '../services/Logger';
import Event from './Event';

/**
 * event manager
 * @category managers
 *
 * @public
 * @example Initialize EventManager
 * ```js
 * new EventManager(sucrose, options)
 * ```
 */
export default class EventManager
  extends Collection<Types.EventNames, Event>
  implements Types.EventManager {
  /**
   * indicates if this manager was build or not
   * @internal
   * @defaultValue false
   */
  private builded = false;

  public constructor(private sucrose: Types.Sucrose, private options: Types.EventManagerOptions) {
    super();
  }

  /**
   * load and build each event
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'EventManager is already build');
    this.builded = true;

    if (this.size) await Promise.all(this.map((event) => event.remove()));
    this.clear();

    const to = this.options.path;
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;
    const events = readdirSync(to).filter((file) => lstatSync(path.join(to, file)).isDirectory());
    const { logging } = this.options;

    if (events.length) {
      const loading = logging.loadings ? Logger.loading(events.length) : null;
      if (loading) loading.next();

      for await (const event of events) {
        const index = events.indexOf(event) + 1;
        if (loading) loading.next({ index, message: `load /events/${event}/handler.${this.options.env.ext}` });
        await this.add(event as Types.EventNames);
      }

      if (loading) Logger.clear();
      Logger.give('SUCCESS', `${events.length} events loaded`);
      if (logging.details) Logger.table(this.map((v, k) => ({ name: k, path: v.path })));
    }
  }

  /**
   * load one or multiple events
   *
   * @example
   * ```js
   * await events.create("ready");
   * ```
   */
  public async add(name: Types.EventNames): Promise<Types.Event> {
    const { env, logging } = this.options;

    if (this.has(name)) throw SError('ERROR', `event "${name}" already exists`);
    const to = path.join(this.options.path, name, `handler.${env.ext}`);
    if (!existsSync(to)) throw SError('ERROR', `handler file of event "${name}" does not exist`);
    if (!lstatSync(to).isFile()) throw SError('ERROR', `handler file of event "${name}" is not a file`);

    const params = { env, logging };
    const event = new Event(name, { path: to, sucrose: this.sucrose, ...params });
    await event.listen();

    this.set(name, event);

    return event;
  }

  /**
   * Delete one or multiple events
   *
   * @example
   * ```js
   * await events.delete('ready');
   * ```
   */
  public override delete(key: Types.EventNames): boolean {
    this.remove(key);
    return true;
  }

  /**
   * active one or multiple events
   *
   * @example
   * ```js
   * await events.listen("ready");
   * ```
   */
  public async listen(name: Types.EventNames): Promise<Event> {
    const event = this.get(name);
    if (!event) throw SError('ERROR', `event ${name} does not exist`);
    if (name === 'ready') this.sucrose.emit('ready', <Discord.Client> this.sucrose);

    return event;
  }

  /**
   * desactive one or multiple events
   *
   * @example
   * ```js
   * await events.mute("ready");
   * ```
   */
  public async mute(name: Types.EventNames): Promise<Event> {
    const event = this.get(name);
    if (!event) throw SError('ERROR', `event ${name} does not exist`);
    return event.mute();
  }

  /**
   * refresh one or multiple events (remove() and add())
   *
   * @example
   * ```js
   * await events.refresh("ready");
   * ```
   */
  public async refresh(name: Types.EventNames): Promise<Event> {
    const event = this.get(name);
    if (!event) throw SError('ERROR', `event ${name} does not exist`);
    return event.refresh();
  }

  /**
   * remove one or multiple events
   *
   * @example
   * ```js
   * await events.remove("ready");
   * ```
   */
  public remove(name: Types.EventNames) {
    const event = this.get(name);
    if (event) event.remove();
  }
}
