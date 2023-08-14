import RoleSelectMenu, { type RoleSelectMenuBody } from '../structures/RoleSelectMenu';

export default abstract class RoleSelectMenuModel extends RoleSelectMenu {
  public abstract override label: string;

  public abstract override body: RoleSelectMenuBody;
}
