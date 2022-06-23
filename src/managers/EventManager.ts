import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Sucrose from '../structures/Sucrose';

import { SError, STypeError } from '../errors';
import Event from '../structures/Event';

type EventNames = keyof Discord.ClientEvents;

/**
 * event manager
 * @public
 * @category Managers
 */
export default class EventManager {
  /**
   * indicates if this manager was build or not
   * @internal
   * @defaultValue false
   */
  private builded = false;

  /**
   * Collection of Event
   */
  public collection: Discord.Collection<EventNames, Event<EventNames>> = new Collection();

  /**
   * @internal
   */
  public constructor(private sucrose: Sucrose, private options: { ext: 'js' | 'ts'; path: string; }) {}

  /**
   * load and build each events
   * @internal
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'EventManager is already build');

    const to = this.options.path;
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;

    const files = readdirSync(to).filter((file) => {
      const name = <keyof Discord.ClientEvents>file;
      return lstatSync(path.join(to, name)).isDirectory();
    });

    if (!files.length) throw SError('WARN', 'event folder is empty');
    if (this.collection.size) await Promise.all(this.collection.map((event) => event.remove()));
    this.collection = new Collection();

    await this.add(<(keyof Discord.ClientEvents)[]>(<unknown>files));
    this.builded = true;
  }

  /**
   * load one or multiple events
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.create("ready");
   * await events.create(["ready", "messageCreate", "messageDelete"]);
   */
  public async add(events: EventNames[]): Promise<Event<EventNames>[]>;
  public async add(events: EventNames): Promise<Event<EventNames>>;
  public async add(events: unknown): Promise<Event<EventNames>[] | Event<EventNames>> {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);

    const results = <Event<EventNames>[]>[];
    const names: EventNames[] = Array.isArray(events) ? events : [events];

    await Promise.all(names.map(async (name) => {
      if (this.collection.has(name)) throw SError('ERROR', `event "${name}" already exists`);
      const to = path.join(this.options.path, name, `handler.${this.options.ext}`);
      if (!existsSync(to)) throw SError('ERROR', `handler file of event "${name}" does not exist`);
      if (!lstatSync(to).isFile()) throw SError('ERROR', `handler file of event "${name}" is not a file`);

      const event = new Event(name, { path: to, sucrose: this.sucrose });
      await event.listen();

      this.collection.set(name, event);
      results.push(event);
    }));

    return Array.isArray(events) ? results : results[0];
  }

  /**
   * active one or multiple events
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.listen("ready");
   * await events.listen(["ready", "messageCreate", "messageDelete"]);
   */
  public async listen(events: EventNames[]): Promise<Event<EventNames>>;
  public async listen(events: EventNames): Promise<Event<EventNames>>;
  public async listen(events: unknown): Promise<Event<EventNames>[] | Event<EventNames>> {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);

    const results = <Event<EventNames>[]>[];
    const names: EventNames[] = Array.isArray(events) ? events : [events];

    Promise.all(names.map(async (name) => {
      const event = this.collection.get(name);
      if (!event) throw SError('ERROR', `event ${name} does not exist`);
      if (name === 'ready') this.sucrose.emit('ready', <Discord.Client> this.sucrose);

      results.push(await event.listen());
    }));

    return Array.isArray(events) ? results : results[0];
  }

  /**
   * desactive one or multiple events
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.mute("ready");
   * await events.mute(["ready", "messageCreate", "messageDelete"]);
   */
  public async mute(events: EventNames[]): Promise<Event<EventNames>[]>;
  public async mute(events: EventNames): Promise<Event<EventNames>>;
  public async mute(events: unknown): Promise<Event<EventNames>[] | Event<EventNames>> {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);

    const results = <Event<EventNames>[]>[];
    const names: EventNames[] = Array.isArray(events) ? events : [events];

    await Promise.all(names.map(async (name) => {
      const event = this.collection.get(name);
      if (!event) throw SError('ERROR', `event ${name} does not exist`);

      results.push(await event.mute());
    }));

    return Array.isArray(events) ? results : results[0];
  }

  /**
   * refresh one or multiple events (remove() and add())
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.refresh("ready");
   * await events.refresh(["ready", "messageCreate", "messageDelete"]);
   */
  public async refresh(events: EventNames[]): Promise<Event<EventNames>[]>;
  public async refresh(events: EventNames): Promise<Event<EventNames>>;
  public async refresh(events: unknown): Promise<Event<EventNames>[] | Event<EventNames>> {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);

    const results = <Event<EventNames>[]>[];
    const names: (keyof Discord.ClientEvents)[] = Array.isArray(events) ? events : [events];

    await Promise.all(names.map(async (name) => {
      const event = this.collection.get(name);
      if (!event) throw SError('ERROR', `event ${name} does not exist`);

      results.push(await event.refresh());
    }));

    return Array.isArray(events) ? results : results[0];
  }

  /**
   * remove one or multiple events
   *
   * @param events - string or array of string of events names
   *
   * @example
   * await events.remove("ready");
   * await events.remove(["ready", "messageCreate", "messageDelete"]);
   */
  public remove(events: EventNames[]): void;
  public remove(events: EventNames): void;
  public remove(events: unknown): void {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);
    const names: EventNames[] = Array.isArray(events) ? events : [events];

    names.forEach((name) => {
      const event = this.collection.get(name);
      if (!event) throw SError('ERROR', `event ${name} does not exist`);

      event.remove();
    });
  }
}
