import type Discord from 'discord.js';
import SelectMenu, { type SelectMenuData, type SelectMenuParams } from './SelectMenu';

export type UserSelectMenuBody = Discord.UserSelectMenuBuilder
| Discord.UserSelectMenuComponent
| Discord.UserSelectMenuComponentData;

export interface UserSelectMenuParams extends SelectMenuParams {
  interaction: Discord.AnySelectMenuInteraction;
}

export interface UserSelectMenuData
  extends SelectMenuData<UserSelectMenuParams, UserSelectMenuBody> {
  body: UserSelectMenuBody;
}

export default class UserSelectMenu
  extends SelectMenu<UserSelectMenuParams, UserSelectMenuBody> { }
