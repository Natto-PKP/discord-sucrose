import type Discord from 'discord.js';
import BaseInteraction, { type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';

export type SubCommandBody = Discord.ApplicationCommandSubCommandData
| Discord.SlashCommandSubcommandBuilder;

export interface SubCommandParams extends BaseInteractionParams {
  interaction: Discord.ChatInputCommandInteraction;
}

export interface SubCommandData extends BaseInteractionData<SubCommandParams, SubCommandBody> {
  body: SubCommandBody;
}

export default class SubCommand extends BaseInteraction<SubCommandParams, SubCommandBody> {

}
