import type Discord from 'discord.js';
import BaseInteraction, { type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';

export type ButtonBody = Discord.ButtonBuilder
| Discord.ButtonComponent
| Discord.ButtonComponentData;

export interface ButtonParams extends BaseInteractionParams {
  interaction: Discord.ButtonInteraction;
}

export interface ButtonData extends BaseInteractionData<ButtonParams, ButtonBody> {
  body: ButtonBody;
}

export default class Button extends BaseInteraction<ButtonParams, ButtonBody> { }
