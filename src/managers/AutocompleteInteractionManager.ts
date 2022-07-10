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
 * autocomplete interaction manager
 * @public
 * @category Managers
 */
export default class AutocompleteInteractionManager {
  /**
   * collection of form modal
   */
  public collection: Discord.Collection<string, Types.AutocompleteData> = new Collection();

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
   * await autocompletes.add(["command.ts", "command-option.ts"]);
   * await autocompletes.add("command.ts");
   */
  public async add(files: string): Promise<Types.AutocompleteData>;
  public async add(files: string[]): Promise<Types.AutocompleteData[]>;
  public async add(files: unknown): Promise<Types.AutocompleteData | Types.AutocompleteData[]> {
    if (!Array.isArray(files) && typeof files !== 'string') throw STypeError('files', 'string or string[]', files);

    const names: string[] = Array.isArray(files) ? files : [files];
    const results = <Types.AutocompleteData[]>[];

    // ? loop all files
    await Promise.all(names.map(async (file) => {
      const to = path.join(this.options.path, file);

      if (!existsSync(to)) throw SError('ERROR', `autocomplete file "${to}" does not exist`);
      if (!lstatSync(to).isFile()) throw SError('ERROR', `autocomplete file "${to}" is not a file`);

      const autocomplete = <Types.AutocompleteData> await helpers.imported(path.join(process.cwd(), to), 'autocomplete');
      validations.autocomplete(autocomplete);

      autocomplete.path = to;
      const { command, option } = autocomplete.body;

      if (option) {
        if (this.collection.has(`${command}-${option}`)) throw SError('ERROR', `autocomplete "${command}-${option}" already exists in collection`);
        this.collection.set(`${command}-${option}`, autocomplete);
      } else {
        if (this.collection.has(command)) throw SError('ERROR', `autocomplete "${command}" already exists in collection`);
        this.collection.set(command, autocomplete);
      }

      results.push(autocomplete);
    })); // [end] loop all files

    return Array.isArray(files) ? results : results[0];
  }

  /**
   * refresh one or more autocomplete (remove() and add())
   *
   * @param names - name or names array of autocomplete to refresh
   *
   * @example
   * await autocompletes.refresh(["command", "command-option"]);
   * await autocompletes.refresh("command");
   */
  public async refresh(names: string): Promise<Types.AutocompleteData>;
  public async refresh(names: string[]): Promise<Types.AutocompleteData[]>;
  public async refresh(names: unknown): Promise<Types.AutocompleteData | Types.AutocompleteData[]> {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);
    const autocompletes = Array.isArray(names) ? names : [names];

    return Promise.all(autocompletes.map((name) => {
      const autocomplete = this.collection.get(name);
      if (!autocomplete) throw SError('ERROR', `autocomplete "${name}" not exist`);
      this.remove(name);
      return this.add(path.basename(autocomplete.path));
    }));
  }

  /**
   * remove one or more autocomplete
   *
   * @param names - name or names array of autocomplete to remove
   *
   * @example
   * await autocompletes.remove(["command", "command-option"]);
   * await autocompletes.remove("command");
   */
  public remove(names: string): void;
  public remove(names: string[]): void;
  public remove(names: unknown): void {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    if (Array.isArray(names)) names.forEach((name) => this.collection.delete(name));
    else this.collection.delete(names);
  }
}
