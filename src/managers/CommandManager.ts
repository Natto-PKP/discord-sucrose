import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

import type Discord from 'discord.js';
import GuildCommandManager from './GuildCommandManager';
import BaseCommandManager from './BaseCommandManager';
import { SError } from '../errors';
import Logger from '../services/Logger';

import type Types from '../../typings';

/**
 * commands manager
 * @category managers
 *
 * @public
 * @example Initialize new CommandManager
 * ```js
 * new CommandManager(sucrose, options)
 * ```
 */
export default class CommandManager extends BaseCommandManager implements Types.CommandManager {
  /**
   * GuildCommandManager collection
   */
  public guilds = new Collection<Discord.Snowflake, Types.GuildCommandManager>();

  /**
   * load all global command and build potential guild command manager
   */
  public async build() {
    if (this.builded) throw SError('ERROR', 'CommandManager is already build');
    this.builded = true;

    const { env, logging } = this.options;

    const globalCommandsPath = path.join(this.options.path, 'globals');
    if (existsSync(globalCommandsPath) && lstatSync(globalCommandsPath).isDirectory()) {
      this.clear();

      const files = readdirSync(globalCommandsPath).filter((file) => {
        const lstat = lstatSync(path.join(globalCommandsPath, file));
        const extFile = file.endsWith(`.${env.ext}`);
        return lstat.isFile() && extFile;
      });

      if (files.length) {
        const loading = logging.loadings ? Logger.loading(files.length) : null;
        if (loading) loading.next();

        let index = 0;
        await Promise.all(files.map(async (file) => {
          await this.add(file);
          if (loading) loading.next({ index: index += 1, message: `/commands/global/${file} loaded` });
        }));

        if (loading) Logger.clear();
        Logger.give('SUCCESS', `${files.length} global commands loaded`);
      }
    }

    const guildCommandsPath = path.join(this.options.path, 'guilds');
    if (existsSync(guildCommandsPath) && lstatSync(guildCommandsPath).isDirectory()) {
      this.guilds.clear();

      const guildDirectories = readdirSync(guildCommandsPath).filter((directory) => {
        const lstat = lstatSync(path.join(guildCommandsPath, directory));
        return lstat.isDirectory();
      });

      await Promise.all(guildDirectories.map(async (directory) => {
        const params = { guildId: directory, path: path.join(guildCommandsPath, directory) };
        const manager = new GuildCommandManager(this.sucrose, { ...this.options, ...params });
        await manager.build();
        this.guilds.set(directory, manager);
      }));

      Logger.give('SUCCESS', `guilds commands loaded (${this.guilds.size} guilds)`);
    }
  }
}
