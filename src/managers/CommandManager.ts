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

  public constructor(
    sucrose: Types.Sucrose,
    protected override options: Types.CommandManagerOptions,
  ) {
    super(sucrose, options);
  }

  /**
   * load all global command and build potential guild command manager
   */
  public async build() {
    if (this.builded) throw SError('ERROR', 'CommandManager is already build');
    this.builded = true;

    const { env, logging } = this.options;

    if (existsSync(this.path) && lstatSync(this.path).isDirectory()) {
      this.clear();

      const files = readdirSync(this.path).filter((file) => {
        const lstat = lstatSync(path.join(this.path, file));
        const extFile = file.endsWith(`.${env.ext}`);
        return lstat.isFile() && extFile;
      });

      if (files.length) {
        const loading = logging.loadings ? Logger.loading(files.length) : null;
        if (loading) loading.next();

        let index = 0;
        await Promise.all(files.map(async (file) => {
          await this.add(file);
          if (loading) loading.next({ index: index += 1, message: `./${file} loaded` });
        }));

        if (loading) Logger.clear();
        Logger.give('SUCCESS', `${files.length} global commands loaded`);
      }
    }

    const guildsCommandsPath = this.options.directories.guilds;
    if (existsSync(guildsCommandsPath) && lstatSync(guildsCommandsPath).isDirectory()) {
      this.guilds.clear();

      const guildDirectories = readdirSync(guildsCommandsPath).filter((directory) => {
        const lstat = lstatSync(path.join(guildsCommandsPath, directory));
        return lstat.isDirectory();
      });

      await Promise.all(guildDirectories.map(async (directory) => {
        const params = { guildId: directory, directory: path.join(guildsCommandsPath, directory) };
        const manager = new GuildCommandManager(this.sucrose, { ...this.options, ...params });
        await manager.build();
        this.guilds.set(directory, manager);
      }));

      if (this.guilds.size) Logger.give('SUCCESS', `guilds commands loaded (${this.guilds.size} guilds)`);
    }
  }
}
