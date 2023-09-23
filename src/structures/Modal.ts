import type Discord from 'discord.js';
import { BaseInteraction, type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';

/**
 * Body of the modal, discord.js will handle this
 * @public
 */
export type ModalBody = Discord.ModalBuilder | Discord.ModalComponentData;

/**
 * Modal params
 * @public
 */
export interface ModalParams extends BaseInteractionParams {
  interaction: Discord.ModalSubmitInteraction;
}

/**
 * Modal data
 * @public
 * @example
 * ```ts
 * import { ModalData } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default <ModalData>{
 *   label: 'my-modal',
 *   body: {
 *     type: ApplicationCommandType.Modal,
 *     title: 'My modal',
 *     description: 'My modal',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export type ModalData = BaseInteractionData<ModalParams, ModalBody>;

/**
 * Modal
 * @public
 * @example
 * ```ts
 * import { Modal } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const modal = new Modal();
 * modal.setLabel('my-modal');
 * modal.setExecute(() => console.log('Hello world!'));
 * modal.setBody({
 *   type: ApplicationCommandType.Modal,
 *   title: 'My modal',
 *   description: 'My modal',
 * });
 *
 * export default modal;
 * ```
 * @example
 * ```ts
 * import { Modal } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const data = <ModalData>{
 *   label: 'my-modal',
 *   body: {
 *     type: ApplicationCommandType.Modal,
 *     title: 'My modal',
 *     description: 'My modal',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new Modal(data);
 * ```
 */
export class Modal extends BaseInteraction<ModalParams, ModalBody> { }
