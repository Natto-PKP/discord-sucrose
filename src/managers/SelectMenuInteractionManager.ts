import { Collection } from 'discord.js';
import path from 'path';
import { existsSync, lstatSync } from 'fs';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError, STypeError } from '../errors';
import * as helpers from '../helpers';
import * as validations from '../validations';

/**
 * Select menu manager
 */
export default class SelectMenuInteractionManager implements Types.SelectMenuInteractionManager {
  /**
   * Select menu collection
   */
  public collection: Discord.Collection<string, Types.SelectMenuData> = new Collection();

  constructor(private options: Types.InteractionManagerOptions) {}

  /**
   * Add select menu(s)
   * @param files
   * @example
   * await selectMenus.add(['selectme', 'noselectme'])
   * await selectMenus.add('selectme')
   */
  public async add(files: string): Promise<Types.SelectMenuData>;
  public async add(files: string[]): Promise<Types.SelectMenuData[]>;
  public async add(files: unknown): Promise<Types.SelectMenuData | Types.SelectMenuData[]> {
    if (!Array.isArray(files) && typeof files !== 'string') throw STypeError('files', 'string or string[]', files);

    const names: string[] = Array.isArray(files) ? files : [files];
    const results = <Types.SelectMenuData[]>[];

    await Promise.all(names.map(async (file) => {
      const to = path.join(this.options.path, file);
      if (!existsSync(to)) throw SError('ERROR', `button file "${to}" does not exist`);
      if (!lstatSync(to).isFile()) throw SError('ERROR', `button file "${to}" is not a file`);

      const selectMenu = <Types.SelectMenuData> await helpers.imported(path.join(process.cwd(), to), 'interaction');
      validations.selectMenu(selectMenu);

      selectMenu.path = to;

      const { customId } = selectMenu.data;
      if (!customId) throw STypeError('customId', 'string', customId);
      if (this.collection.has(customId)) { throw SError('ERROR', `select menu "${customId}" already exists in collection`); }

      this.collection.set(customId, selectMenu);
      results.push(selectMenu);
    }));

    return Array.isArray(files) ? results : results[0];
  } // [end] add()

  /**
   * Remove and add select menu(s)
   * @param names
   * @example
   * await selectMenus.refresh(['selectme', 'noselectme'])
   * await selectMenus.refresh('selectme')
   */
  public async refresh(names: string): Promise<Types.SelectMenuData>;
  public async refresh(names: string[]): Promise<Types.SelectMenuData[]>;
  public async refresh(names: unknown): Promise<Types.SelectMenuData | Types.SelectMenuData[]> {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);
    const selectMenus = Array.isArray(names) ? names : [names];
    const results = <Types.SelectMenuData[]>[];

    await Promise.all(selectMenus.map(async (name) => {
      const selectMenu = this.collection.get(name);
      if (!selectMenu) throw SError('ERROR', `select menu "${name}" not exist`);
      this.remove(name);
      results.push(await this.add(path.basename(selectMenu.path)));
    }));

    return Array.isArray(names) ? results : results[0];
  } // [end] refresh()

  /**
   * Remove select menu(s)
   * @param names
   * @example
   * await selectMenus.remove(['selectme', 'noselectme'])
   * await selectMenus.remove('selectme')
   */
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    if (Array.isArray(names)) names.forEach((name) => this.collection.delete(name));
    else this.collection.delete(names);
  } // [end] remove()
}
