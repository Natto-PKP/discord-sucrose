import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError } from '../errors';
import Logger from '../services/Logger';
import { imported } from '../helpers';

export default class Event<E extends Types.EventNames = Types.EventNames>
implements Types.Event<E> {
  public disabled = false;

  private listener: ((...args: Discord.ClientEvents[E]) => Promise<void>) | null = null;

  private logger: Logger;

  public readonly manager: Types.EventManager;

  public path: string;

  public constructor(public readonly name: E, private options: Types.EventOptions) {
    this.manager = options.sucrose.events;
    this.path = options.path;
    this.logger = new Logger(options.logging);
  }

  /**
   * active this event - search et load event handler in your files and run event listener
   */
  public async listen(): Promise<this> {
    if (this.disabled) throw SError('ERROR', `event "${this.name}" is disabled`);
    if (this.listener) throw SError('ERROR', `event "${this.name}" already hare listener`);
    if (!existsSync(this.path)) throw SError('ERROR', `events directory of "${this.name}" does not exist`);

    const modules = <Types.EventHandler<E>[]>[];
    await Promise.all(readdirSync(this.path).map(async (mdl) => {
      const toMdl = path.join(this.path, mdl);

      if (lstatSync(toMdl).isDirectory()) {
        if (mdl.startsWith('_')) return;

        await Promise.all(readdirSync(this.path).map(async (subMld) => {
          const toSubMdl = path.join(toMdl, subMld);
          if (!lstatSync(toSubMdl).isFile() || !subMld.endsWith(`.${this.options.env.ext}`)) return;
          const subMldHandler = await imported(toSubMdl, 'handler') as Types.EventHandler<E>;
          if (typeof subMldHandler === 'function') modules.push(subMldHandler);
        }));
      } else if (lstatSync(toMdl).isFile() && toMdl.endsWith(`.${this.options.env.ext}`)) {
        const mdlHandler = await imported(toMdl, 'handler') as Types.EventHandler<E>;
        if (typeof mdlHandler === 'function') modules.push(mdlHandler);
      }
    }));

    const listener = async (...args: Discord.ClientEvents[E]) => {
      await Promise.all(modules.map(async (mdl) => {
        await mdl({ sucrose: this.options.sucrose, args })
          ?.catch((err: Error) => this.logger.handle(err));
      }));
    };

    if (this.options.sucrose.listeners(this.name).includes(listener)) throw SError('ERROR', `event "${this.name}" listener already active`);
    this.options.sucrose.on(this.name, listener);
    this.listener = listener;
    return this;
  }

  /**
   * disable this event
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
   */
  public async refresh(): Promise<this> {
    await this.mute();
    await this.listen();
    return this;
  }

  /**
   * remove/delete this event - destroy this event
   */
  public async remove(): Promise<void> {
    await this.mute().catch(() => null);
    this.manager.delete(this.name);
    this.disabled = true;
  }
}
