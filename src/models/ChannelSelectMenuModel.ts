import { ChannelSelectMenu, type ChannelSelectMenuBody } from '../structures/ChannelSelectMenu';

/**
 * Channel select menu model
 * @public
 * @example
 * ```ts
 * import { ChannelSelectMenuModel } from 'sucrose';
 *
 * export default class MyChannelSelectMenu extends ChannelSelectMenuModel {
 *   public override label = 'my-channel-select-menu';
 *
 *   public override body = {
 *     type: ComponentType.ChannelSelectMenu,
 *     placeholder: 'Select a channel',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-channel-select-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class ChannelSelectMenuModel extends ChannelSelectMenu {
  public abstract override label: string;

  public abstract override body: ChannelSelectMenuBody;
}
