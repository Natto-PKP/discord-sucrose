import { readdirSync, existsSync, lstatSync } from 'fs';
import Discord, { ApplicationCommand, ApplicationCommandResolvable, GuildResolvable, Snowflake } from 'discord.js';
import { Command, Collection } from 'src/typings';
import { Sucrose } from './sucrose';
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
    if (existsSync(`./${dir}/commands`)) for await (const file of readdirSync(`./${dir}/commands`)) await this.load(file);
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

      if (!command.body) throw Error(`[Sucrose][Commands manager] command in "${target}" :: missing body`);
      if (!command.body.name) throw Error(`[Sucrose][Commands manager] command in "${target}" :: missing body.name`);
      command.path = target;

      this.collection.set(command.body.name, command);
    } else if (lstatSync(`./${dir}/commands/${target}`).isDirectory()) {
      const files = readdirSync(`./${dir}/commands/${target}`).filter((file) => lstatSync(`./${dir}/commands/${target}/${file}`).isFile() && file.endsWith(`.${ext}`));

      if (!files.length) throw Error(`[Sucrose][Commands manager] a guild commands folder (${target}) is empty`);
      const commands: Collection<Command> = new Map();

      for await (const file of files) {
        const command: Command = await import(`../commands/${target}/${file}`);

        if (!command.body) throw Error(`[Sucrose][Commands manager] command in "${target}/${file}" :: missing body`);
        if (!command.body.name) throw Error(`[Sucrose][Commands manager] command in "${target}/${file}" :: missing body.name`);
        command.path = target;

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
    if (!(commands instanceof Map)) throw Error(`[Sucrose][Commands manager] guild (${guildId}) commands collection does not exist`);

    if (name === '*') {
      // Reset application commands
      await (guildId ? this.sucrose.application?.commands.set([], guildId) : this.sucrose.application?.commands.set([]));

      // Create all application command of commands in Discord API
      for await (const command of commands.values()) {
        console.log(command);

        if (!command || command instanceof Map) throw TypeError('[Sucrose][Commands manager] command variable is not a Command');
        await (guildId ? this.sucrose.application?.commands.create(command.body, guildId) : this.sucrose.application?.commands.create(command.body));
      }
    } else {
      // Create a command in Discord API
      const command = commands.get(name);
      if (!command || command instanceof Map) throw TypeError('[Sucrose][Commands manager] command variable is not a Command');

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
    if (!command || command instanceof Map) throw TypeError(`[Sucrose][Commands manager] command "${commandId}"${guildId ? ` in guild ${guildId} ` : ' '} is not in Discord API`);
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
