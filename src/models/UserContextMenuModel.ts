import UserContextMenu, { type UserContextMenuBody } from '../structures/UserContextMenu';

export default abstract class UserContextMenuModel extends UserContextMenu {
  public abstract override label: string;

  public abstract override body: UserContextMenuBody;
}
