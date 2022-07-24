import { ApplicationCommandOptionType, ApplicationCommandType, Collection } from 'discord.js';
import { existsSync, lstatSync, readdirSync } from 'fs';
import path from 'path';

/* Typings */
import type Discord from 'discord.js';
import type Types from '../../typings';

import { SError } from '../errors';
import { imported } from '../helpers';

/**
 * Base structure for command manager
 * @category managers
 *
 * @public
 * @example Initialize BaseCommandManager
 * ```js
 * new BaseCommandManager(sucrose, options);
 * ```
 */
export default class BaseCommandManager
  extends Collection<string, Types.CommandData> implements Types.BaseCommandManager {
  protected builded = false;

  /**
   * Define commands directory path
   */
  public path: string;

  public constructor(
    protected sucrose: Types.Sucrose,
    protected options: Types.BaseCommandManagerOptions,
  ) {
    super();

    this.path = options.path;
  }

  /**
   * Load and set a new command
   * @param file
   * @example Add a new command
   * ```js
   * manager.add('command.js')
   * ```
   * @returns
   */
  public async add(file: string): Promise<Types.CommandData> {
    const { options } = this;

    const to = path.join(this.path, file);
    if (!existsSync(to)) throw SError('ERROR', `command file "${file}" does not exist`);
    if (!lstatSync(to).isFile()) throw SError('ERROR', `command file "${file}" is not a file`);
    if (!file.endsWith(`.${options.env.ext}`)) throw SError('ERROR', `command file "${file}" extension is not ${options.env.ext}`);
    const command = await imported(to, 'command') as Types.CommandData;
    command.path = to;

    if (this.has(command.body.name)) throw SError('ERROR', `command "${command.body.name}" already exists in collection`);

    // ? chat input
    if (!command.body.type || command.body.type === ApplicationCommandType.ChatInput) {
      const chatInput = command as Types.ChatInputData;
      const chatInputOptionsPath = path.join(this.path, chatInput.body.name);

      // ? sub command groups or sub commands
      if (existsSync(chatInputOptionsPath) && lstatSync(chatInputOptionsPath).isDirectory()) {
        const chatInputOptions = readdirSync(chatInputOptionsPath).filter((optionFile) => {
          const lstat = lstatSync(path.join(chatInputOptionsPath, optionFile));
          return lstat.isFile() && optionFile.endsWith(`.${options.env.ext}`);
        });

        if (!chatInputOptions.length) throw SError('WARN', `command "${chatInput.body.name}" has an empty subcommands folder`);

        chatInput.body.options = [];
        chatInput.options = new Collection();

        // ? loop all group folders or sub command subFiles
        await Promise.all(chatInputOptions.map(async (optionFile) => {
          const chatInputOptionPath = path.join(chatInputOptionsPath, optionFile);
          const chatInputOption = await imported(chatInputOptionPath, 'option') as Types.ChatInputOptionData;
          chatInputOption.path = chatInputOptionPath;

          if (chatInputOption.body.type === ApplicationCommandOptionType.SubcommandGroup) {
            const chatInputGroup = chatInputOption as Types.ChatInputSubGroupOptionData;
            const chatInputGroupPath = path.join(chatInputOptionsPath, chatInputGroup.body.name);

            if (!existsSync(chatInputGroupPath)) throw SError('ERROR', `sub command group "${`${chatInput.body.name} ${chatInputGroup.body.name}`}" folder not exist`);
            if (!lstatSync(chatInputGroupPath).isDirectory()) throw SError('ERROR', `sub command group "${`${chatInput.body.name} ${chatInputGroup.body.name}`}" folder is not a folder`);

            const chatInputGroupOptions = readdirSync(chatInputGroupPath)
              .filter((groupOptionFile) => {
                const lstat = lstatSync(path.join(chatInputGroupPath, groupOptionFile));
                return lstat.isFile() && groupOptionFile.endsWith(`.${this.options.env.ext}`);
              });

            if (!chatInputGroupOptions.length) throw SError('ERROR', 'sub command group has no sub command');

            // ### defined options objects
            chatInputGroup.body.options = [];
            chatInputGroup.options = new Collection();

            // loop all group sub command files
            await Promise.all(chatInputGroupOptions.map(async (groupOptionFile) => {
              const chatInputGroupOptionPath = path.join(chatInputGroupPath, groupOptionFile);
              const chatInputGroupOption = await imported(chatInputGroupOptionPath, 'option') as Types.ChatInputSubOptionData;
              chatInputGroupOption.path = chatInputGroupOptionPath;

              // ### define sub option on group
              chatInputGroup.body.options?.push(chatInputGroupOption.body);
              chatInputGroup.options.set(chatInputGroupOption.body.name, chatInputGroupOption);
            }));// [end] loop all group sub command files

            // ### define group on parent
            chatInput.body.options?.push(chatInputGroup.body);
            chatInput.options.set(chatInputGroup.body.name, chatInputGroup);

            // [end] sub command group
          } else if (chatInputOption.body.type === ApplicationCommandOptionType.Subcommand) {
            const chatInputSubOption = chatInputOption as Types.ChatInputSubOptionData;

            chatInput.body.options?.push(chatInputSubOption.body);
            chatInput.options?.set(chatInputSubOption.body.name, chatInputSubOption);
          } // [end] sub command
        })); // [end] loop all group folders or sub command subFiles
      } // [end] sub command groups or sub commands
    } // [end] chat input

    this.set(command.body.name, command);

    return command;
  }

  /**
   * Send a existing command in discord api
   * @param name
   * @example Send a command
   * ```js
   * manager.name('commandName')
   * ```
   * @returns
   */
  public async define(name: string): Promise<Discord.ApplicationCommand | null | undefined> {
    const guildId = 'guildId' in this ? (<{ guildId: string }> this).guildId : undefined;

    const command = this.get(name);
    if (!command) throw SError('ERROR', `command "${name}" not exist`);

    return this.sucrose.application?.commands.create(command.body, guildId);
  }

  /**
   * Delete a existing command in discord api
   * @param name
   * @example Delete a command
   * ```js
   * manager.remove('commandName')
   * ```
   * @returns
   */
  public async remove(name: string): Promise<Discord.ApplicationCommand | null | undefined> {
    const guildId = 'guildId' in this ? (<{ guildId: string }> this).guildId : undefined;

    if (!this.has(name)) throw SError('ERROR', `command "${name}" not exist`);
    return this.sucrose.application?.commands.delete(name, guildId);
  }

  /**
   * Delete and add an existing command
   * @param name
   * @example Refresh a command
   * ```js
   * manager.refresh('commandName')
   * ```
   * @returns
   */
  public async refresh(name: string): Promise<Types.CommandData> {
    const command = this.get(name);
    if (!command) throw SError('ERROR', `command "${name}" not exist`);
    this.delete(name);
    return this.add(path.basename(command.path));
  }

  /**
   * Remove and define an existing command
   * @param name
   * @example Restore a command
   * ```js
   * manager.restore('commandName')
   * ```
   * @returns
   */
  public async restore(name: string): Promise<Discord.ApplicationCommand | null | undefined> {
    await this.remove(name);
    return this.define(name);
  }
}
