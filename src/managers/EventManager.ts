import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError, STypeError } from '../errors';
import Event from '../structures/Event';

export default class EventManager implements Types.EventManager {
  private builded = false;

  public collection: Discord.Collection<keyof Discord.ClientEvents, Types.Event> = new Collection();

  public constructor(private sucrose: Types.Sucrose, private options: Types.EventManagerOptions) {}

  /**
   * Build events
   * @returns
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
  } // [end] build()

  /**
   * Create new event(s)
   * @param events
   * @example
   * await events.create(["ready", "messageCreate", "messageDelete"]);
   * await events.create("ready");
   */
  public async add(events: (keyof Discord.ClientEvents)[]): Promise<Types.Event[]>;
  public async add(events: keyof Discord.ClientEvents): Promise<Types.Event>;
  public async add(events: unknown): Promise<Types.Event[] | Types.Event> {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);

    const results = <Types.Event[]>[];
    const names: (keyof Discord.ClientEvents)[] = Array.isArray(events) ? events : [events];

    // ? loop all event name
    await Promise.all(
      names.map(async (name) => {
        if (this.collection.has(name)) throw SError('ERROR', `event "${name}" already exists`);
        const to = path.join(this.options.path, name, `handler.${this.options.env.ext}`);
        if (!existsSync(to)) throw SError('ERROR', `handler file of event "${name}" does not exist`);
        if (!lstatSync(to).isFile()) throw SError('ERROR', `handler file of event "${name}" is not a file`);

        const event = new Event(name, { path: to, sucrose: this.sucrose });
        await event.listen();

        this.collection.set(name, event);
        results.push(event);
      })
    ); // [end] loop all event name

    return Array.isArray(events) ? results : results[0];
  } // [end] create()

  /**
   * Listen/Active event(s)
   * @param events
   * @example
   * await events.listen(["ready", "messageCreate", "messageDelete"]);
   * await events.listen("ready");
   */
  public async listen(events: (keyof Discord.ClientEvents)[]): Promise<Types.Event[]>;
  public async listen(events: keyof Discord.ClientEvents): Promise<Types.Event>;
  public async listen(events: unknown): Promise<Types.Event[] | Types.Event> {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);

    const results = <Types.Event[]>[];
    const names: (keyof Discord.ClientEvents)[] = Array.isArray(events) ? events : [events];

    // ? loop all event name
    await Promise.all(
      names.map(async (name) => {
        const event = this.collection.get(name);
        if (!event) throw SError('ERROR', `event ${name} does not exist`);
        if (name === 'ready') this.sucrose.emit('ready', <Discord.Client>this.sucrose);

        results.push(await event.listen());
      })
    ); // [end] loop all event name

    return Array.isArray(events) ? results : results[0];
  } // [end] listen()

  /**
   * Mute/Disable event(s)
   * @param events
   * @example
   * await events.mute(["ready", "messageCreate", "messageDelete"]);
   * await events.mute("ready");
   */
  public async mute(events: (keyof Discord.ClientEvents)[]): Promise<Types.Event[]>;
  public async mute(events: keyof Discord.ClientEvents): Promise<Types.Event>;
  public async mute(events: unknown): Promise<Types.Event[] | Types.Event> {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);

    const results = <Types.Event[]>[];
    const names: (keyof Discord.ClientEvents)[] = Array.isArray(events) ? events : [events];

    // ? loop all event name
    await Promise.all(
      names.map(async (name) => {
        const event = this.collection.get(name);
        if (!event) throw SError('ERROR', `event ${name} does not exist`);

        results.push(await event.mute());
      })
    ); // [end] loop all event name

    return Array.isArray(events) ? results : results[0];
  } // [end] mute()

  /**
   * Refresh event(s)
   * @param events
   * @example
   * await events.refresh(["ready", "messageCreate", "messageDelete"]);
   * await events.refresh("ready");
   */
  public async refresh(events: (keyof Discord.ClientEvents)[]): Promise<Types.Event[]>;
  public async refresh(events: keyof Discord.ClientEvents): Promise<Types.Event>;
  public async refresh(events: unknown): Promise<Types.Event[] | Types.Event> {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);

    const results = <Types.Event[]>[];
    const names: (keyof Discord.ClientEvents)[] = Array.isArray(events) ? events : [events];

    // ? loop all event name
    await Promise.all(
      names.map(async (name) => {
        const event = this.collection.get(name);
        if (!event) throw SError('ERROR', `event ${name} does not exist`);

        results.push(await event.refresh());
      })
    ); // [end] loop all event name

    return Array.isArray(events) ? results : results[0];
  } // [end] refresh

  /**
   * Remove event(s)
   * @param events
   * @example
   * events.remove(["ready", "messageCreate", "messageDelete"]);
   * events.remove("ready");
   */
  public remove(events: (keyof Discord.ClientEvents)[]): void;
  public remove(events: keyof Discord.ClientEvents): void;
  public remove(events: unknown): void {
    if (!Array.isArray(events) && typeof events !== 'string') throw STypeError('events', 'string or string[]', events);
    const names: (keyof Discord.ClientEvents)[] = Array.isArray(events) ? events : [events];

    names.forEach((name) => {
      const event = this.collection.get(name);
      if (!event) throw SError('ERROR', `event ${name} does not exist`);

      event.remove();
    });
  } // [end] remove()
}
