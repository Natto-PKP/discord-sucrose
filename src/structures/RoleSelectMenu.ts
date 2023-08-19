import type Discord from 'discord.js';
import { SelectMenu, type SelectMenuData, type SelectMenuParams } from './SelectMenu';

/**
 * RoleSelectMenu body
 * @public
 */
export type RoleSelectMenuBody = Discord.RoleSelectMenuBuilder
| Discord.RoleSelectMenuComponent
| Discord.RoleSelectMenuComponentData;

/**
 * RoleSelectMenu params
 * @public
 */
export interface RoleSelectMenuParams extends SelectMenuParams {
  interaction: Discord.RoleSelectMenuInteraction;
}

/**
 * RoleSelectMenu data
 * @public
 * @example
 * ```ts
 * import { RoleSelectMenuData } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default <RoleSelectMenuData>{
 *   label: 'my-role-select-menu',
 *   body: {
 *     type: ComponentType.RoleSelectMenu,
 *     placeholder: 'Select a role',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-role-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface RoleSelectMenuData
  extends SelectMenuData<RoleSelectMenuParams, RoleSelectMenuBody> {
  body: RoleSelectMenuBody;
}

/**
 * RoleSelectMenu
 * @public
 * @example
 * ```ts
 * import { RoleSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const roleSelectMenu = new RoleSelectMenu();
 * roleSelectMenu.setLabel('my-role-select-menu');
 * roleSelectMenu.setExecute(() => console.log('Hello world!'));
 * roleSelectMenu.setBody({
 *   type: ComponentType.RoleSelectMenu,
 *   placeholder: 'Select a role',
 *   minValues: 1,
 *   maxValues: 1,
 *   customId: 'my-role-select-menu',
 * });
 *
 * export default roleSelectMenu;
 * ```
 * @example
 * ```ts
 * import { RoleSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const data = <RoleSelectMenuData>{
 *   label: 'my-role-select-menu',
 *   body: {
 *     type: ComponentType.RoleSelectMenu,
 *     placeholder: 'Select a role',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-role-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new RoleSelectMenu(data);
 * ```
 */
export class RoleSelectMenu
  extends SelectMenu<RoleSelectMenuParams, RoleSelectMenuBody> { }
