import { readdirSync, existsSync, lstatSync } from 'fs';
import Discord, { ApplicationCommand, Snowflake } from 'discord.js';
import { Command, Collection } from '../typings/index';
import { Sucrose } from './sucrose';
import { SucroseError } from './errors';
import { prod } from '../secret.json';

const [dir, ext] = prod ? ['dist', 'js'] : ['src', 'ts'];

export class CommandManager {
  // Global and Guilds commands collection
  public collection: Collection<Command | Collection<Command>> = new Map();

  public sucrose: Sucrose;

  public constructor(sucrose: Sucrose) {
    this.sucrose = sucrose;
  }

  /**
   * Build commands manager
   */
  public async build(): Promise<void> {
    // Faire erreurs handler ici
    if (existsSync(`./${dir}/commands`)) {
      // Multiples errors handler
      const errors: { array: { name: string; message: string; path: string }[]; index: number } = { array: [], index: 0 };
      const files = readdirSync(`./${dir}/commands`);

      for await (const file of files) {
        errors.index++;

        try {
          await this.load(file);
        } catch (error) {
          if (error instanceof Error) {
            errors.array.push({ name: error.name, message: error.message, path: `./${dir}/commands/${file}` });
            if (files.length === errors.index) throw console.table(errors.array);
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
  private async load(target: string): Promise<void> {
    await this.sucrose.application?.fetch();

    if (lstatSync(`./${dir}/commands/${target}`).isFile() && target.endsWith(`.${ext}`)) {
      const command: Command = await import(`../commands/${target}`);

      if (!command.body) throw new SucroseError('COMMAND_MISSING_BODY', { section: 'COMMAND_MANAGER' });
      if (!command.body.name) throw new SucroseError('COMMAND_MISSING_BODY_NAME', { section: 'COMMAND_MANAGER' });
      command.path = target;

      this.collection.set(command.body.name, command);
    } else if (lstatSync(`./${dir}/commands/${target}`).isDirectory()) {
      const files = readdirSync(`./${dir}/commands/${target}`).filter((file) => lstatSync(`./${dir}/commands/${target}/${file}`).isFile() && file.endsWith(`.${ext}`));

      if (!files.length) throw new SucroseError('COMMAND_FOLDER_GUILD_EMPTY', { section: 'COMMAND_MANAGER' });
      const commands: Collection<Command> = new Map();

      for await (const file of files) {
        const command: Command = await import(`../commands/${target}/${file}`);
        if (!command.body) throw new SucroseError('COMMAND_MISSING_BODY', { section: 'COMMAND_MANAGER' });
        if (!command.body.name) throw new SucroseError('COMMAND_MISSING_BODY_NAME', { section: 'COMMAND_MANAGER' });
        command.path = target + '/' + file;

        commands.set(command.body.name, command);
      }

      this.collection.set(target, commands);
    }
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
   * commands.create('hello') // create command hello in guild id (second param)
   */
  public async create(name: string, guildId?: string): Promise<void> {
    const commands = guildId ? this.collection.get(guildId) : this.collection;
    if (!(commands instanceof Map)) throw new SucroseError('COMMAND_COLLECTION_NOT_EXIST', { section: 'COMMAND_MANAGER' });

    if (name === '*') {
      // Reset application commands
      await (guildId ? this.sucrose.application?.commands.set([], guildId) : this.sucrose.application?.commands.set([]));

      // Multiples errors handler
      const errors: { array: { name: string; message: string }[]; index: number } = { array: [], index: 0 };

      // Create all application command of commands in Discord API
      for await (const command of commands.values()) {
        errors.index++;

        try {
          if (!command || command instanceof Map) throw new SucroseError('COMMAND_UKNOWN', { section: 'COMMAND_MANAGER' });
          await (guildId ? this.sucrose.application?.commands.create(command.body, guildId) : this.sucrose.application?.commands.create(command.body));
        } catch (error) {
          if (error instanceof Error) {
            errors.array.push({ name: error.name, message: error.message });
            if (commands.size === errors.index) throw console.table(errors.array);
          }
        }
      }
    } else {
      // Create a command in Discord API
      const command = commands.get(name);
      if (!command || command instanceof Map) throw new SucroseError('COMMAND_UKNOWN', { section: 'COMMAND_MANAGER' });

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
    if (!command || command instanceof Map) throw new SucroseError('COMMAND_NOT_EXIST_ON_API', { section: 'COMMAND_MANAGER' });
    await command.delete();
  }

  /**
   * Fetch a command or collection of commands to Discord API
   * @param options
   * @returns
   */
  public async fetch(options?: { commandId?: string; guildId?: string }): Promise<Discord.Collection<Snowflake, ApplicationCommand> | ApplicationCommand | undefined> {
    if (!options?.commandId) return await (options?.guildId ? this.sucrose.application?.commands.fetch(undefined, { guildId: options.guildId }) : this.sucrose.application?.commands.fetch());
    else return await (options.guildId ? this.sucrose.application?.commands.fetch(options.commandId, { guildId: options.guildId }) : this.sucrose.application?.commands.fetch(options.commandId));
  }
}
