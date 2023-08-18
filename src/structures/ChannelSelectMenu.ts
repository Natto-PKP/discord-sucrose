import type Discord from 'discord.js';
import SelectMenu, { type SelectMenuData, type SelectMenuParams } from './SelectMenu';

/**
 * Body of the channel select menu, discord.js will handle this
 * @public
 */
export type ChannelSelectMenuBody = Discord.ChannelSelectMenuBuilder
| Discord.ChannelSelectMenuComponent
| Discord.ChannelSelectMenuComponentData;

/**
 * Channel select menu params
 * @public
 */
export interface ChannelSelectMenuParams extends SelectMenuParams {
  /**
   * Discord channel select menu interaction, param of InteractionCreate event
   */
  interaction: Discord.ChannelSelectMenuInteraction;
}

/**
 * Channel select menu data
 * @public
 * @example
 * ```ts
 * import { ChannelSelectMenuData } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default <ChannelSelectMenuData>{
 *   label: 'my-channel-select-menu',
 *   body: {
 *     type: ComponentType.ChannelSelectMenu,
 *     placeholder: 'Select a channel',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-channel-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface ChannelSelectMenuData
  extends SelectMenuData<ChannelSelectMenuParams, ChannelSelectMenuBody> {
  body: ChannelSelectMenuBody;
}

/**
 * Channel select menu
 * @public
 * @example
 * ```ts
 * import { ChannelSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const channelSelectMenu = new ChannelSelectMenu();
 * channelSelectMenu.setLabel('my-channel-select-menu');
 * channelSelectMenu.setExecute(() => console.log('Hello world!'));
 * channelSelectMenu.setBody({
 *   type: ComponentType.ChannelSelectMenu,
 *   placeholder: 'Select a channel',
 *   minValues: 1,
 *   maxValues: 1,
 *   customId: 'my-channel-select-menu',
 * });
 *
 * export default channelSelectMenu;
 * ```
 * @example
 * ```ts
 * import { ChannelSelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const data = <ChannelSelectMenuData>{
 *   label: 'my-channel-select-menu',
 *   body: {
 *     type: ComponentType.ChannelSelectMenu,
 *     placeholder: 'Select a channel',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-channel-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export default class ChannelSelectMenu
  extends SelectMenu<ChannelSelectMenuParams, ChannelSelectMenuBody> { }
