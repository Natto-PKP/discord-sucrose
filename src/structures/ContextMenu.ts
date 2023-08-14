import type Discord from 'discord.js';
import Command, { type CommandData, type CommandParams } from './Command';

export type ContextMenuBody = Discord.ContextMenuCommandBuilder
| Discord.UserApplicationCommandData | Discord.MessageApplicationCommandData;

export interface ContextMenuParams extends CommandParams {
  interaction: Discord.UserContextMenuCommandInteraction
  | Discord.MessageContextMenuCommandInteraction;
}

export interface ContextMenuData<P = ContextMenuParams> extends CommandData<P> {
  body: ContextMenuBody;
}

export default class ContextMenu<P = ContextMenuParams, B = ContextMenuBody>
  extends Command<P, B> { }
