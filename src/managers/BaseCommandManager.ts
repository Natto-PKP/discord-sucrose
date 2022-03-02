import { Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Typings */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError, STypeError } from '../errors';
import * as helpers from '../helpers';
import * as validations from '../validations';

/**
 * Base command manager
 */
export default class BaseCommandManager implements Types.BaseCommandManager {
  protected builded = false;

  /**
   * commands collection
   */
  public collection: Discord.Collection<string, Types.CommandData> = new Collection();

  public constructor(
    protected sucrose:Types.Sucrose,
    protected options: Types.CommandManagerOptions,
  ) {}

  /**
   * Add new command(s)
   * @param files
   * @example
   * await commands.add(["hello", "avatar"]);
   * await commands.add("hello");
   */
  public async add(files: string[]): Promise<Types.CommandData[]>;
  public async add(files: string): Promise<Types.CommandData>;
  public async add(files: unknown): Promise<Types.CommandData[] | Types.CommandData> {
    if (!Array.isArray(files) && typeof files !== 'string') throw STypeError('files', 'string or string[]', files);

    const names: string[] = Array.isArray(files) ? files : [files];
    const results = <Types.CommandData[]>[];

    // ! loop all files
    await Promise.all(names.map(async (name) => {
      const to = path.join(this.options.path, name);
      if (!existsSync(to)) throw SError('ERROR', 'command file does not exist');
      if (!lstatSync(to).isFile()) throw SError('ERROR', 'command file is not a file');

      const command = <Types.CommandData> await helpers.imported(path.join(process.cwd(), to), 'command');
      validations.command(command, command?.body?.name || 'unknown');

      command.path = to;

      if (this.collection.has(command.body.name)) throw SError('ERROR', `command "${command.body.name}" already exists in collection`);

      // ! chat input
      if (!command.body.type || command.body.type === 'CHAT_INPUT') {
        const parent = <Types.ChatInputData>command;
        const folder = path.join(this.options.path, parent.body.name);
        if (!command.body.description || typeof command.body.description !== 'string') throw STypeError('command.body.description', 'string', command.body.description);

        // ! sub command groups or sub commands
        if (existsSync(folder) && lstatSync(folder).isDirectory()) {
          const options = readdirSync(folder).filter((f) => {
            const p = lstatSync(path.join(folder, f));
            return p.isFile() && f.endsWith(`.${this.options.env.ext}`);
          });

          if (!options.length) throw SError('ERROR', `command "${parent.body.name}" has an empty subcommands folder`);

          // # define options objects
          parent.body.options = [];
          parent.options = new Collection();

          // ? loop all group folders or sub command subFiles
          await Promise.all(options.map(async (file) => {
            const optionPath = path.join(folder, file);
            const option = <Types.CommandOptionData> await helpers.imported(path.join(process.cwd(), optionPath), 'option');
            validations.command(option, `${command.body.name} ${option?.option?.name || 'unknown'}`);

            option.path = optionPath;
            option.parent = parent.body.name;

            // ! sub command group
            if (option.option.type === 'SUB_COMMAND_GROUP') {
              const group = <Types.SubCommandGroupData>option;
              const groupPath = path.join(folder, group.option.name);

              if (!existsSync(groupPath)) throw SError('ERROR', `sub command group "${`${parent.body.name} ${group.option.name}`}" folder not exist`);
              if (!lstatSync(groupPath).isDirectory()) throw SError('ERROR', `sub command group "${`${parent.body.name} ${group.option.name}`}" folder is not a folder`);

              const groupFiles = readdirSync(groupPath).filter((f) => {
                const p = lstatSync(path.join(groupPath, f));
                return p.isFile() && f.endsWith(`.${this.options.env.ext}`);
              });

              if (!groupFiles.length) throw SError('ERROR', 'sub command group has no sub command');

              // # defined options objects
              group.option.options = [];
              group.options = new Collection();

              // ! loop all group sub command files
              await Promise.all(groupFiles.map(async (groupFile) => {
                const subPath = path.join(groupPath, groupFile);
                const sub = <Types.SubCommandData> await helpers.imported(path.join(process.cwd(), subPath), 'option');
                validations.command(option, `${command.body.name} ${option.option.name} ${sub?.option?.name || 'unknown'}`);

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
            } else if (option.option.type === 'SUB_COMMAND') { // ! sub command
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
  } // [end] add()

  /**
   * Give command to discord api
   * @param names
   * @example
   * await commands.define(["hello", "avatar"]);
   * await commands.define("hello");
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
  } // [end] define()

  /**
   * Delete command on discord api
   * @param names
   * @example
   * await commands.delete(["hello", "avatar"]);
   * await commands.delete("hello");
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
  } // [end] delete()

  /**
   * Refresh command(s)
   * @param names
   * @example
   * await commands.refresh(["hello", "avatar"]);
   * await commands.refresh("hello");
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
  } // [end] refresh()

  /**
   * Delete and define command(s) on discord api
   * @param names
   * @example
   * await commands.restore(["hello", "avatar"]);
   * await commands.restore("hello");
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
  } // [end] restore()

  /**
   * Remove command(s)
   * @param names
   * @example
   * commands.remove(["hello", "avatar"]);
   * commands.remove("hello");
   */
  public remove(names: string[]): void;
  public remove(names: string): void;
  public remove(names: unknown): void {
    if (!Array.isArray(names) && typeof names !== 'string') throw STypeError('names', 'string or string[]', names);

    const array = Array.isArray(names) ? names : [names];
    array.forEach((name) => this.collection.delete(name));
  } // [end] remove()
}
