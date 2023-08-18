import MessageContextMenu, { type MessageContextMenuBody } from '../structures/MessageContextMenu';

/**
 * Message context menu model
 * @public
 * @example
 * ```ts
 * import { MessageContextMenuModel } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default class MyMessageContextMenu extends MessageContextMenuModel {
 *   public override label = 'my-message-context-menu';
 *
 *   public override body = {
 *     type: ApplicationCommandType.Message,
 *     name: 'my-message-context-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export default abstract class MessageContextMenuModel extends MessageContextMenu {
  public abstract override label: string;

  public abstract override body: MessageContextMenuBody;
}
