import UserSelectMenu, { type UserSelectMenuBody } from '../structures/UserSelectMenu';

export default abstract class UserSelectMenuModel extends UserSelectMenu {
  public abstract override label: string;

  public abstract override body: UserSelectMenuBody;
}
