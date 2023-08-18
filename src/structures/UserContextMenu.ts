import type Discord from 'discord.js';
import ContextMenu, { type ContextMenuData, type ContextMenuParams } from './ContextMenu';

/**
 * User context menu body
 * @public
 */
export type UserContextMenuBody = Discord.UserApplicationCommandData
| Discord.ContextMenuCommandBuilder;

/**
 * User context menu params
 * @public
 */
export interface UserContextMenuParams extends ContextMenuParams {
  interaction: Discord.UserContextMenuCommandInteraction;
}

/**
 * User context menu data
 * @public
 * @example
 * ```ts
 * import { UserContextMenuData } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default <UserContextMenuData>{
 *   label: 'my-user-context-menu',
 *   body: {
 *     name: 'my-user-context-menu',
 *     type: ApplicationCommandType.User,
 *     description: 'My user context menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface UserContextMenuData
  extends ContextMenuData<UserContextMenuParams, UserContextMenuBody> {
  body: UserContextMenuBody;
}

/**
 * User context menu
 * @public
 * @example
 * ```ts
 * import { UserContextMenu } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const userContextMenu = new UserContextMenu();
 * userContextMenu.setLabel('my-user-context-menu');
 * userContextMenu.setExecute(() => console.log('Hello world!'));
 * userContextMenu.setBody({
 *   name: 'my-user-context-menu',
 *   type: ApplicationCommandType.User,
 *   description: 'My user context menu',
 * });
 *
 * export default userContextMenu;
 * ```
 * @example
 * ```ts
 * import { UserContextMenu } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const data = <UserContextMenuData>{
 *   label: 'my-user-context-menu',
 *   body: {
 *     name: 'my-user-context-menu',
 *     type: ApplicationCommandType.User,
 *     description: 'My user context menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new UserContextMenu(data);
 * ```
 */
export default class UserContextMenu
  extends ContextMenu<UserContextMenuParams, UserContextMenuBody> { }
