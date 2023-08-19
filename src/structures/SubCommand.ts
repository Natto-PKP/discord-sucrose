import type Discord from 'discord.js';
import { BaseInteraction, type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';

/**
 * Body of the sub command, discord.js will handle this
 * @public
 */
export type SubCommandBody = Discord.ApplicationCommandSubCommandData
| Discord.SlashCommandSubcommandBuilder;

/**
 * Sub command params
 * @public
 */
export interface SubCommandParams extends BaseInteractionParams {
  interaction: Discord.ChatInputCommandInteraction;
}

/**
 * Sub command data
 * @public
 * @example
 * ```ts
 * import { SubCommandData } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * export default <SubCommandData>{
 *   label: 'my-sub-command',
 *   body: {
 *     name: 'my-sub-command',
 *     description: 'My sub command',
 *     type: ApplicationCommandOptionType.Subcommand,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 * @example
 */
export interface SubCommandData extends BaseInteractionData<SubCommandParams, SubCommandBody> {
  body: SubCommandBody;
}

/**
 * Sub command
 * @public
 * @example
 * ```ts
 * import { SubCommandData } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * const subCommand = new SubCommand();
 * subCommand.setLabel('my-sub-command');
 * subCommand.setExecute(() => console.log('Hello world!'));
 * subCommand.setBody({
 *   name: 'my-sub-command',
 *   description: 'My sub command',
 *   type: ApplicationCommandOptionType.Subcommand,
 * });
 *
 * export default subCommand;
 * ```
 * @example
 * ```ts
 * import { SubCommandData } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * const data = <SubCommandData>{
 *   label: 'my-sub-command',
 *   body: {
 *     name: 'my-sub-command',
 *     description: 'My sub command',
 *     type: ApplicationCommandOptionType.Subcommand,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new SubCommand(data);
 * ```
 */
export class SubCommand extends BaseInteraction<SubCommandParams, SubCommandBody> { }
