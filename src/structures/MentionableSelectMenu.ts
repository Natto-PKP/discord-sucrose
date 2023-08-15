import type Discord from 'discord.js';
import SelectMenu, { type SelectMenuData, type SelectMenuParams } from './SelectMenu';

export type MentionableSelectMenuBody = Discord.MentionableSelectMenuBuilder
| Discord.MentionableSelectMenuComponent
| Discord.MentionableSelectMenuComponentData;

export interface MentionableSelectMenuParams extends SelectMenuParams {
  interaction: Discord.AnySelectMenuInteraction;
}

export interface MentionableSelectMenuData
  extends SelectMenuData<MentionableSelectMenuParams, MentionableSelectMenuBody> {
  body: MentionableSelectMenuBody;
}

export default class MentionableSelectMenu
  extends SelectMenu<MentionableSelectMenuParams, MentionableSelectMenuBody> { }
