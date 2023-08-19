import {
  Modal, type ModalData, type ModalParams, type ModalBody,
} from '../structures/Modal';
import { BaseInteractionManager } from './BaseInteractionManager';

/**
 * Modal manager
 * @public
 */
export class ModalManager extends BaseInteractionManager<
ModalParams,
ModalBody,
Modal,
ModalData
> {
  protected override readonly _structure = Modal;
}
