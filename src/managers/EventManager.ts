import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

import { STypeError, SError } from '../services/errors';
import { Logger, stringProgressBar, Collection } from '..';
import { Event } from '../structures/Event';

/* Types */
import type Types from '../../typings';
import type Discord from 'discord.js';

export class EventManager implements Types.EventManager {
  public collection: Types.Collection<keyof Discord.ClientEvents, Types.Event> = new Collection();

  public constructor(private sucrose: Types.Sucrose, private options: Types.EventManagerOptions) {}

  /**
   * Load and add an event in events collection
   * @param events
   * await add(['ready', 'messageCreate', 'messageUpdate'])
   * await add('ready')
   */
  public async add(events: (keyof Discord.ClientEvents)[]): Promise<Types.Event[]>;
  public async add(events: keyof Discord.ClientEvents): Promise<Types.Event<keyof Discord.ClientEvents>>;
  public async add(events: unknown): Promise<Types.Event[] | Types.Event> {
    // ! valid types
    if (Array.isArray(events) || typeof events === 'string') {
      const errors = <Error[]>[];
      const results = <Types.Event[]>[];

      // ? loop all event names
      for (const e of Array.isArray(events) ? events : [events]) {
        try {
          const name = <keyof Discord.ClientEvents>e;
          if (this.collection.has(name)) throw SError('ERROR', 'EVENT_MANAGER_EVENT_ALREADY_EXIST');
          const to = path.join(this.options.path, name, 'handler.' + this.options.env.extension);
          if (!existsSync(to) || !lstatSync(to).isFile()) throw SError('ERROR', 'EVENT_MANAGER_EVENT_PATH_INVALID');

          const event = new Event(name, { path: to, sucrose: this.sucrose });
          await event.listen();

          this.collection.set(name, event);
          results.push(event);
        } catch (err) {
          if (err instanceof Error) errors.push(err);
        }
      } // [end] loop all event names

      if (errors.length) throw errors.length > 1 ? errors : errors[0];
      return Array.isArray(events) ? results : results[0];
    } // [end] valid types
    else throw STypeError('event', 'keyof Discord.ClientEvents or keyof Discord.ClientEvents[]', events);
  } // [end] add

  /**
   * Build, load and add all event files in events directory
   */
  public async build(): Promise<void> {
    const to = this.options.path;
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;

    const files = readdirSync(this.options.path).filter((dir) => {
      const name = <keyof Discord.ClientEvents>dir;
      return lstatSync(path.join(to, name)).isDirectory() && !this.options.ignore.includes(name);
    });

    if (!files.length) throw SError('WARN', 'EVENT_MANAGER_EMPTY_DIRECTORY');
    this.collection = new Collection();

    const cache = { errors: <Error[]>[], i: 0 };
    const content = () => `${stringProgressBar(cache.i, files.length)} ${cache.i}/${files.length} events processed`;
    const loading = new Logger.loading(content());

    // ? loop all events dirs
    for await (const file of files) {
      try {
        await this.add(<keyof Discord.ClientEvents>file);

        loading.content = content();
        cache.i += 1;
      } catch (err) {
        if (err instanceof Error) cache.errors.push(err);
        if (Array.isArray(err)) cache.errors.push(...err);
      }
    } // [end] loop all events dirs

    loading.clear();

    if (cache.i) Logger.log(`${cache.i} events loaded`, 'SUCCESS', 'EVENT_MANAGER');
    if (cache.errors.length) throw cache.errors;
  }

  /**
   * Listen/Active an event
   * @param events
   * await listen(['ready', 'messageCreate', 'messageUpdate'])
   * await listen('ready')
   */
  public async listen(events: (keyof Discord.ClientEvents)[]): Promise<Types.Event[]>;
  public async listen(events: keyof Discord.ClientEvents): Promise<Types.Event>;
  public async listen(events: unknown): Promise<Types.Event[] | Types.Event> {
    if (Array.isArray(events) || typeof events === 'string') {
      const errors = <Error[]>[];
      const results = <Types.Event[]>[];

      for (const name of Array.isArray(events) ? events : [events]) {
        try {
          const event = this.collection.get(name);
          if (!event) throw SError('ERROR', 'EVENT_MANAGER_EVENT_NOT_EXIST');
          await event.listen();
          results.push(event);
        } catch (err) {
          if (err instanceof Error) errors.push(err);
        }
      }

      if (errors.length) throw errors.length > 1 ? errors : errors[0];
      return Array.isArray(events) ? results : results[0];
    } else throw STypeError('event', 'keyof Discord.ClientEvents or keyof Discord.ClientEvents[]', events);
  } // [end] listen

  /**
   * Mute/Disable an event
   * @param events
   * await mute(['ready', 'messageCreate', 'messageUpdate'])
   * await mute('ready')
   */
  public async mute(events: (keyof Discord.ClientEvents)[]): Promise<Types.Event[]>;
  public async mute(events: keyof Discord.ClientEvents): Promise<Types.Event>;
  public async mute(events: unknown): Promise<Types.Event[] | Types.Event> {
    if (Array.isArray(events) || typeof events === 'string') {
      const errors = <Error[]>[];
      const results = <Types.Event[]>[];

      for (const name of Array.isArray(events) ? events : [events]) {
        try {
          const event = this.collection.get(name);
          if (!event) throw SError('ERROR', 'EVENT_MANAGER_EVENT_NOT_EXIST');
          await event.mute();
          results.push(event);
        } catch (err) {
          if (err instanceof Error) errors.push(err);
        }
      }

      if (errors.length) throw errors.length > 1 ? errors : errors[0];
      return Array.isArray(events) ? results : results[0];
    } else throw STypeError('event', 'keyof Discord.ClientEvents or keyof Discord.ClientEvents[]', events);
  }

  /**
   * Refresh an event and this listener
   * @param events
   * @example
   * await refresh(['ready', 'messageCreate', 'messageUpdate'])
   * await refresh('ready')
   */
  public async refresh(events: (keyof Discord.ClientEvents)[]): Promise<Types.Event[]>;
  public async refresh(events: keyof Discord.ClientEvents): Promise<Types.Event>;
  public async refresh(events: unknown): Promise<Types.Event[] | Types.Event> {
    if (Array.isArray(events) || typeof events === 'string') {
      const errors = <Error[]>[];
      const results = <Types.Event[]>[];

      for (const name of Array.isArray(events) ? events : [events]) {
        try {
          const event = this.collection.get(name);
          if (!event) throw SError('ERROR', 'EVENT_MANAGER_EVENT_NOT_EXIST');
          await event.refresh();
          results.push(event);
        } catch (err) {
          if (err instanceof Error) errors.push(err);
        }
      }

      if (errors.length) throw errors.length > 1 ? errors : errors[0];
      return Array.isArray(events) ? results : results[0];
    } else throw STypeError('event', 'keyof Discord.ClientEvents or keyof Discord.ClientEvents[]', events);
  }

  /**
   * Remove/Delete an event in collection
   * @param events
   * remove(['ready', 'messageCreate', 'messageUpdate'])
   * remove('ready')
   */
  public remove(events: (keyof Discord.ClientEvents)[]): void;
  public remove(events: keyof Discord.ClientEvents): void;
  public remove(events: unknown): void {
    if (Array.isArray(events) || typeof events === 'string') {
      const errors = <Error[]>[];

      for (const name of Array.isArray(events) ? events : [events]) {
        try {
          const event = this.collection.get(name);
          if (!event) throw SError('ERROR', 'EVENT_MANAGER_EVENT_NOT_EXIST');
          event.remove();
        } catch (err) {
          if (err instanceof Error) errors.push(err);
        }
      }

      if (errors.length) throw errors.length > 1 ? errors : errors[0];
    } else throw STypeError('event', 'keyof Discord.ClientEvents or keyof Discord.ClientEvents[]', events);
  }
}
