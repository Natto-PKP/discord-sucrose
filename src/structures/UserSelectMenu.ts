import type Discord from 'discord.js';
import { SelectMenu, type SelectMenuData, type SelectMenuParams } from './SelectMenu';

/**
 * Body of the user select menu, discord.js will handle this
 * @public
 */
export type UserSelectMenuBody = Discord.UserSelectMenuBuilder
| Discord.UserSelectMenuComponent
| Discord.UserSelectMenuComponentData;

/**
 * User select menu params
 * @public
 */
export interface UserSelectMenuParams extends SelectMenuParams {
  interaction: Discord.UserSelectMenuInteraction;
}

/**
 * User select menu data
 * @public
 * @example
 * ```ts
 * import { UserSelectMenuData } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default <UserSelectMenuData>{
 *   label: 'my-user-select-menu',
 *   body: {
 *     type: ComponentType.UserSelectMenu,
 *     placeholder: 'Select a user',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-user-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export type UserSelectMenuData = SelectMenuData<UserSelectMenuParams, UserSelectMenuBody>;

/**
 * User select menu
 * @public
 * @example
 * ```ts
 * import { UserSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const userSelectMenu = new UserSelectMenu();
 * userSelectMenu.setLabel('my-user-select-menu');
 * userSelectMenu.setExecute(() => console.log('Hello world!'));
 * userSelectMenu.setBody({
 *   type: ComponentType.UserSelectMenu,
 *   placeholder: 'Select a user',
 *   minValues: 1,
 *   maxValues: 1,
 *   customId: 'my-user-select-menu',
 * });
 *
 * export default userSelectMenu;
 * ```
 * @example
 * ```ts
 * import { UserSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const data = <UserSelectMenuData>{
 *   label: 'my-user-select-menu',
 *   body: {
 *     type: ComponentType.UserSelectMenu,
 *     placeholder: 'Select a user',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-user-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default data;
 * ```
 */
export class UserSelectMenu
  extends SelectMenu<UserSelectMenuParams, UserSelectMenuBody> { }
