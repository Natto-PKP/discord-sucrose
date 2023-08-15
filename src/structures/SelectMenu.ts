import type Discord from 'discord.js';
import BaseInteraction, { type BaseInteractionParams, type BaseInteractionData } from './BaseInteraction';

export type SelectMenuBuilder = Discord.RoleSelectMenuBuilder
| Discord.UserSelectMenuBuilder
| Discord.StringSelectMenuBuilder
| Discord.ChannelSelectMenuBuilder
| Discord.MentionableSelectMenuBuilder;

export type SelectMenuComponent = Discord.MentionableSelectMenuComponent
| Discord.ChannelSelectMenuComponent
| Discord.StringSelectMenuComponent
| Discord.UserSelectMenuComponent
| Discord.RoleSelectMenuComponent;

export type SelectMenuComponentData = Discord.MentionableSelectMenuComponentData
| Discord.ChannelSelectMenuComponentData
| Discord.StringSelectMenuComponentData
| Discord.UserSelectMenuComponentData
| Discord.RoleSelectMenuComponentData;

export type SelectMenuBody = SelectMenuBuilder | SelectMenuComponent | SelectMenuComponentData;

export interface SelectMenuParams extends BaseInteractionParams {
  interaction: Discord.AnySelectMenuInteraction;
}

export interface SelectMenuData<P = SelectMenuParams, B = SelectMenuBody>
  extends BaseInteractionData<P, B> {
  body: B;
}

export default class SelectMenu<P = SelectMenuParams, B = SelectMenuBody>
  extends BaseInteraction<P, B> { }
