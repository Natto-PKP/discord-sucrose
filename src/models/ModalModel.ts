import Modal, { type ModalBody } from '../structures/Modal';

export default abstract class ModalModel extends Modal {
  public abstract override label: string;

  public abstract override body: ModalBody;
}
