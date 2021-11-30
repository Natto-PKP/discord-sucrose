import { ClientEvents } from 'discord.js';
import { readdirSync, existsSync } from 'fs';

import { Sucrose } from './sucrose';
import { SucroseError } from './errors';
import { __event } from '../typings/index';

import { prod } from '../secret.json';
const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

// Event manager
class Event {
  private name: keyof ClientEvents;
  private sucrose: Sucrose;
  private base: { sucrose: Sucrose };

  public constructor(name: keyof ClientEvents, params: { sucrose: Sucrose }) {
    if (!existsSync(`./${dir}/events/${name}/handler.${ext}`)) throw new SucroseError('EVENT_MISSING_HANDLER', { section: 'EVENT_MANAGER' });

    this.sucrose = params.sucrose;
    this.name = name;

    this.base = { sucrose: params.sucrose };
  }

  public async build<K extends keyof ClientEvents>(): Promise<void> {
    const content: __event<K> = await import(`../events/${this.name}/handler.${ext}`);
    this.sucrose.on(this.name, async (...args) => content.listener({ ...this.base, args }));

    // Emit the ready event
    if (this.name === 'ready') {
      const user = this.sucrose.user;
      if (user) this.sucrose.emit('ready', user.client);
    }
  }

  public async refresh(): Promise<void> {
    this.sucrose.removeAllListeners(this.name);
    delete require.cache[require.resolve(`../events/${this.name}/handler.${ext}`)];
    await this.build();
  }
}

// Events manager
export class Events {
  public collection: Map<keyof ClientEvents, Event> = new Map();

  private sucrose: Sucrose;
  private options: { ignores?: Array<keyof ClientEvents> };

  /**
   * Events manager
   * @param sucrose
   * @param options
   */
  public constructor(sucrose: Sucrose, options: { ignores?: Array<keyof ClientEvents> } = {}) {
    this.sucrose = sucrose;
    this.options = options;
  }

  /**
   * Build each events
   * @async
   */
  public async build(): Promise<void> {
    const files = readdirSync(`./${dir}/events`);

    // Multiples errors handler
    const errors: { array: { name: string; message: string; path: string }[]; index: number } = { array: [], index: 0 };
    for await (const file of files) {
      errors.index++;

      try {
        const name = file as keyof ClientEvents;
        if (this.options.ignores?.includes(name)) continue; // Ignore if this event name is in ignores array

        const event = new Event(name, { sucrose: this.sucrose }); // Create new event
        this.collection.set(name, event); // Push event in events array
        await event.build(); // Build this event
      } catch (error) {
        if (error instanceof Error) {
          errors.array.push({ name: error.name, message: error.message, path: `./${dir}/commands/${file}` });
          if (files.length === errors.index) throw console.table(errors.array);
        }
      }
    }
  }
}
