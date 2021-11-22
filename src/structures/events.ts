import { ClientEvents } from 'discord.js';
import { __event } from '../typings/index';

import { readdirSync, existsSync } from 'fs';
import { Sucrose } from './sucrose';

import { prod } from '../secret.json';
const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

// Event manager
class Event<K> {
  private name: keyof ClientEvents;
  private sucrose: Sucrose;
  private base: { sucrose: Sucrose };

  public constructor(name: keyof ClientEvents, params: { sucrose: Sucrose }) {
    if (!existsSync(`./${dir}/events/${name}/handler.${ext}`)) throw Error(`[Sucrose] typescript file named "handler.${ext}" is missing in ${name} event folder`);

    this.sucrose = params.sucrose;
    this.name = name;

    this.base = { sucrose: params.sucrose };
  }

  public async build<K extends keyof ClientEvents>(): Promise<void> {
    const content: __event<K> = await import(`../events/${this.name}/handler.${ext}`);
    this.sucrose.on(this.name, (...args) => content.listener({ ...this.base, args }));
  }

  public async refresh(): Promise<void> {
    this.sucrose.removeAllListeners(this.name);
    delete require.cache[require.resolve(`../events/${this.name}/handler.${ext}`)];
    await this.build();
  }
}

// Events manager
export class Events {
  public collection: Map<keyof ClientEvents, Event<keyof ClientEvents>> = new Map();

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

  public async build(): Promise<void> {
    /* Build each event */
    for await (const file of readdirSync(`./${dir}/events`)) {
      const name = file as keyof ClientEvents;
      if (this.options.ignores?.includes(name)) continue; // Ignore if this event name is in ignores array

      const event = new Event<typeof name>(name, { sucrose: this.sucrose }); // Create new event
      this.collection.set(name, event); // Push event in events array
      await event.build(); // Build this event
    }
  }
}
