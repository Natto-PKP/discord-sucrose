import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

import type Types from '../../typings';

import Logger from '../services/Logger';
import { SError } from '../errors';
import { imported } from '../helpers';

/**
 * Base structure for basic discord.js interaction
 * @category managers
 *
 * @public
 * @example Initialize new BaseInteractionManager
 * ```js
 * new BaseInteractionManager(options);
 * ```
 */
export default class BaseInteractionManager<T extends Types.InteractionData = Types.InteractionData>
  extends Collection<string, T> implements Types.BaseInteractionManager {
  /**
   * Define if this manager is builded or not
   * @internal
   * @defaultValue false
   */
  private builded = false;

  /**
   * Define interactions directory
   */
  public path: string;

  constructor(private options: Types.BaseInteractionManagerOptions) {
    super();

    this.path = options.directory;
  }

  /**
   * Build this interaction manager
   */
  public async build() {
    const { env, name, logging } = this.options;

    if (this.builded) throw SError('ERROR', `${this.options.name} is already builded`);
    this.builded = true;

    if (!existsSync(this.path) || !lstatSync(this.path).isDirectory()) return;

    const files = readdirSync(this.path).filter((file) => {
      const isFile = lstatSync(path.join(this.path, file)).isFile();
      const extFile = file.endsWith(`.${env.ext}`);
      return isFile && extFile;
    });

    this.clear();

    if (!files.length) throw SError('WARN', `${name} interaction directory is empty`);
    const loading = logging?.loadings ? Logger.loading(files.length) : null;
    if (loading) loading.next();

    for await (const file of files) {
      const index = files.indexOf(file) + 1;
      if (loading) loading.next({ index, message: `load /interactions/${name}s/${file}` });

      const to = path.join(this.path, file);
      const interaction = await imported(to, name) as T;
      interaction.path = to;

      if ('url' in interaction.body) this.set(interaction.body.url, interaction);
      else if ('customId' in interaction.body) this.set(interaction.body.customId, interaction);
      else if ('command' in interaction.body) {
        let key = interaction.body.command;
        if (interaction.body.group) key += `-${interaction.body.group}`;
        if (interaction.body.option) key += `-${interaction.body.option}`;
        this.set(key, interaction);
      }
    }

    if (loading) Logger.clear();
    Logger.give('SUCCESS', `${files.length} ${name}s loaded`);
    if (logging?.details) Logger.table(this.map((v, k) => ({ name: k, path: v.path })));
  }

  /**
   * Delete and set an existing interaction
   * @param name
   *
   * @example
   * ```js
   * manager.refresh('interaction-name');
   * ```
   *
   * @returns
   */
  public async refresh(name: string): Promise<this> {
    const { options } = this;
    const interaction = this.get(name);
    if (!interaction) throw SError('ERROR', `"${name}" ${options.name} interaction not exist in collection`);
    if (!existsSync(interaction.path)) throw SError('ERROR', `"${name}" ${options.name} interaction file no longer exist`);
    const newInteraction = await imported(interaction.path, options.name) as T;

    this.delete(name);
    this.set(name, newInteraction);

    return this;
  }
}
