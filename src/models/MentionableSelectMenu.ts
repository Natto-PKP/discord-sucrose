import MentionableSelectMenu, { type MentionableSelectMenuBody } from '../structures/MentionableSelectMenu';

export default abstract class MentionableSelectMenuModel extends MentionableSelectMenu {
  public abstract override label: string;

  public abstract override body: MentionableSelectMenuBody;
}
