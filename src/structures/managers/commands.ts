/* Dependencies */
import { readdirSync, existsSync, lstatSync } from 'fs';

/* Typing */
import Discord, { ApplicationCommand, Snowflake } from 'discord.js';
import { Collection, CommandData, CommandOptionData } from '../typings/index';

/* Structures */
import { Sucrose } from '../sucrose';

/* Services */
import { SucroseError, Logger } from '../services/logger';
import { ConsoleLoading, StringProgressBar } from '../services/util';

const [dir, ext] = __filename.endsWith('.js') ? ['dist', 'js'] : ['src', 'ts'];

export class CommandManager {
  // Global and Guilds commands collection
  public global: Collection<CommandData> = new Map();
  public guilds: Collection<Collection<CommandData>> = new Map();
  private sucrose: Sucrose;

  public constructor(sucrose: Sucrose) {
    this.sucrose = sucrose;
  }

  /**
   * Build commands manager
   */
  public async build(): Promise<void> {
    if (existsSync(`./${dir}/commands`)) {
      /**
       * Global commands
       */
      if (existsSync(`./${dir}/commands/global`)) {
        const cache: { errors: Error[]; i: number } = { errors: [], i: 0 }; // Logger cache of this code
        const files = readdirSync(`./${dir}/commands/global`).filter((file) => lstatSync(`./${dir}/commands/global/${file}`).isFile() && file.endsWith(`.${ext}`));

        /**
         * If possible command file detected
         */
        if (files.length) {
          const content = () => `${StringProgressBar(cache.i + 1, files.length)}/${files.length} commands processed`;
          const loading = new ConsoleLoading(content()); // Start loading console line

          /**
           * Loop all command file
           */
          for await (const file of files) {
            cache.i++; // Increment command index in logger cache

            await this.load(file).catch((error) => {
              if (error instanceof Error) cache.errors.push(error); // Push error to logger cache
            });

            loading.content = content(); // set new state in loading console line
          } // [end] Loop all command file

          loading.clear(); // clear loading console line

          if (cache.errors.length) throw cache.errors; // throw all errors of global commands section
          Logger.log(`${files.length} global commands loaded`, 'COMMAND_MANAGER');
        } // [end] If possible command file detected
      } // [end] Global commands

      /**
       * Guilds commands
       */
      if (existsSync(`./${dir}/commands/guilds`)) {
        const cache: { errors: Error[]; i: number; g: number; commands: number } = { errors: [], i: 0, g: 0, commands: 0 }; // Logger cache of this code
        const guilds = readdirSync(`./${dir}/commands/guilds`).filter((file) => lstatSync(`./${dir}/commands/guilds/${file}`).isDirectory());

        /**
         * If possible guild folder detected
         */
        if (guilds.length) {
          let content = () => `${StringProgressBar(cache.g + 1, guilds.length)} ${cache.g} guild of ${guilds.length} guild(s)`;
          const loading = new ConsoleLoading(content()); // Start loading console line

          /**
           * Loop all guild folder
           */
          for await (const guild of guilds) {
            cache.g++; // Increment guild index in logger cache

            const files = readdirSync(`./${dir}/commands/guilds/${guild}`).filter((file) => lstatSync(`./${dir}/commands/guilds/${guild}/${file}`).isFile() && file.endsWith(`.${ext}`));
            this.guilds.set(guild, new Map()); // Create guild commands collection

            /**
             * If possible command file detected
             */
            if (files.length) {
              cache.commands += files.length; // Add guild commands size to total commands size in logger cache

              /**
               * Loop all command of guild
               */
              for await (const file of files) {
                cache.i++; // Increment command index of this guild in logger cache

                try {
                  await this.load(file, guild);
                } catch (error) {
                  if (error instanceof Error) cache.errors.push(error); // Push error to logger cache
                }
              } // [end] Loop all command of guild

              loading.content = content(); // set new state in loading console line
              cache.i = 0; // Reset command index in logger cache
            }

            loading.clear(); // clear loading console line

            if (cache.errors.length) throw cache.errors; // throw all errors of guilds commands section
            Logger.log(`${files.length} guilds commands loaded`, 'COMMAND_MANAGER');
          } // [end] Loop all guild folder
        } // [end] If possible guild folder detected
      } // [end] Guilds commands
    }
  } // [end] Build commands manager

  /**
   * Load a command in collection
   * @param command
   * @param target
   * @async
   */
  private async load(target: string, guildId?: string): Promise<void> {
    const path = `commands/${guildId ? `guilds/${guildId}` : 'global'}`; // Define path of command parent folder
    const command: CommandData = await import(`../../${path}/${target}`); // Import command
    command.path = target; // Defined file name in command object

    /**
     * Get sub commands group or sub commands
     */
    const sub_command_group_path = `${path}/${command.body.name}`; // Define path of command folder
    if ((!command.body.type || command.body.type === 'CHAT_INPUT') && existsSync(`./${dir}/${sub_command_group_path}`) && lstatSync(`./${dir}/${sub_command_group_path}`).isDirectory()) {
      // Get files in command folder
      const sub_command_group_files = readdirSync(`./${dir}/${sub_command_group_path}`).filter((file) => lstatSync(`./${dir}/${sub_command_group_path}/${file}`).isFile() && file.endsWith(`.${ext}`));

      // Empty option in command body and command object
      command.body.options = [];
      command.options = new Map();

      /**
       * Loop all sub command groups / sub commands files
       */
      for await (const sub_command_group_file of sub_command_group_files) {
        // Import sub command group / sub command
        const sub_command_group: CommandOptionData<'base'> = await import(`../../${sub_command_group_path}/${sub_command_group_file}`);

        const sub_command_path = `${path}/${command.body.name}/${sub_command_group.option.name}`; // Define sub command group / sub command path

        /**
         * if this CommandOption is a sub command group
         */
        if (sub_command_group.option.type === 'SUB_COMMAND_GROUP' && existsSync(`./${dir}/${sub_command_path}`) && lstatSync(`./${dir}/${sub_command_path}`).isDirectory()) {
          // Get files in command group folder
          const sub_command_files = readdirSync(`./${dir}/${sub_command_path}`).filter((file) => lstatSync(`./${dir}/${sub_command_path}/${file}`).isFile() && file.endsWith(`.${ext}`));

          // Empty option in command group option and command group object
          sub_command_group.option.options = [];
          sub_command_group.options = new Map();

          /**
           * Loop all sub commands files
           */
          for await (const sub_command_file of sub_command_files) {
            // Import sub command
            const sub_command: CommandOptionData<'sub'> = await import(`../../${sub_command_path}/${sub_command_file}`);

            sub_command_group.option.options.push(sub_command.option); // Push subcommand option in subcommandgroup options
            sub_command_group.options.set(sub_command.option.name, sub_command); // Set subcommand in subcommandgroup
          } // [end] Loop all sub commands files
        } // [end] if this CommandOption is a sub command group

        command.body.options.push(sub_command_group.option); // Push subcommandgroup/subcommand option in command options
        command.options.set(sub_command_group.option.name, sub_command_group); // Set subcommandgroup/subcommand in command
      } // [end] Loop all sub command groups / sub commands files
    } // [end] Get sub commands group or sub commands

    const commands = guildId ? this.guilds.get(guildId) : this.global; // Define commands collection
    if (!commands) throw new SucroseError('ERROR', 'COMMAND_COLLECTION_NOT_EXIST');
    commands.set(command.body.name, command); // Set command with all option if exist in commands
  }

  /**
   * Create new(s) commands in discord API
   * @async
   * @param name
   * @param guildId
   * @example
   * commands.create('*') // reset and create all global commands
   * commands.create('*', '012345678912345678') // reset and create all commands of guild id (second param)
   * commands.create('hello') // create command hello
   * commands.create('hello', '012345678912345678') // create command hello in guild id (second param)
   */
  public async create(name: string, guildId?: string): Promise<void> {
    /**
     * Create all command of a collection
     */
    if (name === '*') {
      const commands = guildId ? this.guilds.get(guildId) : this.global; // Define commands collection
      if (!(commands instanceof Map)) throw new SucroseError('ERROR', 'COMMAND_FOLDER_GUILD_EMPTY');

      // Reset commands in Discord API
      await (guildId ? this.sucrose.application?.commands.set([], guildId) : this.sucrose.application?.commands.set([]));

      const cache: { errors: { name: string; message: string }[]; i: number } = { errors: [], i: 0 }; // Logger cache of this code

      /**
       * Loop all command of this collection
       */
      for await (const command of commands.values()) {
        cache.i++;

        try {
          if (!command) throw new SucroseError('ERROR', 'COMMAND_UKNOWN');

          // Create command in Discord API
          await (guildId ? this.sucrose.application?.commands.create(command.body, guildId) : this.sucrose.application?.commands.create(command.body));
        } catch (error) {
          if (error instanceof Error) cache.errors.push(error); // Push error in logger cache
        }
      } // [end] Loop all command of this collection
    } else {
      /**
       * Create a command
       */

      const commands = guildId ? this.guilds.get(guildId) : this.global; // Define commands collection
      if (!(commands instanceof Map)) throw new SucroseError('ERROR', 'COMMAND_FOLDER_GUILD_EMPTY');

      const command = commands.get(name); // Get command
      if (!command) throw new SucroseError('ERROR', 'COMMAND_UKNOWN');

      // Create command in Discord API
      await (guildId ? this.sucrose.application?.commands.create(command.body, guildId) : this.sucrose.application?.commands.create(command.body));
    } // [end] Create a command
  }

  /**
   * refresh a command
   * @param name
   * @param guildId
   */
  public async refresh(name: string, guildId?: string): Promise<void> {
    const commands = guildId ? this.guilds.get(guildId) : this.global; // Define commands collection
    if (!(commands instanceof Map)) throw new SucroseError('ERROR', 'COMMAND_FOLDER_GUILD_EMPTY');

    const command = commands.get(name); // Get command
    if (!command || !command.path) throw new SucroseError('ERROR', 'COMMAND_UKNOWN');

    commands.delete(name);
    this.load(command.path, guildId);
  } // [end] refresh a command

  /**
   * Delete a command in discord API
   * @async
   * @param commandId
   * @param guildId
   */
  public async delete(commandId: string, guildId?: string): Promise<void> {
    const command = await this.fetch({ commandId, guildId }); // Fetch command in Discord API
    if (!(command instanceof ApplicationCommand)) throw new SucroseError('ERROR', 'COMMAND_NOT_EXIST_ON_API');
    await command.delete(); // Delete command of Discord API
  }

  /**
   * Fetch a command or collection of commands to Discord API
   * @param options
   * @returns
   */
  public async fetch(options?: { commandId?: string; guildId?: string }): Promise<Discord.Collection<Snowflake, ApplicationCommand> | ApplicationCommand | undefined> {
    if (options) {
      if (options.guildId) {
        const guild = await this.sucrose.guilds.fetch(options.guildId); // Fetch guild in Discord API
        if (guild) return await (options.commandId ? guild.commands.fetch(options.commandId) : guild.commands.fetch()); // Fetch all guild commands or a guild command with commandId
      } else return await this.sucrose.application?.commands.fetch(options.commandId); // Fetch a global command with commandId
    } else return await this.sucrose.application?.commands.fetch(); // Fetch all global commands
  }
}
