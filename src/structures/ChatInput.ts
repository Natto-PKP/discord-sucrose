import Discord from 'discord.js';
import Command, { type CommandData, type CommandParams } from './Command';
import SubCommand, { SubCommandData } from './SubCommand';
import SubCommandGroup, { type SubCommandGroupData } from './SubCommandGroup';

export type ChatInputBody = Discord.ChatInputApplicationCommandData | Discord.SlashCommandBuilder;
export interface ChatInputParams extends CommandParams {
  interaction: Discord.ChatInputCommandInteraction;
}

export interface ChatInputData extends CommandData<ChatInputParams> {
  body: ChatInputBody;
  options?: (SubCommandData | SubCommandGroupData)[] | null;
}

type Option = SubCommand | SubCommandGroup;

export default class ChatInput
  extends Command<ChatInputParams, ChatInputBody> {
  public options?: Discord.Collection<string, SubCommand | SubCommandGroup> | null;

  public addOptions(...options: (Option)[]): this {
    if (!this.options) this.options = new Discord.Collection();
    options.forEach((option) => { this.options?.set(option.label, option); });
    return this;
  }

  public removeOptions(...options: (Option)[]): this {
    if (!this.options) return this;
    options.forEach((option) => { this.options?.delete(option.label); });
    return this;
  }

  public override get data(): ChatInputData {
    return {
      ...super.data,
      options: this.options?.map((option) => option.data) || null,
    };
  }
}
