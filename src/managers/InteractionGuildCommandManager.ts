import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError } from '../errors';
import BaseInteractionCommandManager from './BaseInteractionCommandManager';
import Logger from '../services/Logger';

export default class GuildInteractionCommandManager
  extends BaseInteractionCommandManager
  implements Types.GuildInteractionCommandManager {
  public readonly guildId: Discord.Snowflake;

  public constructor(sucrose: Types.Sucrose, options: Types.GuildInteractionCommandManagerOptions) {
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
    const { env } = this.options;
    this.clear();

    const files = readdirSync(to).filter((file) => {
      const lstat = lstatSync(path.join(to, file));
      return lstat.isFile() && file.endsWith(`.${env.ext}`);
    });

    if (files.length) {
      const loading = Logger.loading(files.length);
      loading.next();

      let index = 0;
      await Promise.all(files.map(async (file) => {
        await this.add(file).catch((err) => this.logger.handle(err));
        if (loading) loading.next({ index: index += 1, message: `load ./${this.guildId}/${file}` });
      }));

      if (loading) Logger.clear();
    }
  }
}
