import Discord from 'discord.js';
import BaseInteraction, { type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';
import SubCommand, { type SubCommandData } from './SubCommand';

export type SubCommandGroupBody = Discord.SlashCommandSubcommandGroupBuilder
| Discord.ApplicationCommandSubGroupData;

export interface SubCommandGroupParams extends BaseInteractionParams {
  interaction: Discord.ChatInputCommandInteraction;
}

export interface SubCommandGroupData
  extends BaseInteractionData<SubCommandGroupParams, SubCommandGroupBody> {
  body: SubCommandGroupBody;
  options?: SubCommandData[] | null;
}

export default class SubCommandGroup
  extends BaseInteraction<SubCommandGroupParams, SubCommandGroupBody> {
  public options?: Discord.Collection<string, SubCommand> | null;

  public override get data(): SubCommandGroupData {
    return {
      ...super.data,
      options: this.options?.map((option) => option.data) || null,
    };
  }

  public addOptions(...options: SubCommand[]): this {
    if (!this.options) this.options = new Discord.Collection();
    options.forEach((option) => this.options?.set(option.label, option));
    return this;
  }

  public removeOptions(...options: SubCommand[]): this {
    if (!this.options) return this;
    options.forEach((option) => this.options?.delete(option.label));
    return this;
  }
}
