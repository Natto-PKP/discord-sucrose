import { existsSync, lstatSync } from 'fs';

import { SError } from '../services/errors';
import { Logger } from '../services/logger';

/* Types */
import type Types from '../../typings';
import type Discord from 'discord.js';

export class Event<E extends keyof Discord.ClientEvents> implements Types.Event {
  private disabled = false;
  private listener: ((...args: Discord.ClientEvents[E]) => Promise<void>) | null = null;
  private sucrose: Types.Sucrose;

  public readonly manager: Types.EventManager;

  public constructor(public readonly name: E, private options: Types.EventOptions) {
    const { sucrose } = options;

    this.sucrose = sucrose;
    this.manager = sucrose.events;
  }

  /**
   * Listen/Active this event
   */
  public async listen(): Promise<Types.Event<E>> {
    if (this.disabled) throw SError('ERROR', 'EVENT_DISABLED');
    const to = this.options.path;
    if (!existsSync(to) || !lstatSync(to).isFile()) throw SError('ERROR', 'EVENT_MISSING_HANDLER');

    const handler = <Types.EventHandler<E>>(await import(to)).default;
    const listener = async (...args: Discord.ClientEvents[E]): Promise<void> => {
      try {
        await handler({ sucrose: this.sucrose, args });
      } catch (err) {
        if (err instanceof Error || Array.isArray(err)) Logger.handle(err);
      }
    };

    this.sucrose.on(this.name, listener);
    this.listener = listener;

    return this;
  }

  /**
   * Mute/Disable this event
   */
  public async mute(): Promise<Types.Event<E>> {
    if (this.disabled) throw SError('ERROR', 'EVENT_DISABLED');
    if (!this.listener) throw SError('ERROR', 'EVENT_MISSING_LISTENER');
    this.sucrose.removeListener(this.name, <(...args: unknown[]) => void>(<unknown>this.listener));
    this.listener = null;

    return this;
  }

  /**
   * Refresh this event and this listener
   */
  public async refresh(): Promise<Types.Event<E>> {
    if (this.disabled) throw SError('ERROR', 'EVENT_DISABLED');
    await this.mute();
    await this.listen();

    return this;
  }

  /**
   * Remove/Delte this event in collection
   */
  public remove(): void {
    this.manager.collection.delete(this.name);
    this.disabled = true;
  }
}
