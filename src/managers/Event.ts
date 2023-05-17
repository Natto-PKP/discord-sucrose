import { existsSync } from 'fs';

/* Types */
import Discord from 'discord.js';
import type Types from '../../typings';

import { SucroseError } from '../errors';
import FolderService from '../services/FolderService';
import { SucroseConditionError } from '../errors/SConditionError';
import ConditionService from '../services/ConditionService';

export default class Event<E extends Types.EventNames = Types.EventNames>
implements Types.Event<E> {
  public disabled = false;

  private listener: ((...args: Discord.ClientEvents[E]) => Promise<void>) | null = null;

  public readonly manager: Types.EventManager;

  public modules: Discord.Collection<string, Types.EventModule<E>> = new Discord.Collection();

  public directory: Types.DirectoryValue<true>;

  public constructor(public readonly name: E, private options: Types.EventOptions) {
    this.manager = options.sucrose.events;
    this.directory = options.directory;
  }

  /**
   * active this event - search et load event handler in your files and run event listener
   */
  public async listen(): Promise<this> {
    // # disabled event can't be listen
    if (this.disabled) throw new SucroseError('ERROR', `event "${this.name}" is disabled`);

    // # event is already listen
    if (this.listener) throw new SucroseError('ERROR', `event "${this.name}" already hare listener`);

    // # event folder don't exist
    if (!existsSync(this.directory.path)) throw new SucroseError('ERROR', `events directory of "${this.name}" does not exist`);

    // # get all module files path
    const files = FolderService.search({
      path: this.directory.path,
      filter: { type: 'file', ext: this.options.env.ext },
      depth: this.directory.depth,
    });

    // # loop on all file of the event folder
    await Promise.all(files.map(async (file) => {
      const mdl = await FolderService.load(file, 'handler') as Types.EventModule<E>;
      if (!mdl.label) throw new SucroseError('ERROR', `a module in event "${this.name}" don't have a label`);
      if (this.modules.has(mdl.label)) throw new SucroseError('ERROR', `module "${mdl.label}" in event "${this.name}" is already in the collection`);
      this.modules.set(mdl.label, mdl);
    }));

    const { sucrose } = this.options;

    // # define event listener
    const listener = async (...args: Discord.ClientEvents[E]) => {
      await Promise.allSettled(this.modules.map(async (mdl) => {
        if (mdl.disabled) return;

        // # event module conditions
        if (mdl.conditions) {
          const { conditions } = mdl;
          const alright = await ConditionService.isAlright({ args, sucrose, conditions });
          if (!alright) throw new SucroseConditionError(`custom error failed on module "${mdl.label}" on event "${this.name}"`, conditions);
        }

        if (mdl.hooks?.beforeExecute) await mdl.hooks.beforeExecute({ args, sucrose });
        if (mdl.exec) await mdl.exec({ args, sucrose });
        if (mdl.hooks?.afterExecute) await mdl.hooks.afterExecute({ args, sucrose });
      }));
    };

    // # check if this listener is not active
    if (this.options.sucrose.listeners(this.name).includes(listener)) throw new SucroseError('ERROR', `event "${this.name}" listener already active`);

    // # listen this event
    this.options.sucrose.on(this.name, listener);

    // # save event listener
    this.listener = listener;

    return this;
  }

  /**
   * disable this event
   */
  public async mute(): Promise<this> {
    // # disabled event can't be mute
    if (this.disabled) throw new SucroseError('ERROR', 'event disabled');

    // # event is already mute
    if (!this.listener) throw new SucroseError('ERROR', 'event does not have a listener');

    // # remove event listener
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
    this.manager.remove(this.name);
    this.disabled = true;
  }
}
