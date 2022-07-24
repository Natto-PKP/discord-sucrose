import { existsSync, lstatSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError, STypeError } from '../errors';
import Logger from '../services/Logger';
import { imported } from '../helpers';

/**
 * Structure for manager our event
 * @category managers
 *
 * @public
 * @example Initialize new Event
 * ```js
 * new Event(options);
 * ```
 */
export default class Event<E extends Types.EventNames = Types.EventNames>
implements Types.Event<E> {
  /**
   * determines whether the event is running or not
   * @readonly
   * @defaultValue false
   */
  public disabled = false;

  /**
   * event listener
   * @internal
   * @defaultValue null
   */
  private listener: ((...args: Discord.ClientEvents[E]) => Promise<void>) | null = null;

  /**
   * redirects to the event manager
   * @readonly
   * @remarks
   * See {@link EventManager}
   */
  public readonly manager: Types.EventManager;

  /**
   * Path to event folder
   */
  public path: string;

  public constructor(public readonly name: E, private options: Types.EventOptions) {
    this.manager = options.sucrose.events;
    this.path = path.join(options.path, '..');
  }

  /**
   * active this event - search et load event handler in your files and run event listener
   *
   * @example
   * ```js
   * await event.listen();
   * ```
   */
  public async listen(): Promise<this> {
    if (this.disabled) throw SError('ERROR', `event "${this.name}" is disabled`);
    if (this.listener) throw SError('ERROR', `event "${this.name}" already hare listener`);

    const to = this.path;
    if (!existsSync(to)) throw SError('ERROR', `event "${this.name}" file no longer exists`);
    if (!lstatSync(to).isFile()) throw SError('ERROR', `event "${this.name}" path is not a file`);

    const handler = await imported(to, 'handler') as Types.EventHandler<E>;
    if (typeof handler !== 'function') throw STypeError('handler', 'function', handler);

    const listener = async (...args: Discord.ClientEvents[E]) => {
      try {
        await handler({ sucrose: this.options.sucrose, args });
      } catch (err) {
        if (err instanceof Error) Logger.handle(err);
        else if (Array.isArray(err)) Logger.handle(...err);
        else Logger.give('ERROR', <string>err);
      }
    };

    if (this.options.sucrose.listeners(this.name).includes(listener)) throw SError('ERROR', `event "${this.name}" listener already active`);

    this.options.sucrose.on(this.name, listener);
    if (this.name === 'ready') this.options.sucrose.emit('ready', <Discord.Client> this.options.sucrose);

    this.listener = listener;
    return this;
  }

  /**
   * disable this event
   *
   * @example
   * ```js
   * await event.mute();
   * ```
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
   * @example
   * ```js
   * await event.refresh();
   * ```
   */
  public async refresh(): Promise<this> {
    await this.mute();
    await this.listen();
    return this;
  }

  /**
   * remove/delete this event - destroy this event
   *
   * @example
   * ```js
   * await event.refresh();
   * ```
   */
  public async remove(): Promise<void> {
    await this.mute().catch(() => null);
    this.manager.delete(this.name);
    this.disabled = true;
  }
}
