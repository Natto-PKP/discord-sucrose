import type Discord from 'discord.js';
import Command, { type CommandData, type CommandParams, type CommandBody } from '../structures/Command';
import BaseInteractionManager from './BaseInteractionManager';

export default class CommandManager extends BaseInteractionManager<
CommandParams,
CommandBody,
Command,
CommandData
> {
  protected override readonly _structure = Command;

  public async deploy(command: Command | string, guildId?: string | null) {
    if (!this.sucrose) throw new Error('cannot deploy commands without sucrose client.');
    if (!this.sucrose.application) throw new Error('cannot deploy commands without sucrose application.');

    const cmd = this.resolve(command);
    if (!cmd) throw new Error('cannot deploy command that does not exist.');

    return this.sucrose.application.commands.create(cmd.body, guildId || undefined);
  }

  public async undeploy(command: Command | string, guildId?: string | null) {
    if (!this.sucrose) throw new Error('cannot undeploy commands without sucrose client.');
    if (!this.sucrose.application) throw new Error('cannot undeploy commands without sucrose application.');

    const cmd = this.resolve(command);
    if (!cmd) throw new Error('cannot undeploy command that does not exist.');

    return this.sucrose.application.commands.delete(
      cmd.body as Discord.ApplicationCommandResolvable,
      guildId || undefined,
    );
  }

  public async fetch(commandId: string, guildId?: string | null) {
    if (!this.sucrose) throw new Error('cannot fetch commands without sucrose client.');
    if (!this.sucrose.application) throw new Error('cannot fetch commands without sucrose application.');

    return this.sucrose.application.commands.fetch(commandId, { guildId: guildId || undefined });
  }

  public async fetchAll(guildId?: string | null) {
    if (!this.sucrose) throw new Error('cannot fetch commands without sucrose client.');
    if (!this.sucrose.application) throw new Error('cannot fetch commands without sucrose application.');

    return this.sucrose.application.commands.fetch({ guildId: guildId || undefined });
  }

  public async clear(guildId?: string | null) {
    if (!this.sucrose) throw new Error('cannot clear commands without sucrose client.');
    if (!this.sucrose.application) throw new Error('cannot clear commands without sucrose application.');

    if (guildId) return (await this.sucrose.guilds.fetch(guildId)).commands.set([]);
    return this.sucrose.application.commands.set([]);
  }
}
