import { UserSelectMenu, type UserSelectMenuBody } from '../structures/UserSelectMenu';

/**
 * User select menu model
 * @public
 * @example
 * ```ts
 * import { UserSelectMenuModel } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default class MyUserSelectMenu extends UserSelectMenuModel {
 *   public override label = 'my-user-select-menu';
 *
 *   public override body = {
 *     type: ComponentType.SelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-user-select-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class UserSelectMenuModel extends UserSelectMenu {
  public abstract override label: string;

  public abstract override body: UserSelectMenuBody;
}
