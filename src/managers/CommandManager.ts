import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

import GuildCommandManager from './GuildCommandManager';
import BaseCommandManager from './BaseCommandManager';
import { SError } from '../errors';

/**
 * command manager
 * @public
 * @category Managers
 */
export default class CommandManager extends BaseCommandManager {
  /**
   * guild command managers collection
   * @public
   */
  public guilds: Collection<string, GuildCommandManager> = new Collection();

  /**
   * load all global command and build potential guild command manager
   * @internal
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'CommandManager is already build');

    const globalPath = this.options.path;
    if (existsSync(globalPath) && lstatSync(globalPath).isDirectory()) {
      this.collection = new Collection();

      const files = readdirSync(globalPath).filter((file) => lstatSync(path.join(globalPath, file)).isFile() && file.endsWith(`.${this.options.ext}`));

      if (files.length) await this.add(files);
    }

    const guildsPath = path.join(this.options.path, '../guilds');
    if (existsSync(guildsPath) && lstatSync(guildsPath).isDirectory()) {
      const dirs = readdirSync(guildsPath).filter((file) => {
        const p = lstatSync(path.join(guildsPath, file));
        return p.isDirectory();
      });

      await Promise.all(dirs.map(async (dir) => {
        const guildPath = path.join(guildsPath, dir);
        const files = readdirSync(guildPath).filter((file) => {
          const p = lstatSync(path.join(guildPath, file));
          return p.isFile() && file.endsWith(`.${this.options.ext}`);
        });

        this.guilds = new Collection();
        if (!files.length) return;

        const { options } = this;
        options.path = guildPath;

        const manager = new GuildCommandManager(dir, this.sucrose, options);
        await manager.build();

        this.guilds.set(dir, manager);
      }));
    }

    this.builded = true;
  }
}
