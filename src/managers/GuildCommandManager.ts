import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Types from '../../typings/index';

import { SError } from '../errors';
import BaseCommandManager from './BaseCommandManager';

/**
 * Guild command manager
 */
export default class GuildCommandManager extends BaseCommandManager implements Types.GuildCommandManager {
  /**
   * Guild id
   */
  public readonly guildId: string;

  public constructor(guildId: string, sucrose: Types.Sucrose, options: Types.CommandManagerOptions) {
    super(sucrose, options);

    this.guildId = guildId;
  }

  /**
   * Build all guild command
   * @returns
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', `GuildCommandManager "${this.guildId}" is already build`);

    const to = this.options.path;
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;
    this.collection = new Collection();

    const files = readdirSync(to).filter((file) => {
      return lstatSync(path.join(to, file)).isFile() && file.endsWith(`.${this.options.env.ext}`);
    });

    if (files.length) await this.add(files);
    this.builded = true;
  } // [end] build()
}
