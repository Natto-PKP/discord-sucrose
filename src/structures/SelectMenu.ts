import type Discord from 'discord.js';
import BaseInteraction, { type BaseInteractionParams, type BaseInteractionData } from './BaseInteraction';

/**
 * Body of the select menu, discord.js will handle this
 * @public
 */
export type SelectMenuBuilder = Discord.RoleSelectMenuBuilder
| Discord.UserSelectMenuBuilder
| Discord.StringSelectMenuBuilder
| Discord.ChannelSelectMenuBuilder
| Discord.MentionableSelectMenuBuilder;

/**
 * Select menu component
 * @public
 */
export type SelectMenuComponent = Discord.MentionableSelectMenuComponent
| Discord.ChannelSelectMenuComponent
| Discord.StringSelectMenuComponent
| Discord.UserSelectMenuComponent
| Discord.RoleSelectMenuComponent;

/**
 * Select menu component data
 * @public
 */
export type SelectMenuComponentData = Discord.MentionableSelectMenuComponentData
| Discord.ChannelSelectMenuComponentData
| Discord.StringSelectMenuComponentData
| Discord.UserSelectMenuComponentData
| Discord.RoleSelectMenuComponentData;

/**
 * Select menu body
 * @public
 */
export type SelectMenuBody = SelectMenuBuilder | SelectMenuComponent | SelectMenuComponentData;

/**
 * Select menu params
 * @public
 */
export interface SelectMenuParams extends BaseInteractionParams {
  interaction: Discord.AnySelectMenuInteraction;
}

/**
 * Select menu data
 * @public
 * @example
 * ```ts
 * import { SelectMenuData } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default <SelectMenuData>{
 *   label: 'my-select-menu',
 *   body: {
 *     type: ComponentType.SelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface SelectMenuData<P = SelectMenuParams, B = SelectMenuBody>
  extends BaseInteractionData<P, B> {
  body: B;
}

/**
 * Select menu
 * @public
 * @example
 * ```ts
 * import { SelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const selectMenu = new SelectMenu();
 * selectMenu.setLabel('my-select-menu');
 * selectMenu.setExecute(() => console.log('Hello world!'));
 * selectMenu.setBody({
 *   type: ComponentType.SelectMenu,
 *   placeholder: 'Select an option',
 *   minValues: 1,
 *   maxValues: 1,
 *   customId: 'my-select-menu',
 * });
 *
 * export default selectMenu;
 * ```
 * @example
 * ```ts
 * import { SelectMenu } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * const data = <SelectMenuData>{
 *   label: 'my-select-menu',
 *   body: {
 *     type: ComponentType.SelectMenu,
 *     placeholder: 'Select an option',
 *     minValues: 1,
 *     maxValues: 1,
 *     customId: 'my-select-menu',
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new SelectMenu(data);
 * ```
 */
export default class SelectMenu<P = SelectMenuParams, B = SelectMenuBody>
  extends BaseInteraction<P, B> { }
