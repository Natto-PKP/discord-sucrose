import StringSelectMenu, { type StringSelectMenuBody } from '../structures/StringSelectMenu';

export default abstract class StringSelectMenuModel extends StringSelectMenu {
  public abstract override label: string;

  public abstract override body: StringSelectMenuBody;
}
