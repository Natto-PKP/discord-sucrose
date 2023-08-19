import { UserContextMenu, type UserContextMenuBody } from '../structures/UserContextMenu';

/**
 * User context menu model
 * @public
 * @example
 * ```ts
 * import { UserContextMenuModel } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default class MyUserContextMenu extends UserContextMenuModel {
 *   public override label = 'my-user-context-menu';
 *
 *   public override body = {
 *     type: ApplicationCommandType.User,
 *     name: 'my-user-context-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class UserContextMenuModel extends UserContextMenu {
  public abstract override label: string;

  public abstract override body: UserContextMenuBody;
}
