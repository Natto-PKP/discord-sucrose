/* Dependencies */
import { existsSync, lstatSync, readdirSync } from 'fs-extra';
import path from 'path';

/* Services */
import { SucroseError, ConsoleLoading, Logger } from '../services/logger';
import { stringProgressBar } from '../services/util';

/* Typings */
import { Sucrose } from '../sucrose';
import Discord from 'discord.js';
import {
  BaseAPICommandOptions,
  BaseLocalCommandOptions,
  Collection,
  CommandData,
  ChatInputData,
  ChatInputOptionData,
  ChatInputSubCommandData,
  ChatInputSubCommandGroupData,
} from '../typings/index';

export class CommandManager {
  /**
   * @property
   * @public
   * @type { Collection<CommandData> }
   */
  public global: Collection<CommandData> = new Map();

  /**
   * @property
   * @public
   * @type { Collection<Collection<CommandData>> }
   */
  public guilds: Collection<Collection<CommandData>> = new Map();

  /**
   * @constructor
   * @param { Sucrose } sucrose
   * @example
   * new CommandManager(sucrose)
   */
  public constructor(private sucrose: Sucrose) {
    this.sucrose = sucrose;
  }

  /**
   * Build global and guilds commands
   * @method
   * @public
   * @returns { Promise<void> }
   */
  public async build(): Promise<void> {
    const basePath = path.join(__dirname, '../../commands');
    if (!existsSync(basePath)) return;

    const globalPath = path.join(basePath, 'global');
    const guildsPath = path.join(basePath, 'guilds');

    //? Global commands
    if (existsSync(globalPath)) {
      const files = readdirSync(globalPath).filter((file) => lstatSync(path.join(globalPath, file)).isFile());
      if (!files.length) return;

      const cache = { errors: <Error[]>[], i: 0 }; // Logger cache of this code
      const content = () =>
        `${stringProgressBar(cache.i + 1, files.length)} ${cache.i}/${files.length} commands processed`;
      const loading = new ConsoleLoading(content()); // Start loading console line

      //? Loop all command file
      for await (const file of files) {
        cache.i++; // Increment command index in logger cache

        try {
          await this.load(file);
          loading.content = content(); // set new state in loading console line
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error);
          if (Array.isArray(error)) cache.errors.push(...error);
        }
      } //? [end] Loop all command file

      loading.clear(); // clear loading console line

      if (cache.errors.length) throw cache.errors; // throw all errors of global commands section
      Logger.log(`${files.length} global commands loaded`, 'COMMAND_MANAGER');
    } //? [end] Global commands

    //? Guilds commands
    if (existsSync(guildsPath)) {
      const guilds = readdirSync(guildsPath).filter((file) => lstatSync(path.join(guildsPath, file)).isDirectory());
      if (!guilds.length) return;

      const cache = { errors: <Error[]>[], i: 0, g: 0, commands: 0 }; // Logger cache of this code
      const content = () =>
        `${stringProgressBar(cache.g + 1, guilds.length)} ${cache.g} guild of ${guilds.length} guild(s) processed`;
      const loading = new ConsoleLoading(content()); // Start loading console line

      //? Loop all guild folder
      for await (const guild of guilds) {
        cache.g++; // Increment guild index in logger cache

        try {
          const guildPath = path.join(guildsPath, guild);
          const files = readdirSync(guildPath).filter((file) => lstatSync(path.join(guildPath, file)).isFile());
          if (!files.length) return;

          this.guilds.set(guild, new Map()); // Create guild commands collection
          cache.commands += files.length; // Add guild commands size to total commands size in logger cache

          //? Loop all command of guild
          for await (const file of files) {
            cache.i++; // Increment command index of this guild in logger cache

            try {
              await this.load(file, guild);
            } catch (error) {
              if (error instanceof Error) cache.errors.push(error);
              if (Array.isArray(error)) cache.errors.push(...error);
            }
          } //? [end] Loop all command of guild

          loading.content = content(); // set new state in loading console line
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error);
          if (Array.isArray(error)) cache.errors.push(...error);
        }

        cache.i = 0; // Reset command index in logger cache
        loading.clear(); // clear loading console line

        if (cache.errors.length) throw cache.errors; // throw all errors of guilds commands section
        Logger.log(`${cache.commands} guilds commands loaded`, 'COMMAND_MANAGER');
      } //? [end] Loop all guild folder
    } //? [end] Guilds commands
  } //? [end] build

  /**
   * Create new(s) commands in discord API
   * @method
   * @public
   * @async
   * @param { CommandLocalOptions } options
   * @returns { Promise<ApplicationCommand | Discord.Collection<Snowflake, ApplicationCommand>> }
   * @example
   * await commands.create()
   * await commands.create({ guildId: '012345678912345678' })
   * await commands.create({ commandName: 'hello' })
   * await commands.create({ commandName: 'hello', guildId: '012345678912345678'})
   */
  public async create(
    options: BaseLocalCommandOptions = {}
  ): Promise<Discord.ApplicationCommand | Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand>> {
    const application = <Discord.ClientApplication>this.sucrose.application;
    const { commandName, guildId } = options;

    if (typeof commandName === 'string') {
      //? Create a command

      const commands = guildId ? this.guilds.get(guildId) : this.global; // Define commands collection
      if (!(commands instanceof Map)) throw new SucroseError('ERROR', 'COMMAND_FOLDER_GUILD_EMPTY');

      const command = commands.get(commandName); // Get command
      if (!command) throw new SucroseError('ERROR', 'COMMAND_UKNOWN');

      // Create command in Discord API
      if (guildId) return await application.commands.create(command.body, guildId);
      else return await application.commands.create(command.body);
    } else {
      //? Create all commands

      const commands = guildId ? this.guilds.get(guildId) : this.global; // Define commands collection
      if (!(commands instanceof Map)) throw new SucroseError('ERROR', 'COMMAND_FOLDER_GUILD_EMPTY');

      // Reset commands in Discord API
      await (guildId ? application?.commands.set([], guildId) : application?.commands.set([]));

      const cache = { errors: <Error[]>[], i: 0 }; // Logger cache of this code
      const applicationCommandCollection = <Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand>>new Map();

      //? Loop all command of this collection
      for await (const command of commands.values()) {
        cache.i++;

        try {
          if (!command) throw new SucroseError('ERROR', 'COMMAND_UKNOWN');

          // Create command in Discord API
          const apiCommand = await (guildId
            ? application.commands.create(command.body, guildId)
            : application.commands.create(command.body));

          applicationCommandCollection.set(apiCommand.id, apiCommand);
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error); // Push error in logger cache
        }
      } //? [end] Loop all command of this collection

      if (cache.errors.length) throw cache.errors;
      return applicationCommandCollection;
    }
  }

  /**
   * Delete one command or many commands in discord api
   * @method
   * @public
   * @async
   * @param { Partial<BaseAPICommandOptions> } options
   * @returns { Promise<Discord.ApplicationCommand | Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand>> }
   * @example
   * await commands.delete()
   * await commands.delete({ guildId: '012345678912345678' })
   * await commands.delete({ commandId: '012345678912345678' })
   * await commands.delete({ commandId: '012345678912345678', guildId: '012345678912345678' })
   */
  public async delete(
    options: Partial<BaseAPICommandOptions>
  ): Promise<Discord.ApplicationCommand | Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand>> {
    const commands = await this.fetch(options);
    if (!commands) throw new SucroseError('ERROR', 'COMMAND_NOT_EXIST_ON_API');

    if (commands instanceof Map) {
      const results = <Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand>>new Map();
      const errors = <Error[]>[];

      for (const command of commands.values()) {
        try {
          const oldCommand = await command.delete();
          results.set(oldCommand.id, oldCommand);
        } catch (error) {
          if (error instanceof Error) errors.push(error);
        }
      }

      if (errors.length) throw errors;
      return results;
    } else return await commands.delete();
  }

  /**
   * Edit a command in discord api
   * @method
   * @public
   * @async
   * @param { BaseAPICommandOptions & { data: Discord.ApplicationCommandDataResolvable } options
   * @returns { Promise<Discord.ApplicationCommand> }
   * @example
   * const data = { description: 'I love ferret' }
   *
   * await commands.edit({ commandId: '012345678912345678', data })
   * await commands.edit({ commandId: '012345678912345678', data, guildId: '012345678912345678' })
   */
  public async edit(
    options: BaseAPICommandOptions & { data: Discord.ApplicationCommandDataResolvable }
  ): Promise<Discord.ApplicationCommand> {
    const { commandId, guildId, data } = options;
    const application = <Discord.ClientApplication>this.sucrose.application;

    if (guildId) return await application.commands.edit(commandId, data, guildId);
    else return await application.commands.edit(commandId, data);
  }

  /**
   * Fetch a command or collection of commands in discord api
   * @async
   * @public
   * @param { Partial<BaseAPICommandOptions> } options
   * @returns { Promise<Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand> | Discord.ApplicationCommand | null> }
   * @example
   * await commands.fetch()
   * await commands.fetch({ guildId: '012345678912345678' })
   * await commands.fetch({ commandId: '012345678912345678' })
   * await commands.fetch({ commandId: '012345678912345678', guildId: '012345678912345678'})
   */
  public async fetch(
    options: Partial<BaseAPICommandOptions> = {}
  ): Promise<Discord.Collection<Discord.Snowflake, Discord.ApplicationCommand> | Discord.ApplicationCommand | null> {
    const application = <Discord.ClientApplication>this.sucrose.application;
    const { commandId, guildId } = options;

    const commands = application.commands.fetch(commandId, { guildId }) || application.commands.fetch() || null;
    if (commands instanceof Map && !commands.size) return null;
    return commands;
  }

  /**
   * Load a command and insert this into local commands collection
   * @method
   * @private
   * @async
   * @param { string } target Target file name
   * @param { string | undefined } guildId id of guild command
   * @returns { Promise<CommandData> }
   */
  private async load(target: string, guildId?: string): Promise<CommandData> {
    const basePath = path.join(__dirname, '../../commands', guildId ? `guilds/${guildId}` : 'global');
    const commandPath = path.join(basePath, target);
    let command = <CommandData>(await import(commandPath)).default; // Import command
    const commandFolderPath = path.join(basePath, command.body.name); // Define path of subcommandsgroups folder
    command.path = commandPath; // Set path of command file

    //? Get sub commands group or sub commands
    if (
      (!command.body.type || command.body.type === 'CHAT_INPUT') &&
      existsSync(commandFolderPath) &&
      lstatSync(commandFolderPath).isDirectory()
    ) {
      command = <ChatInputData>command;
      const subCommandGroupFiles = readdirSync(commandFolderPath).filter((file) =>
        lstatSync(path.join(commandFolderPath, file)).isFile()
      );

      // Empty option in command body and command object
      command.body.options = [];
      command.options = new Map();

      //? Loop all sub command groups / sub commands files
      const cache = { errors: <Error[]>[], i: 0 }; // Logger cache of this code
      for await (const subCommandGroupFile of subCommandGroupFiles) {
        cache.i += 1;

        try {
          const optionPath = path.join(commandFolderPath, subCommandGroupFile);
          let option = <ChatInputOptionData>(await import(optionPath)).default;
          const groupPath = path.join(commandFolderPath, option.option.name); // Define sub command group path
          option.path = optionPath;

          //? if this CommandOption is a sub command group
          if (
            option.option.type === 'SUB_COMMAND_GROUP' &&
            existsSync(groupPath) &&
            lstatSync(groupPath).isDirectory()
          ) {
            option = <ChatInputSubCommandGroupData>option;
            const subCommandFiles = readdirSync(groupPath).filter((file) =>
              lstatSync(path.join(groupPath, file)).isFile()
            );

            // Empty option in command group option and command group object
            option.option.options = [];
            option.options = new Map();

            //? Loop all sub commands files
            const subCache = { errors: <Error[]>[], i: 0 }; // Logger cache of this code
            for await (const subCommandFile of subCommandFiles) {
              subCache.i += 1;

              try {
                const subCommandPath = path.join(groupPath, subCommandFile);
                const subCommand = <ChatInputSubCommandData>(await import(subCommandPath)).default;
                subCommand.path = subCommandPath;

                option.option.options.push(subCommand.option); // Push subcommand option in subcommandgroup options
                option.options.set(subCommand.option.name, subCommand); // Set subcommand in subcommandgroup
              } catch (error) {
                if (error instanceof Error) subCache.errors.push(error);
              }
            } //? [end] Loop all sub commands files

            if (subCache.errors.length) throw subCache.errors;
          } //? [end] if this CommandOption is a sub command group

          command.body.options.push(option.option); // Push subcommandgroup/subcommand option in command options
          command.options.set(option.option.name, option); // Set subcommandgroup/subcommand in command
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error);
          if (Array.isArray(error)) cache.errors.push(...error);
        }
      } //? [end] Loop all sub command groups / sub commands files

      if (cache.errors.length) throw cache.errors;
    } //? [end] Get sub commands group or sub commands

    const commands = guildId ? this.guilds.get(guildId) : this.global; // Define commands collection
    if (!commands) throw new SucroseError('ERROR', 'COMMAND_COLLECTION_NOT_EXIST');
    if (!command.body.type) command.body.type = 'CHAT_INPUT';
    commands.set(command.body.name, command); // Set command with all option if exist in commands

    return command;
  } //? [end] load

  /**
   * Refresh a local command
   * @method
   * @public
   * @async
   * @param { CommandLocalOptions } options
   * @returns { Promise<CommandData | CommandData[]> }
   * @example
   * await commands.refresh()
   * await commands.refresh({ guildId: '012345678912345678' })
   * await commands.refresh({ commandName: 'hello' })
   * await commands.refresh({ commandName: 'hello', guildId: '012345678912345678'})
   */
  public async refresh(options: BaseLocalCommandOptions = {}): Promise<CommandData | CommandData[]> {
    const { commandName, guildId } = options;

    const commands = guildId ? this.guilds.get(guildId) : this.global; // Define commands collection
    if (!(commands instanceof Map)) throw new SucroseError('ERROR', 'COMMAND_FOLDER_GUILD_EMPTY');

    if (typeof commandName === 'string') {
      //? Refresh one command

      const command = commands.get(commandName); // Get command
      if (!command || !command.path) throw new SucroseError('ERROR', 'COMMAND_UKNOWN');

      commands.delete(commandName);
      return await this.load(path.basename(command.path), guildId);
    } else {
      //? Refresh all commands

      const cache = { errors: <Error[]>[], i: 0 }; // Logger cache of this code
      const commandDataArray = <CommandData[]>[];

      for await (const command of commands.values()) {
        cache.i += 1;

        try {
          if (!command) throw new SucroseError('ERROR', 'COMMAND_UKNOWN');
          commands.delete(command.body.name);
          commandDataArray.push(await this.load(path.basename(command.path), guildId));
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error); // Push error in logger cache
        }
      }

      if (cache.errors.length) throw cache.errors;
      return commandDataArray;
    }
  } //? [end] refresh a command
}
