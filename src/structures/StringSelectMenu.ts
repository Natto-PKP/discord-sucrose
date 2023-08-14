import type Discord from 'discord.js';
import SelectMenu, { type SelectMenuData, type SelectMenuParams } from './SelectMenu';

export type StringSelectMenuBody = Discord.StringSelectMenuBuilder
| Discord.StringSelectMenuComponent
| Discord.StringSelectMenuComponentData;

export interface StringSelectMenuParams extends SelectMenuParams {
  interaction: Discord.AnySelectMenuInteraction;
}

export interface StringSelectMenuData extends SelectMenuData<StringSelectMenuParams> {
  body: StringSelectMenuBody;
}

export default class StringSelectMenu
  extends SelectMenu<StringSelectMenuParams, StringSelectMenuBody> { }
