import { MentionableSelectMenu, type MentionableSelectMenuBody } from '../structures/MentionableSelectMenu';

/**
 * Mentionable select menu model
 * @public
 * @example
 * ```ts
 * import { MentionableSelectMenuModel } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default class MyMentionableSelectMenu extends MentionableSelectMenuModel {
 *   public override label = 'my-mentionable-select-menu';
 *
 *   public override body = {
 *     type: ComponentType.MentionableSelectMenu,
 *     placeholder: 'Select a role',
 *     minValues: 1,
 *     customId: 'my-mentionable-select-menu',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class MentionableSelectMenuModel extends MentionableSelectMenu {
  public abstract override label: string;

  public abstract override body: MentionableSelectMenuBody;
}
