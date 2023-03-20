import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError } from '../errors';
import Logger from '../services/Logger';
import Event from './Event';

export default class EventManager
  extends Collection<Types.EventNames, Event>
  implements Types.EventManager {
  private builded = false;

  private path: string;

  private logger: Logger;

  public constructor(private sucrose: Types.Sucrose, private options: Types.EventManagerOptions) {
    super();

    this.path = options.directory;
    this.logger = new Logger(this.options.logging);
  }

  /**
   * load and build each event
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'EventManager is already build');
    this.builded = true;

    if (this.size) await Promise.all(this.map((event) => event.remove()));
    this.clear();

    const to = this.path;
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;
    const events = readdirSync(to).filter((file) => lstatSync(path.join(to, file)).isDirectory());
    const { logging } = this.options;

    if (events.length) {
      const loading = Logger.loading(events.length);
      loading.next();

      await Promise.all(events.map(async (event) => {
        await this.add(event as Types.EventNames).catch((err) => this.logger.handle(err));
        const index = events.indexOf(event) + 1;
        if (loading) loading.next({ index, message: `load /events/${event}` });
      }));

      if (loading) Logger.clear();
      if (this.size) this.logger.give('SUCCESS', `${events.length} events loaded`);
      if (logging.details) this.logger.table(this.map((v, k) => ({ name: k, path: v.path })));
    }
  }

  /**
   * load one or multiple events
   */
  public async add(name: Types.EventNames): Promise<Types.Event> {
    const { env, logging } = this.options;

    if (this.has(name)) throw SError('ERROR', `event "${name}" already exists (use refresh)`);
    const to = path.join(this.path, name);
    if (!existsSync(to) || !lstatSync(to).isDirectory()) throw SError('ERROR', `event directory of "${name}" does not exist`);

    const params = { env, logging };
    const event = new Event(name, { path: to, sucrose: this.sucrose, ...params });
    await event.listen();

    this.set(name, event);

    return event;
  }

  /**
   * Delete one or multiple events
   */
  public override delete(key: Types.EventNames): boolean {
    this.remove(key);
    return true;
  }

  /**
   * active one or multiple events
   */
  public async listen(name: Types.EventNames): Promise<Event> {
    const event = this.get(name);
    if (!event) throw SError('ERROR', `event ${name} does not exist`);
    if (name === 'ready') this.sucrose.emit('ready', <Discord.Client> this.sucrose);

    return event;
  }

  /**
   * desactive one or multiple events
   */
  public async mute(name: Types.EventNames): Promise<Event> {
    const event = this.get(name);
    if (!event) throw SError('ERROR', `event ${name} does not exist`);
    return event.mute();
  }

  /**
   * refresh one or multiple events (remove() and add())
   */
  public async refresh(name: Types.EventNames): Promise<Event> {
    const event = this.get(name);
    if (!event) throw SError('ERROR', `event ${name} does not exist`);
    return event.refresh();
  }

  /**
   * remove one or multiple events
   */
  public remove(name: Types.EventNames) {
    const event = this.get(name);
    if (event) event.remove();
  }
}
