import type Discord from 'discord.js';
import SelectMenu, { type SelectMenuData, type SelectMenuParams } from './SelectMenu';

/**
 * Body of the string select menu, discord.js will handle this
 * @public
 */
export type StringSelectMenuBody = Discord.StringSelectMenuBuilder
| Discord.StringSelectMenuComponent
| Discord.StringSelectMenuComponentData;

/**
 * String select menu params
 * @public
 */
export interface StringSelectMenuParams extends SelectMenuParams {
  interaction: Discord.StringSelectMenuInteraction;
}

/**
 * String select menu data
 * @public
 * @example
 * ```ts
 * import { StringSelectMenuData } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default <StringSelectMenuData>{
 *   label: 'my-string-select-menu',
 *   body: {
 *     type: ComponentType.StringSelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-string-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface StringSelectMenuData
  extends SelectMenuData<StringSelectMenuParams, StringSelectMenuBody> {
  body: StringSelectMenuBody;
}

/**
 * String select menu
 * @public
 * @example
 * ```ts
 * import { StringSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const stringSelectMenu = new StringSelectMenu();
 * stringSelectMenu.setLabel('my-string-select-menu');
 * stringSelectMenu.setExecute(() => console.log('Hello world!'));
 * stringSelectMenu.setBody({
 *   type: ComponentType.StringSelectMenu,
 *   placeholder: 'Select an option',
 *   minValues: 1,
 *   maxValues: 1,
 *   customId: 'my-string-select-menu',
 * });
 *
 * export default stringSelectMenu;
 * ```
 * @example
 * ```ts
 * import { StringSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const data = <StringSelectMenuData>{
 *   label: 'my-string-select-menu',
 *   body: {
 *     type: ComponentType.StringSelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-string-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default data;
 * ```
 */
export default class StringSelectMenu
  extends SelectMenu<StringSelectMenuParams, StringSelectMenuBody> { }
