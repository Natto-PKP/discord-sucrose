import { ContextMenu, type ContextMenuBody } from '../structures/ContextMenu';

/**
 * Context menu model
 * @public
 * @example
 * ```ts
 * import { ContextMenuModel } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default class MyContextMenu extends ContextMenuModel {
 *   public override label = 'my-context-menu';
 *
 *   public override body = {
 *     type: ApplicationCommandType.Message,
 *     name: 'my-context-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class ContextMenuModel extends ContextMenu {
  public abstract override label: string;

  public abstract override body: ContextMenuBody;
}
