import type Discord from 'discord.js';
import SelectMenu, { type SelectMenuData, type SelectMenuParams } from './SelectMenu';

export type ChannelSelectMenuBody = Discord.ChannelSelectMenuBuilder
| Discord.ChannelSelectMenuComponent
| Discord.ChannelSelectMenuComponentData;

export interface ChannelSelectMenuParams extends SelectMenuParams {
  interaction: Discord.AnySelectMenuInteraction;
}

export interface ChannelSelectMenuData extends SelectMenuData<ChannelSelectMenuParams> {
  body: ChannelSelectMenuBody;
}

export default class ChannelSelectMenu
  extends SelectMenu<ChannelSelectMenuParams, ChannelSelectMenuBody> { }
