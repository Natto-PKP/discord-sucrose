import { existsSync, lstatSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError } from '../errors';
import Logger from '../services/Logger';

export default class Event<E extends keyof Discord.ClientEvents> implements Types.Event {
  private disabled = false;

  private listener: ((...args: Discord.ClientEvents[E]) => Promise<void>) | null = null;

  private sucrose: Types.Sucrose;

  public readonly manager: Types.EventManager;

  /**
   * Create new event
   * @param name
   * @param options
   */
  public constructor(public readonly name: E, private options: Types.EventOptions) {
    const { sucrose } = options;

    this.sucrose = sucrose;
    this.manager = sucrose.events;
  }

  /**
   * Listen/Active this event
   * @returns
   */
  public async listen(): Promise<this> {
    if (this.disabled) throw SError('ERROR', 'event is disabled');

    const to = this.options.path;
    if (!existsSync(to)) throw SError('ERROR', 'event file no longer exists');
    if (!lstatSync(to).isFile()) throw SError('ERROR', 'event path is not a file');

    const handler = <Types.EventHandler<E>>(await import(path.join(process.cwd(), to))).handler;
    const listener = async (...args: Discord.ClientEvents[E]) => {
      try {
        await handler({ sucrose: this.sucrose, args });
      } catch (err) {
        if (err instanceof Error) Logger.error(err);
        else if (Array.isArray(err)) Logger.handle(...err);
        else Logger.give('ERROR', <string>err);
      }
    };

    if (this.sucrose.listeners(this.name).includes(listener)) throw SError('ERROR', 'listener already active');

    this.sucrose.on(this.name, listener);
    this.listener = listener;

    return this;
  } // [end] listen()

  /**
   * Mute/Disable this event
   * @returns
   */
  public async mute(): Promise<this> {
    if (this.disabled) throw SError('ERROR', 'event already disabled');
    if (!this.listener) throw SError('ERROR', 'event does not have a listener');

    this.sucrose.removeListener(this.name, <(...args: unknown[]) => void>(<unknown>this.listener));
    this.listener = null;

    return this;
  } // [end] mute()

  /**
   * Refresh this event
   * @returns
   */
  public async refresh(): Promise<this> {
    await this.mute();
    await this.listen();

    return this;
  } // [end] refresh()

  /**
   * Remove this event
   */
  public async remove(): Promise<void> {
    await this.mute().catch(() => null);
    this.manager.collection.delete(this.name);
    this.disabled = true;
  } // [end] remove()
}
