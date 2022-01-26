import { ApplicationCommandManager } from 'discord.js';
import { readdirSync, lstatSync, existsSync } from 'fs';
import path from 'path';

import { Logger } from '../services/logger';
import { Collection } from '../utils/Collection';
import { stringProgressBar } from '../utils/stringProgressBar';
import { SError, STypeError } from '../services/errors';

/* Types */
import type Types from '../../typings';
import type { SubCommandData } from '../../typings';

export class CommandManager extends ApplicationCommandManager implements Types.CommandManager {
  public global: Types.Collection<string, Types.CommandData> = new Collection();
  public guilds: Types.Collection<string, Types.Collection<string, Types.CommandData>> = new Collection();

  public constructor(sucrose: Types.Sucrose, private options: Types.CommandManagerOptions) {
    super(sucrose);
  }

  /**
   * Add command in collection
   * @param files
   * @param guildId
   * await add([ 'command.ts', 'hello.ts' ])
   * await add([ 'command.ts', 'hello.ts' ], '01234566789021244')
   * await add('hello.ts')
   * await add('hello.ts', '01234566789021244')
   */
  public async add(files: string[], guildId?: string): Promise<Types.CommandData[]>;
  public async add(files: string, guildId?: string): Promise<Types.CommandData>;
  public async add(files: unknown, guildId?: unknown): Promise<Types.CommandData[] | Types.CommandData> {
    if (typeof files !== 'string' || (Array.isArray(files) && files.some((f) => typeof f !== 'string')))
      throw STypeError('files', 'string or string[]', files);
    if (typeof guildId !== 'string') throw STypeError('guildId', 'string', guildId);

    const results = <Types.CommandData[]>[];
    const errors = <Error[]>[];

    // ? loop all command files
    for (const file of Array.isArray(files) ? files : [files]) {
      const to = path.join(this.options.path, guildId ? 'guilds/' + guildId : 'global', file);
      const command = <Types.CommandData>(await import(path.join(to, file))).default;
      command.path = path.join(to, file);

      // ! chat imput
      if (!command.body.type || command.body.type === 'CHAT_INPUT') {
        const parent = <Types.ChatInputData>command;
        const folder = path.join(to, parent.body.name);

        // ! sub command groups or sub commands
        if (existsSync(folder) && lstatSync(folder).isDirectory()) {
          const files = readdirSync(folder).filter((f) => lstatSync(path.join(folder, f)).isFile());
          if (!files.length) throw new SucroseError('WARN', 'COMMAND_MANAGER_SUB_FOLDER_EMPTY');

          // # define options objects
          parent.body.options = [];
          parent.options = new Collection();

          // ? loop all group folders or sub command files
          const errors = <Error[]>[];
          for (const file of files) {
            try {
              const optionPath = path.join(folder, file);
              const option = <Types.CommandOptionData>(await import(optionPath)).default;
              option.path = optionPath;

              // ! sub command group
              if (option.option.type === 'SUB_COMMAND_GROUP') {
                const group = <Types.SubCommandGroupData>option;
                const groupPath = path.join(folder, group.option.name);
                if (!existsSync(groupPath) || !lstatSync(groupPath).isDirectory())
                  throw new SucroseError('WARN', 'COMMAND_MANAGER_MISSING_GROUP_FOLDER');

                const files = readdirSync(groupPath).filter((f) => lstatSync(path.join(groupPath, f)).isFile());
                if (!files.length) throw new SucroseError('WARN', 'COMMAND_MANAGER_SUB_FOLDER_EMPTY');

                // # define
                group.option.options = [];
                group.options = new Collection();
                group.parent = parent.body.name;

                // ? loop all group sub command files
                const subErrors = <Error[]>[];
                for (const file of files) {
                  try {
                    const subPath = path.join(groupPath, file);
                    const sub = <Types.SubCommandData>(await import(subPath)).default;

                    sub.path = subPath;
                    sub.parent = group.option.name;
                    group.option.options.push(sub.option);
                    group.options.set(sub.option.name, sub);
                  } catch (error) {
                    if (error instanceof Error) subErrors.push(error);
                  }
                } // [end] loop all group sub command files

                if (subErrors.length) throw subErrors;
              } // [end] sub command group
              // ! sub command
              else if (option.option.type === 'SUB_COMMAND') {
                const sub = <SubCommandData>option;
                parent.body.options.push(sub.option);
                parent.options.set(sub.option.name, sub);
              } // [end] sub command
            } catch (error) {
              if (error instanceof Error) errors.push(error);
            }

            if (errors.length) throw errors.flat(1);
          } // [end] loop all group folders or sub command files
        } // [end] sub command groups or sub commands
      } // [end] chat input

      // ! set command in guild collection
      if (guildId) {
        const gcommands = this.guilds.get(guildId) || new Collection();
        gcommands.set(command.body.name, command);
        if (!this.guilds.get(guildId)) this.guilds.set(guildId, gcommands);
      } // [end] set command in guild collection
      // ! set command in collection
      else this.global.set(command.body.name, command);
    } // [end] loop all command files

    if (errors.length) throw Array.isArray(files) ? errors : errors[0];
    return Array.isArray(files) ? results : results[0];
  }

  /**
   * Build and add all commands
   * @returns
   */
  public async build(): Promise<void> {
    // ! global commands
    this.global = new Collection();
    const toGlobal = path.join(this.options.path, 'global');
    if (existsSync(toGlobal)) {
      const files = readdirSync(toGlobal).filter((f) => lstatSync(path.join(toGlobal, f)).isFile());
      if (!files.length) return;

      const cache = { errors: <Error[]>[], i: 0 };
      const content = () => `${stringProgressBar(cache.i, files.length)} ${cache.i}/${files.length} commands processed`;
      const loading = new Logger.loading(content());

      // ? loop all global command files
      for await (const file of files) {
        try {
          await this.add(file);

          loading.content = content();
          cache.i += 1;
        } catch (err) {
          if (err instanceof Error) cache.errors.push(err);
          if (Array.isArray(err)) cache.errors.push(...err);
        }
      } // [end] loop all global command files

      loading.clear();

      if (cache.i) Logger.log(`${cache.i} global commands loaded`, 'SUCCESS', 'COMMAND_MANAGER');
      if (cache.errors.length) throw cache.errors;
    } // [end] global commands

    // ! guilds commands
    this.guilds = new Collection();
    const toGuilds = path.join(this.options.path, 'guilds');
    if (existsSync(toGuilds)) {
      const dirs = readdirSync(toGuilds).filter((d) => lstatSync(path.join(toGuilds, d)).isDirectory());
      if (!dirs.length) return;

      const cache = { errors: <Error[]>[], i: 0, g: 0, commands: 0 };
      const content = () =>
        `${stringProgressBar(cache.g, dirs.length)} ${cache.g}/${dirs.length} guild commands processed`;
      const loading = new Logger.loading(content());

      // ? loop all guilds command dirs
      for await (const dir of dirs) {
        try {
          const toGuild = path.join(toGuilds, dir);
          const files = readdirSync(toGuild).filter((f) => lstatSync(path.join(toGuild, f)));
          if (!files.length) continue;

          //? loop all guild command files
          for await (const file of files) {
            try {
              await this.add(file, dir);

              cache.i += 1;
            } catch (err) {
              if (err instanceof Error) cache.errors.push(err);
              if (Array.isArray(err)) cache.errors.push(...err);
            }
          } // [end] Loop all guild command files

          cache.commands += cache.i;
          cache.i = 0;
          cache.g += 1;

          loading.content = content();
        } catch (err) {
          if (err instanceof Error) cache.errors.push(err);
          if (Array.isArray(err)) cache.errors.push(...err);
        }
      } // [end] loop all guilds command dirs

      loading.clear();

      if (cache.i) Logger.log(`${cache.commands} commands of ${cache.g} guilds loaded`, 'SUCCESS', 'COMMAND_MANAGER');
      if (cache.errors.length) throw cache.errors;
    } // [end] guilds commands
  }

  /**
   * Remove and add command for refresh content
   * @param names
   * @param guildId
   * @example
   * await refresh([ 'command.ts', 'hello.ts' ])
   * await refresh([ 'command.ts', 'hello.ts' ], '01234566789021244')
   * await refresh('hello.ts')
   * await refresh('hello.ts', '01234566789021244')
   */
  public async refresh(names: string[], guildId?: string): Promise<Types.CommandData[]>;
  public async refresh(names: string, guildId?: string): Promise<Types.CommandData>;
  public async refresh(names: unknown, guildId?: unknown): Promise<Types.CommandData[] | Types.CommandData> {
    if (typeof names !== 'string' || (Array.isArray(names) && names.some((f) => typeof f !== 'string')))
      throw STypeError('files', 'string or string[]', names);
    if (typeof guildId !== 'string') throw STypeError('guildId', 'string', guildId);

    // # get commands collection
    const commands = guildId ? this.guilds.get(guildId) : this.global;
    if (!commands) throw SError('ERROR', 'COMMAND_MANAGER_MISSING_COLLECTION');

    const results = <Types.CommandData[]>[];
    const errors = <Error[]>[];

    // ? loop all command names
    for await (const name of names) {
      try {
        const command = commands.get(name);
        if (!command) continue;

        this.remove(name, guildId);
        results.push(await this.add(path.basename(command.path)));
      } catch (err) {
        if (err instanceof Error) errors.push(err);
        if (Array.isArray(err)) errors.push(...err);
      }
    } // [end] loop all command names

    if (errors.length) throw Array.isArray(names) ? errors : errors[0];
    return Array.isArray(names) ? results : results[0];
  }

  /**
   * Remove command to commands collection
   * @param names
   * @param guildId
   * @example
   * remove([ 'command.ts', 'hello.ts' ])
   * remove([ 'command.ts', 'hello.ts' ], '01234566789021244')
   * remove('hello.ts')
   * remove('hello.ts', '01234566789021244')
   */
  public remove(names: string[], guildId?: string): void;
  public remove(names: string, guildId?: string): void;
  public remove(names: unknown, guildId?: unknown): void {
    if (typeof names !== 'string' || (Array.isArray(names) && names.some((f) => typeof f !== 'string')))
      throw STypeError('files', 'string or string[]', names);
    if (typeof guildId !== 'string') throw STypeError('guildId', 'string', guildId);

    // # get command collection
    const commands = guildId ? this.guilds.get(guildId) : this.global;
    if (!commands) throw SError('ERROR', 'COMMAND_MANAGER_MISSING_COLLECTION');

    const errors = <Error[]>[];
    for (const name of Array.isArray(names) ? names : [names]) commands.delete(name);

    if (errors.length) throw Array.isArray(names) ? errors : errors[0];
  }
}
