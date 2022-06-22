import { existsSync, lstatSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';
import type Sucrose from './Sucrose';
import type EventManager from '../managers/EventManager';

import { SError, STypeError } from '../errors';
import Logger from '../services/Logger';
import * as helpers from '../helpers';

/**
 * makes it easier to interact with your vents
 * @public
 */
export default class Event<E extends keyof Discord.ClientEvents> {
  /**
   * determines whether the event is running or not
   *
   * @remarks
   * @defaultValue false
   * @internal
   */
  private disabled = false;

  /**
   * event listener
   *
   * @remarks
   * @defaultValue null
   * @internal
   */
  private listener: ((...args: Discord.ClientEvents[E]) => Promise<void>) | null = null;

  /**
   * redirects to the event manager
   *
   * @remarks
   * @readonly
   * @public
   * @see {@link EventManager}
   */
  public readonly manager: EventManager;

  /**
   * create a new event
   *
   * @remarks
   * @public
   *
   * @param name - event name {@link https://discord.js.org/#/docs/discord.js/main/typedef/Events}
   * @param options - event options {@link Types.EventOptions}
   */
  public constructor(public readonly name: E, private options: { sucrose: Sucrose, path: string }) {
    const { sucrose } = options;

    this.manager = sucrose.events;
  }

  /**
   * active this event - search et load event handler in your files and run event listener
   *
   * @remarks
   * @public
   *
   * @returns current event
   *
   * @example
   * await event.listen();
   */
  public async listen(): Promise<this> {
    if (this.disabled) throw SError('ERROR', `event "${this.name}" is disabled`);
    if (this.listener) throw SError('ERROR', `event "${this.name}" already hare listener`);

    const to = this.options.path;
    if (!existsSync(to)) throw SError('ERROR', `event "${this.name}" file no longer exists`);
    if (!lstatSync(to).isFile()) throw SError('ERROR', `event "${this.name}" path is not a file`);

    const handler = <Types.EventHandler<E>> await helpers.imported(path.join(process.cwd(), to), 'handler');
    if (typeof handler !== 'function') throw STypeError('handler', 'function', handler);

    const listener = async (...args: Discord.ClientEvents[E]) => {
      try {
        await handler({ sucrose: this.options.sucrose, args });
      } catch (err) {
        if (err instanceof Error) Logger.error(err);
        else if (Array.isArray(err)) Logger.handle(...err);
        else Logger.give('ERROR', <string>err);
      }
    };

    if (this.options.sucrose.listeners(this.name).includes(listener)) { throw SError('ERROR', `event "${this.name}" listener already active`); }

    this.options.sucrose.on(this.name, listener);
    if (this.name === 'ready') this.options.sucrose.emit('ready', <Discord.Client> this.options.sucrose);

    this.listener = listener;
    return this;
  }

  /**
   * disable this event
   *
   * @remarks
   * @public
   *
   * @returns current event
   *
   * @example
   * await event.mute();
   */
  public async mute(): Promise<this> {
    if (this.disabled) throw SError('ERROR', 'event already disabled');
    if (!this.listener) throw SError('ERROR', 'event does not have a listener');

    this.options.sucrose.removeListener(
      this.name,
       <(...args: unknown[]) => void>(<unknown> this.listener),
    );
    this.listener = null;

    return this;
  }

  /**
   * refresh this event - mute and listen event
   *
   * @remarks
   * @public
   *
   * @returns current event
   *
   * @example
   * await event.refresh();
   */
  public async refresh(): Promise<this> {
    await this.mute();
    await this.listen();

    return this;
  }

  /**
   * remove/delete this event - destroy this event
   *
   * @remarks
   * @public
   *
   * @returns current event
   *
   * @example
   * await event.refresh();
   */
  public async remove(): Promise<void> {
    await this.mute().catch(() => null);
    this.manager.collection.delete(this.name);
    this.disabled = true;
  }
}
