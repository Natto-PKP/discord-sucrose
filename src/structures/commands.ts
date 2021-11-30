import { readdirSync, existsSync, lstatSync } from 'fs';
import Discord, { ApplicationCommand, Snowflake } from 'discord.js';
import { Collection, CommandData, CommandOptionData } from '../typings/index';
import { Sucrose } from './sucrose';
import { SucroseError } from './errors';
import { prod } from '../secret.json';

const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

// Faire une méthode refresh pour remettre à jour les commandes

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
        const errors: { array: { name: string; message: string; path: string }[]; index: number } = { array: [], index: 0 };
        const files = readdirSync(`./${dir}/commands/global`).filter((file) => lstatSync(`./${dir}/commands/global/${file}`).isFile() && file.endsWith(`.${ext}`));

        for await (const file of files) {
          errors.index++;

          try {
            await this.load(file);
          } catch (error) {
            if (error instanceof Error) {
              errors.array.push({ name: error.name, message: error.message, path: `./${dir}/commands/global/${file}` });
              if (files.length === errors.index) throw console.table(errors.array);
            }
          }
        }
      }

      /**
       * Guilds commands
       */
      if (existsSync(`./${dir}/commands/guilds`)) {
        const guilds = readdirSync(`./${dir}/commands/guilds`).filter((file) => lstatSync(`./${dir}/commands/guilds/${file}`).isDirectory());

        for await (const guild of guilds) {
          const errors: { array: { name: string; message: string; path: string }[]; index: number } = { array: [], index: 0 };
          const files = readdirSync(`./${dir}/commands/guilds/${guild}`).filter((file) => lstatSync(`./${dir}/commands/guilds/${guild}/${file}`).isFile() && file.endsWith(`.${ext}`));
          this.guilds.set(guild, new Map());

          for await (const file of files) {
            errors.index++;

            try {
              await this.load(file, guild);
            } catch (error) {
              if (error instanceof Error) {
                errors.array.push({ name: error.name, message: error.message, path: `./${dir}/commands/${guild}/${file}` });
                if (files.length === errors.index) throw console.table(errors.array);
              }
            }
          }
        }
      }
    }
  }

  /**
   * Load a command in collection
   * @param command
   * @param target
   * @async
   */
  private async load(target: string, guildId?: string): Promise<void> {
    const path = `commands/${guildId ? `guilds/${guildId}` : 'global'}`;
    const command: CommandData = await import(`../${path}/${target}`);
    command.path = target;

    // Get sub commands group or sub commands
    const sub_command_group_path = `${path}/${command.body.name}`;

    if ((!command.body.type || command.body.type === 'CHAT_INPUT') && existsSync(`./${dir}/${sub_command_group_path}`) && lstatSync(`./${dir}/${sub_command_group_path}`).isDirectory()) {
      const sub_command_group_files = readdirSync(`./${dir}/${sub_command_group_path}`).filter((file) => lstatSync(`./${dir}/${sub_command_group_path}/${file}`).isFile() && file.endsWith(`.${ext}`));
      command.body.options = [];
      command.options = new Map();

      for await (const sub_command_group_file of sub_command_group_files) {
        const sub_command_group: CommandOptionData<'base'> = await import(`../${sub_command_group_path}/${sub_command_group_file}`);

        // Get sub commands
        const sub_command_path = `${path}/${command.body.name}/${sub_command_group.option.name}`;

        if (sub_command_group.option.type === 'SUB_COMMAND_GROUP' && existsSync(`./${dir}/${sub_command_path}`) && lstatSync(`./${dir}/${sub_command_path}`).isDirectory()) {
          const sub_command_files = readdirSync(`./${dir}/${sub_command_path}`).filter((file) => lstatSync(`./${dir}/${sub_command_path}/${file}`).isFile() && file.endsWith(`.${ext}`));
          sub_command_group.option.options = [];
          sub_command_group.options = new Map();

          for await (const sub_command_file of sub_command_files) {
            const sub_command: CommandOptionData<'sub'> = await import(`../${sub_command_path}/${sub_command_file}`);
            sub_command_group.option.options.push(sub_command.option);
            sub_command_group.options.set(sub_command.option.name, sub_command);
          }
        }

        command.body.options.push(sub_command_group.option);
        command.options.set(sub_command_group.option.name, sub_command_group);
      }

      console.log(command.body.options);
    }

    const commands = guildId ? this.guilds.get(guildId) : this.global;
    if (!commands) throw new SucroseError('COMMAND_UKNOWN', { section: 'COMMAND_MANAGER' });
    commands.set(command.body.name, command);
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
    if (name === '*') {
      const commands = guildId ? this.guilds.get(guildId) : this.global;
      if (!(commands instanceof Map)) throw new SucroseError('COMMAND_COLLECTION_NOT_EXIST', { section: 'COMMAND_MANAGER' });

      await (guildId ? this.sucrose.application?.commands.set([], guildId) : this.sucrose.application?.commands.set([]));

      const errors: { array: { name: string; message: string }[]; index: number } = { array: [], index: 0 };

      for await (const command of commands.values()) {
        errors.index++;

        try {
          if (!command) throw new SucroseError('COMMAND_UKNOWN', { section: 'COMMAND_MANAGER' });
          await (guildId ? this.sucrose.application?.commands.create(command.body, guildId) : this.sucrose.application?.commands.create(command.body));
        } catch (error) {
          if (error instanceof Error) {
            errors.array.push({ name: error.name, message: error.message });
            if (commands.size === errors.index) throw console.table(errors.array);
          }
        }
      }
    } else {
      const commands = guildId ? this.guilds.get(guildId) : this.global;
      if (!(commands instanceof Map)) throw new SucroseError('COMMAND_COLLECTION_NOT_EXIST', { section: 'COMMAND_MANAGER' });

      const command = commands.get(name);
      if (!command) throw new SucroseError('COMMAND_UKNOWN', { section: 'COMMAND_MANAGER' });

      await (guildId ? this.sucrose.application?.commands.create(command.body, guildId) : this.sucrose.application?.commands.create(command.body));
    }
  }

  /**
   * Delete a command in discord API
   * @async
   * @param commandId
   * @param guildId
   */
  public async delete(commandId: string, guildId?: string): Promise<void> {
    const command = await this.fetch({ commandId, guildId });
    if (!(command instanceof ApplicationCommand)) throw new SucroseError('COMMAND_NOT_EXIST_ON_API', { section: 'COMMAND_MANAGER' });
    await command.delete();
  }

  /**
   * Fetch a command or collection of commands to Discord API
   * @param options
   * @returns
   */
  public async fetch(options?: { commandId?: string; guildId?: string }): Promise<Discord.Collection<Snowflake, ApplicationCommand> | ApplicationCommand | undefined> {
    if (options) {
      if (options.guildId) {
        const guild = await this.sucrose.guilds.fetch(options.guildId);
        if (guild) return await (options.commandId ? guild.commands.fetch(options.commandId) : guild.commands.fetch());
      } else return await this.sucrose.application?.commands.fetch(options.commandId);
    } else return await this.sucrose.application?.commands.fetch();
  }
}
