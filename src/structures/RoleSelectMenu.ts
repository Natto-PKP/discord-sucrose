import type Discord from 'discord.js';
import SelectMenu, { type SelectMenuData, type SelectMenuParams } from './SelectMenu';

export type RoleSelectMenuBody = Discord.RoleSelectMenuBuilder
| Discord.RoleSelectMenuComponent
| Discord.RoleSelectMenuComponentData;

export interface RoleSelectMenuParams extends SelectMenuParams {
  interaction: Discord.AnySelectMenuInteraction;
}

export interface RoleSelectMenuData extends SelectMenuData<RoleSelectMenuParams> {
  body: RoleSelectMenuBody;
}

export default class RoleSelectMenu
  extends SelectMenu<RoleSelectMenuParams, RoleSelectMenuBody> { }
