import Modal, { type ModalBody } from '../structures/Modal';

/**
 * Modal model
 * @public
 * @example
 * ```ts
 * import { ModalModel } from 'sucrose';
 *
 * export default class MyModal extends ModalModel {
 *   public override label = 'my-modal';
 *
 *   public override body = {
 *     title: 'My modal',
 *     description: 'This is my modal',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export default abstract class ModalModel extends Modal {
  public abstract override label: string;

  public abstract override body: ModalBody;
}
