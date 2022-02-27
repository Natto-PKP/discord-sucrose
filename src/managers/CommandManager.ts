import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Typings */
import type Types from '../../typings';

import BaseCommandManager from './BaseCommandManager';
import GuildCommandManager from './GuildCommandManager';
import { SError } from '../errors';

/**
 * Command manager
 */
export default class CommandManager extends BaseCommandManager implements Types.CommandManager {
  public guilds: Collection<string, Types.GuildCommandManager> = new Collection();

  /**
   * Build all global command
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'CommandManager is already build');

    const globalPath = path.join(this.options.path, 'global');
    if (existsSync(globalPath) && lstatSync(globalPath).isDirectory()) {
      this.collection = new Collection();

      const files = readdirSync(globalPath).filter((file) => {
        return lstatSync(path.join(globalPath, file)).isFile() && file.endsWith(`.${this.options.env.ext}`);
      });

      if (files.length) await this.add(files);
    }

    const guildsPath = path.join(this.options.path, 'guilds');
    if (existsSync(guildsPath) && lstatSync(guildsPath).isDirectory()) {
      const dirs = readdirSync(guildsPath).filter((file) => lstatSync(path.join(guildsPath, file)).isDirectory());

      await Promise.all(
        dirs.map(async (dir) => {
          const guildPath = path.join(guildsPath, dir);
          const files = readdirSync(guildPath).filter((file) => lstatSync(path.join(guildPath, file)).isFile());
          this.guilds = new Collection();
          if (!files.length) return;

          const { options } = this;
          options.path = guildPath;

          const manager = new GuildCommandManager(dir, this.sucrose, options);
          await manager.build();

          this.guilds.set(dir, manager);
        })
      );
    }

    this.builded = true;
  } // [end] build()
}
