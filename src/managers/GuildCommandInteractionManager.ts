import { existsSync, lstatSync } from 'fs';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SucroseError } from '../errors';
import BaseCommandInteractionManager from './BaseCommandInteractionManager';
import FolderService from '../services/FolderService';

export default class GuildCommandInteractionManager
  extends BaseCommandInteractionManager
  implements Types.GuildCommandInteractionManager {
  public readonly guildId: Discord.Snowflake;

  public constructor(sucrose: Types.Sucrose, options: Types.GuildCommandInteractionManagerOptions) {
    super(sucrose, options);
    this.guildId = options.guildId;
  }

  /**
    * load all guild commands
    */
  public async build(): Promise<void> {
    // # prevent multiple build
    if (this.builded) throw new SucroseError('ERROR', `GuildCommandManager "${this.guildId}" is already build`);
    this.builded = true;

    // # check if path is valid
    const to = this.directory.path; // get path
    if (!existsSync(to) || !lstatSync(to).isDirectory()) return;

    // # get all files from guild folder
    const files = FolderService.search({
      path: to,
      filter: { type: 'file', ext: this.options.env.ext },
      depth: this.options.directory.depth,
      autoExcludeFileOnRecursive: true,
    });

    if (files.length) {
      // # loop all files from guild folder
      const errors = [] as Error[];
      const promises = await Promise.allSettled(files.map(async (file) => {
        const command = await FolderService.load(file, 'interaction') as Types.CommandInteractionData;
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
    }
  }
}
