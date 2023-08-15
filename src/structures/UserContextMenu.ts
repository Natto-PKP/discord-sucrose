import type Discord from 'discord.js';
import ContextMenu, { type ContextMenuData, type ContextMenuParams } from './ContextMenu';

export type UserContextMenuBody = Discord.UserApplicationCommandData
| Discord.ContextMenuCommandBuilder;

export interface UserContextMenuParams extends ContextMenuParams {
  interaction: Discord.UserContextMenuCommandInteraction;
}

export interface UserContextMenuData
  extends ContextMenuData<UserContextMenuParams, UserContextMenuBody> {
  body: UserContextMenuBody;
}

export default class UserContextMenu
  extends ContextMenu<UserContextMenuParams, UserContextMenuBody> { }
