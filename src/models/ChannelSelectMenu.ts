import ChannelSelectMenu, { type ChannelSelectMenuBody } from '../structures/ChannelSelectMenu';

export default abstract class ChannelSelectMenuModel extends ChannelSelectMenu {
  public abstract override label: string;

  public abstract override body: ChannelSelectMenuBody;
}
