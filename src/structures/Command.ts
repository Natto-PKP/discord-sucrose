import type Discord from 'discord.js';
import BaseInteraction, { type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';

export type CommandBodyBuilder = Discord.SlashCommandBuilder | Discord.ContextMenuCommandBuilder;
export type CommandBodyData = Discord.SlashCommandBuilder | Discord.ApplicationCommandData;
export type CommandBody = CommandBodyBuilder | CommandBodyData;

export interface CommandParams extends BaseInteractionParams {
  interaction: Discord.ChatInputCommandInteraction
  | Discord.MessageContextMenuCommandInteraction
  | Discord.UserContextMenuCommandInteraction;
}

export interface CommandData<P = CommandParams, B = CommandBody> extends BaseInteractionData<P, B> {
  body: B;
}

export default class Command<P = CommandParams, B = CommandBody>
  extends BaseInteraction<P, B> { }
