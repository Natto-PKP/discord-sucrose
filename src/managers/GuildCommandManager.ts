import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Types */
import type Sucrose from '../structures/Sucrose';

import { SError } from '../errors';
import BaseCommandManager from './BaseCommandManager';

export default class GuildCommandManager extends BaseCommandManager {
  /**
   * id of the guild the manager is based on
   * @public
   */
  public readonly guildId: string;

  public constructor(guildId: string, sucrose: Sucrose, options: { ext: 'js' | 'ts', path: string }) {
    super(sucrose, options);
    this.guildId = guildId;
  }

  /**
   * load all commands
   *
   * @remarks
   * @public
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', `GuildCommandManager "${this.guildId}" is already build`);

    const to = this.options.path;
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;
    this.collection = new Collection();

    const files = readdirSync(to).filter((file) => lstatSync(path.join(to, file)).isFile() && file.endsWith(`.${this.options.ext}`));

    if (files.length) await this.add(files);
    this.builded = true;
  }
}
