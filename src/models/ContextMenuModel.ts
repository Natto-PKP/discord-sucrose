import ContextMenu, { type ContextMenuBody } from '../structures/ContextMenu';

export default abstract class ContextMenuModel extends ContextMenu {
  public abstract override label: string;

  public abstract override body: ContextMenuBody;
}
