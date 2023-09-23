import type Discord from 'discord.js';
import { BaseInteraction, type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';

/**
 * Body of the button, discord.js will handle this
 * @public
 */
export type ButtonBody = Discord.ButtonBuilder
| Discord.ButtonComponent
| Discord.ButtonComponentData;

/**
 * Button params
 * @public
 */
export interface ButtonParams extends BaseInteractionParams {
  /**
   * Discord button interaction, param of InteractionCreate event
   */
  interaction: Discord.ButtonInteraction;
}

/**
 * Button data
 * @public
 * @example
 * ```ts
 * import { ButtonData } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default <ButtonData>{
 *   label: 'my-button',
 *   body: {
 *     type: ComponentType.Button,
 *     style: 'PRIMARY',
 *     label: 'Click me!',
 *     customId: 'my-button',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export type ButtonData = BaseInteractionData<ButtonParams, ButtonBody>;

/**
 * Button
 * @public
 * @example
 * ```ts
 * import { Button } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const button = new Button();
 * button.setLabel('my-button');
 * button.setExecute(() => console.log('Hello world!'));
 * button.setBody({
 *   type: ComponentType.Button,
 *   style: 'PRIMARY',
 *   label: 'Click me!',
 *   customId: 'my-button',
 * });
 *
 * export default button;
 * ```
 * @example
 * ```ts
 * import { Button } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const data = <ButtonData>{
 *   label: 'my-button',
 *   body: {
 *     type: ComponentType.Button,
 *     style: 'PRIMARY',
 *     label: 'Click me!',
 *     customId: 'my-button',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new Button(data);
 * ```
 */
export class Button extends BaseInteraction<ButtonParams, ButtonBody> { }
