import type Discord from 'discord.js';
import Command, { type CommandData, type CommandParams } from './Command';

export type ChatInputBody = Discord.ChatInputApplicationCommandData | Discord.SlashCommandBuilder;
export interface ChatInputParams extends CommandParams {
  interaction: Discord.ChatInputCommandInteraction;
}

export interface ChatInputData extends CommandData<ChatInputParams> {
  body: ChatInputBody;
}

export default class ChatInput
  extends Command<ChatInputParams, ChatInputBody> { }
