import StringSelectMenu, { type StringSelectMenuBody } from '../structures/StringSelectMenu';

/**
 * String select menu model
 * @public
 * @example
 * ```ts
 * import { StringSelectMenuModel } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default class MyStringSelectMenu extends StringSelectMenuModel {
 *   public override label = 'my-string-select-menu';
 *
 *   public override body = {
 *     type: ComponentType.SelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-string-select-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export default abstract class StringSelectMenuModel extends StringSelectMenu {
  public abstract override label: string;

  public abstract override body: StringSelectMenuBody;
}
