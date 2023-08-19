import { SelectMenu, type SelectMenuBody } from '../structures/SelectMenu';

/**
 * Select menu model
 * @public
 * @example
 * ```ts
 * import { SelectMenuModel } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default class MySelectMenu extends SelectMenuModel {
 *   public override label = 'my-select-menu';
 *
 *   public override body = {
 *     type: ComponentType.SelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-select-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class SelectMenuModel extends SelectMenu {
  public abstract override label: string;

  public abstract override body: SelectMenuBody;
}
