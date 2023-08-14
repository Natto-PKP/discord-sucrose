import SelectMenu, { type SelectMenuBody } from '../structures/SelectMenu';

export default abstract class SelectMenuModel extends SelectMenu {
  public abstract override label: string;

  public abstract override body: SelectMenuBody;
}
