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
 * button interaction manager
 * @public
 * @category Managers
 */
export default class ButtonInteractionManager {
  /**
   * collection of buttons
   */
  public collection: Discord.Collection<string, Types.ButtonData> = new Collection();

  /**
   * @internal
   */
  constructor(private options: { ext: 'js' | 'ts'; path: string; }) {}

  /**
   * upload the files to add your buttons to the collection
   *
   * @param files - string or string array of files to load
   *
   * @example
   * await buttons.add(["useme.ts", "google.ts"]);
   * await buttons.add("useme.ts");
   */
  public async add(files: string): Promise<Types.ButtonData>;
  public async add(files: string[]): Promise<Types.ButtonData[]>;
  public async add(files: unknown): Promise<Types.ButtonData | Types.ButtonData[]> {
    if (!Array.isArray(files) && typeof files !== 'string') throw STypeError('files', 'string or string[]', files);

    const names: string[] = Array.isArray(files) ? files : [files];
    const results = <Types.ButtonData[]>[];

    // ? loop all files
    await Promise.all(names.map(async (file) => {
      const to = path.join(this.options.path, file);

      if (!existsSync(to)) throw SError('ERROR', `button file "${to}" does not exist`);
      if (!lstatSync(to).isFile()) throw SError('ERROR', `button file "${to}" is not a file`);

      const button = <Types.ButtonData> await helpers.imported(path.join(process.cwd(), to), 'button');
      validations.button(button);

      button.path = to;

      if ('url' in button.data) {
        const { url } = button.data;
        if (this.collection.has(url)) throw SError('ERROR', `url button "${url}" already exists in collection`);
        this.collection.set(url, button);
      } else {
        const { customId } = button.data;
        if (this.collection.has(customId)) throw SError('ERROR', `button "${customId}" already exists in collection`);
        this.collection.set(customId, button);
      }

      results.push(button);
    })); // [end] loop all files

    return Array.isArray(files) ? results : results[0];
  }

  /**
   * refresh one or more button (remove() and add())
   *
   * @param names - name or names array of button to refresh
   *
   * @example
   * await buttons.refresh(["useme", "google"]);
   * await buttons.refresh("useme");
   */
  public async refresh(names: string): Promise<Types.ButtonData>;
  public async refresh(names: string[]): Promise<Types.ButtonData[]>;
  public async refresh(names: unknown): Promise<Types.ButtonData | Types.ButtonData[]> {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);
    const buttons = Array.isArray(names) ? names : [names];

    return Promise.all(buttons.map((name) => {
      const button = this.collection.get(name);
      if (!button) throw SError('ERROR', `button "${name}" not exist`);
      this.remove(name);
      return this.add(path.basename(button.path));
    }));
  }

  /**
   * remove one or more button
   *
   * @param names - name or names array of button to remove
   *
   * @example
   * await buttons.remove(["useme", "google"]);
   * await buttons.remove("useme");
   */
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    if (Array.isArray(names)) names.forEach((name) => this.collection.delete(name));
    else this.collection.delete(names);
  }
}
