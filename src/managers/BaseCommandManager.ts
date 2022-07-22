import { ApplicationCommandOptionType, ApplicationCommandType, Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Typings */
import type Discord from 'discord.js';
import type Types from '../../typings';
import type Sucrose from '../structures/Sucrose';

import { SError, STypeError } from '../errors';
import * as helpers from '../helpers';

/**
 * @public
 * @category Managers
 */
export default class BaseCommandManager {
  /**
   * indicates if this manager was build or not
   * @internal
   * @defaultValue false
   */
  protected builded = false;

  /**
   * collection of commands
   */
  public collection: Discord.Collection<string, Types.CommandData> = new Collection();

  /**
   * @internal
   */
  public constructor(
    protected sucrose: Sucrose,
    protected options: { path: string, ext: 'js' | 'ts' },
  ) {}

  /**
   * load one or more commands
   *
   * @param files - string or string array of files to load
   *
   * @example
   * await manager.add('file.ts');
   * await manager.add(['file.ts', 'another-file.ts']);
   */
  public async add(files: string[]): Promise<Types.CommandData[]>;
  public async add(files: string): Promise<Types.CommandData>;
  public async add(files: unknown): Promise<Types.CommandData[] | Types.CommandData> {
    if (!Array.isArray(files) && typeof files !== 'string') throw STypeError('files', 'string or string[]', files);

    const names: string[] = Array.isArray(files) ? files : [files];
    const results = <Types.CommandData[]>[];

    // loop all files
    await Promise.all(names.map(async (name) => {
      const to = path.join(this.options.path, name);
      if (!existsSync(to)) throw SError('ERROR', 'command file does not exist');
      if (!lstatSync(to).isFile()) throw SError('ERROR', 'command file is not a file');

      const command = <Types.CommandData> await helpers.imported(path.join(process.cwd(), to), 'command');
      command.path = to;

      if (this.collection.has(command.body.name)) throw SError('ERROR', `command "${command.body.name}" already exists in collection`);

      // chat input
      if (!command.body.type || command.body.type === ApplicationCommandType.ChatInput) {
        const parent = <Types.ChatInputData>command;
        const folder = path.join(this.options.path, parent.body.name);
        if (!command.body.description || typeof command.body.description !== 'string') throw STypeError('command.body.description', 'string', command.body.description);

        // sub command groups or sub commands
        if (existsSync(folder) && lstatSync(folder).isDirectory()) {
          const options = readdirSync(folder).filter((f) => {
            const p = lstatSync(path.join(folder, f));
            return p.isFile() && f.endsWith(`.${this.options.ext}`);
          });

          if (!options.length) throw SError('ERROR', `command "${parent.body.name}" has an empty subcommands folder`);

          // # define options objects
          parent.body.options = [];
          parent.options = new Collection();

          // ? loop all group folders or sub command subFiles
          await Promise.all(options.map(async (file) => {
            const optionPath = path.join(folder, file);
            const option = <Types.CommandOptionData> await helpers.imported(path.join(process.cwd(), optionPath), 'option');
            option.path = optionPath;
            option.parent = parent.body.name;

            // sub command group
            if (option.option.type === ApplicationCommandOptionType.SubcommandGroup) {
              const group = <Types.SubCommandGroupData>option;
              const groupPath = path.join(folder, group.option.name);

              if (!existsSync(groupPath)) throw SError('ERROR', `sub command group "${`${parent.body.name} ${group.option.name}`}" folder not exist`);
              if (!lstatSync(groupPath).isDirectory()) throw SError('ERROR', `sub command group "${`${parent.body.name} ${group.option.name}`}" folder is not a folder`);

              const groupFiles = readdirSync(groupPath).filter((f) => {
                const p = lstatSync(path.join(groupPath, f));
                return p.isFile() && f.endsWith(`.${this.options.ext}`);
              });

              if (!groupFiles.length) throw SError('ERROR', 'sub command group has no sub command');

              // # defined options objects
              group.option.options = [];
              group.options = new Collection();

              // loop all group sub command files
              await Promise.all(groupFiles.map(async (groupFile) => {
                const subPath = path.join(groupPath, groupFile);
                const sub = <Types.SubCommandData> await helpers.imported(path.join(process.cwd(), subPath), 'option');
                sub.path = subPath;
                sub.parent = group.option.name;

                // # define sub option on group
                group.option.options?.push(sub.option);
                group.options.set(sub.option.name, sub);
              }));// [end] loop all group sub command files

              // # define group on parent
              parent.body.options?.push(group.option);
              parent.options?.set(group.option.name, group);

              // [end] sub command group
            } else if (option.option.type === ApplicationCommandOptionType.Subcommand) {
              // sub command
              const sub = <Types.SubCommandData>option;

              // # define sub command on parent
              parent.body.options?.push(sub.option);
              parent.options?.set(sub.option.name, sub);
            } // [end] sub command
          })); // [end] loop all group folders or sub command subFiles
        } // [end] sub command groups or sub commands
      } // [end] chat input

      results.push(command);
      this.collection.set(command.body.name, command);
    })); // [end] loop all files

    return Array.isArray(files) ? results : results[0];
  }

  /**
   * create one or more commands in discord api
   *
   * @param names - string or string array of names
   *
   * @example
   * await manager.define('say');
   * await manager.define(['say', 'user']);
   */
  public async define(names: string): Promise<Discord.ApplicationCommand>;
  public async define(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public async define(names: unknown): Promise<Discord.ApplicationCommand
  | Discord.ApplicationCommand[]> {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    const files: string[] = Array.isArray(names) ? names : [names];
    const guildId = 'guildId' in this ? (<{ guildId: string }> this).guildId : undefined;
    const results = <Discord.ApplicationCommand[]>[];

    // ? loop all files
    await Promise.all(files.map(async (name) => {
      const localCommand = this.collection.get(name);
      if (!localCommand) throw SError('ERROR', `command "${name}" not exist`);

      const apiCommand = await this.sucrose.application?.commands.create(
        localCommand.body,
        guildId,
      );

      if (apiCommand) results.push(apiCommand);
    })); // [end] loop all files

    return Array.isArray(files) ? results : results[0];
  }

  /**
   * remove command from discord api
   *
   * @param names - string or string array of names to delete
   *
   * @example
   * await manager.delete('say');
   * await manager.delete(['say', 'user']);
   */
  public async delete(names: string): Promise<Discord.ApplicationCommand>;
  public async delete(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public async delete(names: unknown): Promise<Discord.ApplicationCommand
  | Discord.ApplicationCommand[]> {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    const files: string[] = Array.isArray(names) ? names : [names];
    const guildId = 'guildId' in this ? (<{ guildId: string }> this).guildId : undefined;
    const results = <Discord.ApplicationCommand[]>[];

    // ? loop all files
    await Promise.all(files.map(async (name) => {
      if (!this.collection.has(name)) throw SError('ERROR', `command "${name}" not exist`);
      const apiCommand = await this.sucrose.application?.commands.delete(name, guildId);
      if (apiCommand) results.push(apiCommand);
    })); // [end] loop all files

    return Array.isArray(files) ? results : results[0];
  }

  /**
   * refresh command in local (remove() and add())
   *
   * @param names - string or string array of names to refresh
   *
   * @example
   * await manager.refresh('say');
   * await manager.refresh(['say', 'user']);
   */
  public async refresh(names: string[]): Promise<Types.CommandData[]>;
  public async refresh(names: string): Promise<Types.CommandData>;
  public async refresh(names: unknown): Promise<Types.CommandData[] | Types.CommandData> {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);
    const commands = Array.isArray(names) ? names : [names];

    return Promise.all(commands.map((name) => {
      const command = this.collection.get(name);
      if (!command) throw SError('ERROR', `command "${name}" not exist`);
      this.remove(name);
      return this.add(path.basename(command.path));
    }));
  }

  /**
   * restore command(s) from discord api (delete() and define())
   *
   * @param names - string or string array of names to restore
   *
   * @example
   * await manager.restore('say');
   * await manager.restore(['say', 'user']);
   */
  public async restore(names: string): Promise<Discord.ApplicationCommand>;
  public async restore(names: string[]): Promise<Discord.ApplicationCommand[]>;
  public async restore(names: unknown): Promise<Discord.ApplicationCommand
  | Discord.ApplicationCommand[]> {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    if (Array.isArray(names)) {
      await this.delete(names);
      return this.define(names);
    }

    await this.delete(names);
    return this.define(names);
  }

  /**
   * remove command(s) in local
   *
   * @param names - string or string array of names to remove
   *
   * @example
   * await manager.remove('say');
   * await manager.remove(['say', 'user']);
   */
  public remove(names: string[]): void;
  public remove(names: string): void;
  public remove(names: unknown): void {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    const array = Array.isArray(names) ? names : [names];
    array.forEach((name) => this.collection.delete(name));
  }
}
