import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError } from '../errors';
import BaseCommandManager from './BaseCommandManager';
import Logger from '../services/Logger';

/**
 * guild command manager
 * @category managers
 *
 * @public
 * @example Initialize new GuildCommandManager
 * ```js
 * new GuildCommandManager(sucrose, options);
 * ```
 */
export default class GuildCommandManager
  extends BaseCommandManager
  implements Types.GuildCommandManager {
  /**
   * id of the guild the manager is based on
   * @readonly
   */
  public readonly guildId: Discord.Snowflake;

  public constructor(sucrose: Types.Sucrose, options: Types.GuildCommandManagerOptions) {
    super(sucrose, options);
    this.guildId = options.guildId;
  }

  /**
    * load all guild commands
    */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', `GuildCommandManager "${this.guildId}" is already build`);
    this.builded = true;

    const to = this.path;
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;
    const { env, logging } = this.options;
    this.clear();

    const files = readdirSync(to).filter((file) => {
      const lstat = lstatSync(path.join(to, file));
      return lstat.isFile() && file.endsWith(`.${env.ext}`);
    });

    if (files.length) {
      const loading = logging.loadings ? Logger.loading(files.length) : null;
      if (loading) loading.next();

      let index = 0;
      await Promise.all(files.map(async (file) => {
        await this.add(file);
        if (loading) loading.next({ index: index += 1, message: `load ./${this.guildId}/${file}` });
      }));

      if (loading) Logger.clear();
    }
  }
}
