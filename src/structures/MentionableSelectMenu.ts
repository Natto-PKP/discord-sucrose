import type Discord from 'discord.js';
import SelectMenu, { type SelectMenuData, type SelectMenuParams } from './SelectMenu';

/**
 * Mentionable select menu body
 * @public
 */
export type MentionableSelectMenuBody = Discord.MentionableSelectMenuBuilder
| Discord.MentionableSelectMenuComponent
| Discord.MentionableSelectMenuComponentData;

/**
 * Mentionable select menu params
 * @public
 */
export interface MentionableSelectMenuParams extends SelectMenuParams {
  interaction: Discord.MentionableSelectMenuInteraction;
}

/**
 * Mentionable select menu data
 * @public
 * @example
 * ```ts
 * import { MentionableSelectMenuData } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default <MentionableSelectMenuData>{
 *   label: 'my-mentionable-select-menu',
 *   body: {
 *     type: ComponentType.SelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-mentionable-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface MentionableSelectMenuData
  extends SelectMenuData<MentionableSelectMenuParams, MentionableSelectMenuBody> {
  body: MentionableSelectMenuBody;
}

/**
 * Mentionable select menu
 * @public
 * @example
 * ```ts
 * import { MentionableSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const mentionableSelectMenu = new MentionableSelectMenu();
 * mentionableSelectMenu.setLabel('my-mentionable-select-menu');
 * mentionableSelectMenu.setExecute(() => console.log('Hello world!'));
 * mentionableSelectMenu.setBody({
 *   type: ComponentType.SelectMenu,
 *   placeholder: 'Select an option',
 *   minValues: 1,
 *   maxValues: 1,
 *   customId: 'my-mentionable-select-menu',
 * });
 *
 * export default mentionableSelectMenu;
 * ```
 * @example
 * ```ts
 * import { MentionableSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const data = <MentionableSelectMenuData>{
 *   label: 'my-mentionable-select-menu',
 *   body: {
 *     type: ComponentType.SelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-mentionable-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new MentionableSelectMenu(data);
 * ```
 */
export default class MentionableSelectMenu
  extends SelectMenu<MentionableSelectMenuParams, MentionableSelectMenuBody> { }
