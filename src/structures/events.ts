import { ClientEvents } from 'discord.js';
import { __event } from '../typings/index';

import { readdirSync, existsSync } from 'fs';
import { prod } from '../secret.json';
import { Sucrose } from './sucrose';

const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

class Event {
  public name: keyof ClientEvents;

  public constructor(name: keyof ClientEvents) {
    if (!existsSync(`./${dir}/events/${name}/handler.${ext}`)) throw Error(`[Sucrose] typescript file named "handler.${ext}" is missing in ${name} event folder`);

    this.name = name;
  }

  public refresh(): void {
    delete require.cache[require.resolve(`../events/${this.name}/handler.${ext}`)];
  }
}

export class Events {
  public collection: Map<keyof ClientEvents, Event> = new Map();
  public sucrose: Sucrose;
  private base: { sucrose: Sucrose };

  /**
   * Events manager
   * @param sucrose
   * @param options
   */
  public constructor(sucrose: Sucrose, options: { ignores?: Array<keyof ClientEvents> } = {}) {
    this.sucrose = sucrose;

    this.base = { sucrose }; // Base arguments for event

    /* Build each event */
    for (const name of readdirSync(`./${dir}/events`)) {
      const event = name as keyof ClientEvents;
      if (options.ignores?.includes(event)) continue; // Ignore if this event name is in ignores array

      this.collection.set(event, new Event(event)); // Push event in events array
      this.load(event); // Load this event
    }
  }

  /**
   * Refresh all events
   */
  public refreshALL(): void {
    this.collection.forEach((event) => event.refresh());
  }

  /**
   * Load a event
   * @param name
   */
  private load<K extends keyof ClientEvents>(name: keyof ClientEvents): void {
    const event = this.collection.get(name);

    if (event) {
      this.sucrose.on(name, async (...args) => {
        const content: __event<K> = await import(`../events/${name}/handler.${ext}`);
        content.listener({ ...this.base, args });
      });
    } else throw Error(`[Sucrose] event "${name}" is not register be Events manager`);
  }
}
