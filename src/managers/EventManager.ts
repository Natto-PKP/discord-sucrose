import { Collection } from 'discord.js';
import { existsSync, lstatSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SucroseError } from '../errors';
import Logger from '../services/Logger';
import Event from './Event';
import FolderService from '../services/FolderService';

export default class EventManager implements Types.EventManager {
  public cache: Collection<Types.EventNames, Event>;

  private builded = false;

  private directory: Types.DirectoryValue<true>;

  private logger: Logger;

  public constructor(private sucrose: Types.Sucrose, private options: Types.EventManagerOptions) {
    this.cache = new Collection();
    this.directory = options.directory;
    this.logger = new Logger(this.options.logging);
  }

  /**
   * load and build each event
   */
  public async build(): Promise<void> {
    // # prevent multiple build
    if (this.builded) throw new SucroseError('ERROR', 'EventManager is already build');
    this.builded = true;

    // # get events folders
    const to = this.directory.path; // get path
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;
    const names = FolderService.search({ path: to, filter: { type: 'folder', ext: this.options.env.ext }, nameOnly: true });

    const { logging } = this.options;
    const errors = [] as Error[];

    // # loop all events folder
    const promises = await Promise.allSettled(names.map(async (name) => {
      await this.add(name as Types.EventNames);
    }));

    // # get potentials errors
    promises.forEach((promise) => {
      if (promise.status !== 'rejected') return;
      if (promise.reason instanceof Error) errors.push(promise.reason);
      else errors.push(new Error('unknown error'));
    });

    // # handle errors
    if (errors.length) this.logger.handle(...errors);

    // # log
    if (this.cache.size) {
      this.logger.give('SUCCESS', `${names.length} events loaded`);
      if (logging.details) {
        this.logger.table(this.cache.map((v, k) => ({ name: k, path: v.directory.path })));
      }
    }
  }

  /**
   * load one or multiple events
   */
  public async add(name: Types.EventNames): Promise<Types.Event> {
    const { env, logging } = this.options;

    // # don't accept duplicate
    if (this.cache.has(name)) throw new SucroseError('ERROR', `event "${name}" already exists (use refresh)`);

    // # check if event folder is valid
    const to = path.join(this.directory.path, name); // get folder path
    if (!existsSync(to) || !lstatSync(to).isDirectory()) throw new SucroseError('ERROR', `event directory of "${name}" does not exist`);

    // # init new event and listen it
    const params = { env, logging, directory: { path: to, depth: this.directory.depth } };
    const event = new Event(name, { sucrose: this.sucrose, ...params });
    await event.listen();

    this.cache.set(name, event); // add event to collection

    return event;
  }

  /**
   * active one or multiple events
   */
  public async listen(name: Types.EventNames): Promise<Event> {
    const event = this.cache.get(name);
    if (!event) throw new SucroseError('ERROR', `event ${name} does not exist`);
    if (name === 'ready') this.sucrose.emit('ready', <Discord.Client> this.sucrose);

    return event;
  }

  /**
   * desactive one or multiple events
   */
  public async mute(name: Types.EventNames): Promise<Event> {
    const event = this.cache.get(name);
    if (!event) throw new SucroseError('ERROR', `event ${name} does not exist`);
    return event.mute();
  }

  /**
   * refresh one or multiple events (remove() and add())
   */
  public async refresh(name: Types.EventNames): Promise<Event> {
    const event = this.cache.get(name);
    if (!event) throw new SucroseError('ERROR', `event ${name} does not exist`);
    return event.refresh();
  }

  /**
   * remove one or multiple events
   */
  public remove(name: Types.EventNames) {
    const event = this.cache.get(name);
    if (!event) return;
    this.cache.delete(name);
    event.remove();
  }
}
