import { Client, ClientEvents } from 'discord.js';
import { Sucrose } from '../Sucrose';
import { Event, EventData } from '../structures/Event';
import { BaseManager } from './BaseManager';

/**
 * Event manager options
 * @public
 */
export interface EventManagerOptions {
  sucrose?: Sucrose | null;
}

/**
 * Event manager
 * @public
 */
export class EventManager extends BaseManager<Event<any>, EventData<any>> {
  protected override _structure = Event;

  /**
   * @param options - Event manager options
   */
  constructor(private options: EventManagerOptions) {
    super();
  }

  /**
   * Listen to an event
   * @param event - Event to listen to
   */
  public listen(event: Event<any> | EventData<any> | string) {
    if (!this.options.sucrose) throw new Error('cannot listen to event without sucrose client.');
    const e = this.resolve(event);
    if (!e) throw new Error('cannot resolve event.');

    const client = this.options.sucrose as Client;
    const { sucrose } = this.options;

    this.options.sucrose.on(e.event as keyof ClientEvents, (...args) => {
      if (e.execute) e.execute({ client, sucrose, args });
    });
  }

  /**
   * Listen to all events
   */
  public listenAll() {
    if (!this.options.sucrose) throw new Error('cannot listen to all events without sucrose client.');

    const client = this.options.sucrose as Client;
    const { sucrose } = this.options;

    this.collection.forEach((event) => {
      if (event.disabled) return;
      client.on(event.event as keyof ClientEvents, (...args) => {
        if (event.execute) event.execute({ client, sucrose, args });
      });
    });
  }

  /**
   * Mute an event
   * @param event - Event to mute
   */
  public mute(event: Event<any> | EventData<any> | string) {
    if (!this.options.sucrose) throw new Error('cannot mute event without sucrose client.');
    const e = this.resolve(event);
    if (!e) throw new Error('cannot resolve event.');

    const client = this.options.sucrose as Client;
    const { sucrose } = this.options;

    return this.options.sucrose.off(e.event as keyof ClientEvents, (...args) => {
      if (e.execute) e.execute({ client, sucrose, args });
    });
  }

  /**
   * Mute all events
   */
  public muteAll() {
    if (!this.options.sucrose) throw new Error('cannot mute all events without sucrose client.');

    const client = this.options.sucrose as Client;
    const { sucrose } = this.options;

    this.collection.forEach((event) => {
      client.off(event.event as keyof ClientEvents, (...args) => {
        if (event.execute) event.execute({ client, sucrose, args });
      });
    });
  }
}
