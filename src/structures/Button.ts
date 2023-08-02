import Discord from 'discord.js';
import BaseInteraction, { type BaseInteractionData, type BaseInteractionExecuteParams } from './BaseInteraction';

export type ButtonBodyBuilder = Discord.ButtonBuilder;
export type ButtonBodyData = Discord.ButtonComponentData;
export type ButtonBody = ButtonBodyData | ButtonBodyBuilder;

export interface ButtonExecuteParams extends BaseInteractionExecuteParams {
  interaction: Discord.ButtonInteraction,
  self: Button,
}

export interface ButtonData extends BaseInteractionData<ButtonExecuteParams, ButtonBody> { }

export default class Button extends BaseInteraction<
ButtonExecuteParams,
ButtonData
> {
  public override verify(data?: ButtonData) {
    const object = data || this.data;
    super.verify(object);

    if (!object.body) throw new Error('body is required.');
    const body = object.body instanceof Discord.ButtonBuilder ? object.body.data : object.body;

    if (!body.type) throw new Error('body type is required.');
    if (body.type !== Discord.ComponentType.Button) throw new Error('body type must be a button.');
    if (!body.style) throw new Error('body.style is required.');
    if (body.style === Discord.ButtonStyle.Link && !('url' in body)) throw new Error('body.style cannot be a link.');
    if (body.disabled && typeof body.disabled !== 'boolean') throw new Error('body.disabled must be a boolean.');
    if (body.emoji && typeof body.emoji !== 'string') throw new Error('body.emoji must be a string.');
    if (body.label && typeof body.label !== 'string') throw new Error('body.label must be a string.');

    if ('customId' in body || 'custom_id' in body) {
      const customId = 'customId' in body ? body.customId : body.custom_id;
      if (!customId) throw new Error('body.customId is required.');
      if (typeof customId !== 'string') throw new Error('body.customId must be a string.');
      if (customId.length < 1) throw new Error('body.customId must be at least 1 character.');
    } else if ('url' in body) {
      if (typeof body.url !== 'string') throw new Error('body.url must be a string.');
      if (body.url.length < 1) throw new Error('body.url must be at least 1 character.');
    }

    return true;
  }
}
