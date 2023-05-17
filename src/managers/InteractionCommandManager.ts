import { Collection } from 'discord.js';
import { existsSync, lstatSync } from 'fs';
import path from 'path';

import type Discord from 'discord.js';
import GuildCommandManager from './InteractionGuildCommandManager';
import BaseInteractionCommandManager from './BaseInteractionCommandManager';
import { SucroseError } from '../errors';

import type Types from '../../typings';
import FolderService from '../services/FolderService';

export default class InteractionCommandManager
  extends BaseInteractionCommandManager
  implements Types.InteractionCommandManager {
  public guilds = new Collection<Discord.Snowflake, Types.InteractionGuildCommandManager>();

  public constructor(
    sucrose: Types.Sucrose,
    protected override options: Types.InteractionCommandManagerOptions,
  ) {
    super(sucrose, options);
  }

  /**
   * load all global command and build potential guild command manager
   */
  public async build() {
    // # prevent multiple build
    if (this.builded) throw new SucroseError('ERROR', 'CommandManager is already build');
    this.builded = true;

    // # if command path is valid
    if (existsSync(this.directory.path) && lstatSync(this.directory.path).isDirectory()) {
      // # loop all file in command folder
      const files = FolderService.search({
        path: this.directory.path,
        filter: { type: 'file', ext: this.options.env.ext },
        depth: this.directory.depth,
        autoExcludeFileOnRecursive: true,
      });

      // # if commands exist
      if (files.length) {
        // # loop all file
        const errors = [] as Error[];
        const promises = await Promise.allSettled(files.map(async (file) => {
          const command = await FolderService.load(file, 'interaction') as Types.InteractionCommandData;
          command.path = file;
          await this.add(command);
        }));

        // # get potentials errors
        promises.forEach((promise) => {
          if (promise.status !== 'rejected') return;
          if (promise.reason instanceof Error) errors.push(promise.reason);
          else errors.push(new Error('unknown error'));
        });

        // # handle errors
        if (errors.length) this.logger.handle(...errors);

        // # log
        if (this.cache.size) {
          this.logger.give('SUCCESS', `${files.length} global commands loaded`);
          if (this.options.logging.details) {
            const commands = this.cache.map((v, k) => ({ name: k, path: v.path }));
            this.logger.table(commands);
          }
        }
      }
    }

    // # same for guild commands
    const guildsCommandsPath = this.options.directories.guilds.path;
    if (existsSync(guildsCommandsPath) && lstatSync(guildsCommandsPath).isDirectory()) {
      // # get guilds folder
      const folders = FolderService.search({ path: guildsCommandsPath, filter: { type: 'folder', ext: this.options.env.ext }, nameOnly: true });

      // # loop all guild folder
      const errors = [] as Error[];
      const promises = await Promise.allSettled(folders.map((folder) => {
        // eslint-disable-next-line no-async-promise-executor
        const promise = new Promise(async (resolve, reject) => {
          try {
            // # build new manager for each guild
            const params = {
              guildId: folder,
              directory: {
                path: path.join(guildsCommandsPath, folder),
                depth: this.options.directories.guilds.depth,
              },
            };

            const manager = new GuildCommandManager(this.sucrose, { ...this.options, ...params });
            await manager.build();
            this.guilds.set(folder, manager); // add guild to guilds collection
            resolve(true);
          } catch (err) {
            reject(err);
          }
        });

        return promise;
      }));

      // # get potentials errors
      promises.forEach((promise) => {
        if (promise.status !== 'rejected') return;
        if (promise.reason instanceof Error) errors.push(promise.reason);
        else errors.push(new Error('unknown error'));
      });

      // # handle errors
      if (errors.length) this.logger.handle(...errors);

      // # log
      if (this.guilds.size) {
        const guildCommandSize = this.guilds.reduce((acc, val) => acc + val.cache.size, 0);
        if (guildCommandSize) this.logger.give('SUCCESS', `${guildCommandSize} guild commands loaded (${this.guilds.size} guilds)`);
      }
    }
  }
}
