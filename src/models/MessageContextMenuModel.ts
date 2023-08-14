import MessageContextMenu, { type MessageContextMenuBody } from '../structures/MessageContextMenu';

export default abstract class MessageContextMenuModel extends MessageContextMenu {
  public abstract override label: string;

  public abstract override body: MessageContextMenuBody;
}
