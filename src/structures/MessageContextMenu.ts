import type Discord from 'discord.js';
import ContextMenu, { type ContextMenuData, type ContextMenuParams } from './ContextMenu';

export type MessageContextMenuBody = Discord.MessageApplicationCommandData
| Discord.ContextMenuCommandBuilder;

export interface MessageContextMenuParams extends ContextMenuParams {
  interaction: Discord.MessageContextMenuCommandInteraction;
}

export interface MessageContextMenuData extends ContextMenuData<MessageContextMenuParams> {
  body: MessageContextMenuBody;
}

export default class MessageContextMenu
  extends ContextMenu<MessageContextMenuParams, MessageContextMenuBody> { }
