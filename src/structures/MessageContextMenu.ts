import type Discord from 'discord.js';
import { ContextMenu, type ContextMenuData, type ContextMenuParams } from './ContextMenu';

/**
 * Message context menu body
 * @public
 */
export type MessageContextMenuBody = Discord.MessageApplicationCommandData
| Discord.ContextMenuCommandBuilder;

/**
 * Message context menu params
 * @public
 */
export interface MessageContextMenuParams extends ContextMenuParams {
  interaction: Discord.MessageContextMenuCommandInteraction;
}

/**
 * Message context menu data
 * @public
 * @example
 * ```ts
 * import { MessageContextMenuData } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default <MessageContextMenuData>{
 *   label: 'my-message-context-menu',
 *   body: {
 *     name: 'my-message-context-menu',
 *     type: ApplicationCommandType.Message,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export type MessageContextMenuData = ContextMenuData<
MessageContextMenuParams,
MessageContextMenuBody
>;

/**
 * Message context menu
 * @public
 * @example
 * ```ts
 * import { MessageContextMenu } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const messageContextMenu = new MessageContextMenu();
 * messageContextMenu.setLabel('my-message-context-menu');
 * messageContextMenu.setExecute(() => console.log('Hello world!'));
 * messageContextMenu.setBody({
 *   name: 'my-message-context-menu',
 *   type: ApplicationCommandType.Message,
 * });
 *
 * export default messageContextMenu;
 * ```
 * @example
 * ```ts
 * import { MessageContextMenu } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const data = <MessageContextMenuData>{
 *   label: 'my-message-context-menu',
 *   body: {
 *     name: 'my-message-context-menu',
 *     type: ApplicationCommandType.Message,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new MessageContextMenu(data);
 * ```
 */
export class MessageContextMenu
  extends ContextMenu<MessageContextMenuParams, MessageContextMenuBody> { }
