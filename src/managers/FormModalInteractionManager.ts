import { Collection } from 'discord.js';
import path from 'path';
import { existsSync, lstatSync } from 'fs';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError, STypeError } from '../errors';
import * as helpers from '../helpers';

/**
 * button interaction manager
 * @public
 * @category Managers
 */
export default class FormModalInteractionManager {
  /**
   * collection of form modal
   */
  public collection: Discord.Collection<string, Types.FormData> = new Collection();

  /**
   * @internal
   */
  constructor(private options: { ext: 'js' | 'ts'; path: string; }) {}

  /**
   * upload the files to add your form modal to the collection
   *
   * @param files - string or string array of files to load
   *
   * @example
   * await forms.add(["ticket.ts", "report.ts"]);
   * await forms.add("ticket.ts");
   */
  public async add(files: string): Promise<Types.FormData>;
  public async add(files: string[]): Promise<Types.FormData[]>;
  public async add(files: unknown): Promise<Types.FormData | Types.FormData[]> {
    if (!Array.isArray(files) && typeof files !== 'string') throw STypeError('files', 'string or string[]', files);

    const names: string[] = Array.isArray(files) ? files : [files];
    const results = <Types.FormData[]>[];

    // ? loop all files
    await Promise.all(names.map(async (file) => {
      const to = path.join(this.options.path, file);

      if (!existsSync(to)) throw SError('ERROR', `form modal file "${to}" does not exist`);
      if (!lstatSync(to).isFile()) throw SError('ERROR', `form modal file "${to}" is not a file`);

      const form = <Types.FormData> await helpers.imported(path.join(process.cwd(), to), 'form');
      form.path = to;

      if (this.collection.has(form.data.customId)) throw SError('ERROR', `form modal "${form.data.customId}" already exists in collection`);
      this.collection.set(form.data.customId, form);

      results.push(form);
    })); // [end] loop all files

    return Array.isArray(files) ? results : results[0];
  }

  /**
   * refresh one or more form modal (remove() and add())
   *
   * @param names - name or names array of form to refresh
   *
   * @example
   * await forms.refresh(["ticket", "report"]);
   * await forms.refresh("ticket");
   */
  public async refresh(names: string): Promise<Types.FormData>;
  public async refresh(names: string[]): Promise<Types.FormData[]>;
  public async refresh(names: unknown): Promise<Types.FormData | Types.FormData[]> {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);
    const forms = Array.isArray(names) ? names : [names];

    return Promise.all(forms.map((name) => {
      const form = this.collection.get(name);
      if (!form) throw SError('ERROR', `form modal "${name}" not exist`);
      this.remove(name);
      return this.add(path.basename(form.path));
    }));
  }

  /**
   * remove one or more form modal
   *
   * @param names - name or names array of form to remove
   *
   * @example
   * await forms.remove(["ticket", "report"]);
   * await forms.remove("ticket");
   */
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    if (Array.isArray(names)) names.forEach((name) => this.collection.delete(name));
    else this.collection.delete(names);
  }
}
