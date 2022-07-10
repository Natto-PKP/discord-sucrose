import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Sucrose from '../structures/Sucrose';

import { SError } from '../errors';
import BaseCommandManager from './BaseCommandManager';
import { Logger } from '../api.doc';

/**
 * guild command manager
 * @public
 * @category Managers
 */
export default class GuildCommandManager extends BaseCommandManager {
  /**
   * id of the guild the manager is based on
   * @readonly
   */
  public readonly guildId: string;

  /**
   * @internal
   */
  public constructor(guildId: string, sucrose: Sucrose, options: { ext: 'js' | 'ts', path: string }) {
    super(sucrose, options);
    this.guildId = guildId;
  }

  /**
   * load all commands
   * @internal
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', `GuildCommandManager "${this.guildId}" is already build`);
    this.builded = true;

    const to = this.options.path;
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;
    this.collection = new Collection();

    const files = readdirSync(to).filter((file) => lstatSync(path.join(to, file)).isFile() && file.endsWith(`.${this.options.ext}`));

    if (files.length) {
      const loading = Logger.loading(files.length);
      loading.next();

      for await (const file of files) {
        const index = files.indexOf(file) + 1;
        loading.next({ index, message: `load /commands/guilds/${this.guildId}/${file}` });
        await this.add(file);
      }

      Logger.clear();
    }
  }
}
