import type Discord from 'discord.js';
import { Command, type CommandData, type CommandParams } from './Command';

/**
 * Body of the context menu, discord.js will handle this
 * @public
 */
export type ContextMenuBody = Discord.ContextMenuCommandBuilder
| Discord.UserApplicationCommandData | Discord.MessageApplicationCommandData;

/**
 * Context menu params
 * @public
 */
export interface ContextMenuParams extends CommandParams {
  interaction: Discord.UserContextMenuCommandInteraction
  | Discord.MessageContextMenuCommandInteraction;
}

/**
 * Context menu data
 * @public
 * @example
 * ```ts
 * import { ContextMenuData } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default <ContextMenuData>{
 *   label: 'my-context-menu',
 *   body: {
 *     name: 'my-context-menu',
 *     type: ApplicationCommandType.User,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 */
export interface ContextMenuData<P = ContextMenuParams, B = ContextMenuBody>
  extends CommandData<P, B> {
  body: B;
}

/**
 * Context menu
 * @public
 * @example
 * ```ts
 * import { ContextMenu } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const contextMenu = new ContextMenu();
 * contextMenu.setLabel('my-context-menu');
 * contextMenu.setExecute(() => console.log('Hello world!'));
 * contextMenu.setBody({
 *   name: 'my-context-menu',
 *   type: ApplicationCommandType.User,
 * });
 *
 * export default contextMenu;
 * ```
 * @example
 * ```ts
 * import { ContextMenu } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const data = <ContextMenuData>{
 *   label: 'my-context-menu',
 *   body: {
 *     name: 'my-context-menu',
 *     type: ApplicationCommandType.User,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new ContextMenu(data);
 * ```
 */
export class ContextMenu<P = ContextMenuParams, B = ContextMenuBody>
  extends Command<P, B> { }
