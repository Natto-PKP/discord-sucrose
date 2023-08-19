import { RoleSelectMenu, type RoleSelectMenuBody } from '../structures/RoleSelectMenu';

/**
 * Role select menu model
 * @public
 * @example
 * ```ts
 * import { RoleSelectMenuModel } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default class MyRoleSelectMenu extends RoleSelectMenuModel {
 *   public override label = 'my-role-select-menu';
 *
 *   public override body = {
 *     type: ComponentType.RoleSelectMenu,
 *     placeholder: 'Select a role',
 *     minValues: 1,
 *     customId: 'my-role-select-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class RoleSelectMenuModel extends RoleSelectMenu {
  public abstract override label: string;

  public abstract override body: RoleSelectMenuBody;
}
