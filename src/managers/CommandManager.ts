import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

import GuildCommandManager from './GuildCommandManager';
import BaseCommandManager from './BaseCommandManager';
import { SError } from '../errors';
import { Logger } from '../api.doc';

/**
 * command manager
 * @public
 * @category Managers
 */
export default class CommandManager extends BaseCommandManager {
  /**
   * guild command managers collection
   */
  public guilds: Collection<string, GuildCommandManager> = new Collection();

  /**
   * load all global command and build potential guild command manager
   * @internal
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'CommandManager is already build');
    this.builded = true;

    const globalPath = this.options.path;
    if (existsSync(globalPath) && lstatSync(globalPath).isDirectory()) {
      this.collection = new Collection();

      const files = readdirSync(globalPath).filter((file) => lstatSync(path.join(globalPath, file)).isFile() && file.endsWith(`.${this.options.ext}`));

      if (files.length) {
        const loading = Logger.loading(files.length);
        loading.next();

        for await (const file of files) {
          const index = files.indexOf(file) + 1;
          loading.next({ index, message: `load /commands/global/${file}` });
          await this.add(file);
        }

        Logger.clear();
        Logger.give('SUCCESS', `${files.length} global commands loaded`);
      }
    }

    const guildsPath = path.join(this.options.path, '../guilds');
    if (existsSync(guildsPath) && lstatSync(guildsPath).isDirectory()) {
      const dirs = readdirSync(guildsPath).filter((file) => {
        const p = lstatSync(path.join(guildsPath, file));
        return p.isDirectory();
      });

      if (dirs.length) {
        this.guilds = new Collection();

        for await (const dir of dirs) {
          const guildPath = path.join(guildsPath, dir);
          const files = readdirSync(guildPath).filter((file) => {
            const p = lstatSync(path.join(guildPath, file));
            return p.isFile() && file.endsWith(`.${this.options.ext}`);
          });

          if (files.length) {
            const { options } = this;
            options.path = guildPath;

            const manager = new GuildCommandManager(dir, this.sucrose, options);
            await manager.build();

            this.guilds.set(dir, manager);
          }
        }

        if (this.guilds.size) {
          const total = this.guilds.reduce((acc, cmds) => acc + cmds.collection.size, 0);
          if (total) Logger.give('SUCCESS', `${total} guilds commands loaded (${this.guilds.size} guilds)`);
        }
      }
    }
  }
}
