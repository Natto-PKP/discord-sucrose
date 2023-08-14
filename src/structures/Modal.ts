import type Discord from 'discord.js';
import BaseInteraction, { type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';

export type ModalBody = Discord.ModalBuilder
| Discord.ModalBuilder
| Discord.ModalComponentBuilder
| Discord.ModalComponentData;

export interface ModalParams extends BaseInteractionParams {
  interaction: Discord.ModalSubmitInteraction;
}

export interface ModalData extends BaseInteractionData<ModalParams> {
  body: ModalBody;
}

export default class Modal extends BaseInteraction<ModalParams, ModalBody> { }
