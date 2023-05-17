import { Collection } from 'discord.js';
import { existsSync, lstatSync } from 'fs';

import type Types from '../../typings';

import { SucroseError } from '../errors';
import Logger from '../services/Logger';
import FolderService from '../services/FolderService';

export default class BaseInteractionManager<T extends Types.InteractionData = Types.InteractionData>
implements Types.BaseInteractionManager<T> {
  public cache: Collection<string, T> = new Collection();

  private builded = false;

  private logger: Logger;

  public directory: Types.DirectoryValue<true>;

  constructor(private options: Types.BaseInteractionManagerOptions) {
    this.directory = options.directory;
    this.logger = new Logger(options.logging);
  }

  /**
   * Build this interaction manager
   */
  public async build() {
    // # prevent multiple builds
    if (this.builded) throw new SucroseError('ERROR', `${this.options.name} is already builded`);
    this.builded = true;

    const { name, directory } = this.options;
    const to = directory.path;

    // # don't go further if path is not valid
    if (!existsSync(this.directory.path) || !lstatSync(to).isDirectory()) return;

    // # get all interaction file
    const files = FolderService.search({ path: to, filter: { type: 'file', ext: this.options.env.ext }, depth: directory.depth });

    // # throw a warn if folder is empty
    if (!files.length) throw new SucroseError('WARN', `${name} interactions directory is empty`);

    // # loop all file
    const errors = [] as Error[];
    const promises = await Promise.allSettled(files.map(async (file) => {
      // # import interaction
      const interaction = await FolderService.load(file, name) as T;
      interaction.path = file; // save path
      this.add(interaction);
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
      this.logger.give('SUCCESS', `${files.length} ${name}s loaded`);
      if (this.options.logging?.details) {
        this.logger.table(this.cache.map((v, k) => ({ name: k, path: v.path })));
      }
    }
  }

  public add(interaction: T): void {
    // # if primary key is an url (ex: url button)
    if ('url' in interaction.body) {
      this.cache.set(interaction.body.url, interaction);

      // # if primary key is customId (ex: message component)
    } else if ('customId' in interaction.body) {
      this.cache.set(interaction.body.customId, interaction);

      // # if primary key is command
    } else if ('command' in interaction.body) {
      let key = interaction.body.command;
      if (interaction.body.group) key += `-${interaction.body.group}`;
      if (interaction.body.option) key += `-${interaction.body.option}`;
      this.cache.set(key, interaction);
    }
  }

  /**
   * Delete and set an existing interaction
   * @param name
   */
  public async refresh(name: string): Promise<this> {
    const { options } = this;
    const interaction = this.cache.get(name); // get interaction
    if (!interaction) throw new SucroseError('ERROR', `"${name}" ${options.name} interaction not exist in collection`);

    // # check if interaction file exist
    if (!existsSync(interaction.path)) throw new SucroseError('ERROR', `"${name}" ${options.name} interaction file no longer exist`);
    const newInteraction = await FolderService.load(interaction.path, options.name) as T; // import

    this.cache.delete(name); // remove interaction from collection
    this.cache.set(name, newInteraction); // set again interaction

    return this;
  }
}
