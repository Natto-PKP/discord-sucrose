import type Discord from 'discord.js';
import { BaseInteraction, type BaseInteractionData, type BaseInteractionParams } from './BaseInteraction';

/**
 * Body of the command, discord.js will handle this
 * @public
 */
export type CommandBodyBuilder = Discord.SlashCommandBuilder | Discord.ContextMenuCommandBuilder;

/**
 * Body of the command, discord.js will handle this
 * @public
 */
export type CommandBodyData = Discord.SlashCommandBuilder | Discord.ApplicationCommandData;

/**
 * Body of the command, discord.js will handle this
 * @public
 */
export type CommandBody = CommandBodyBuilder | CommandBodyData;

/**
 * Command params
 * @public
 */
export interface CommandParams extends BaseInteractionParams {
  interaction: Discord.ChatInputCommandInteraction
  | Discord.MessageContextMenuCommandInteraction
  | Discord.UserContextMenuCommandInteraction;
}

/**
 * Command data
 * @public
 * @example
 * ```ts
 * import { CommandData } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default <CommandData>{
 *   label: 'my-command',
 *   body: {
 *     name: 'my-command',
 *     description: 'My command',
 *     type: ApplicationCommandType.ChatInput,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export interface CommandData<P = CommandParams, B = CommandBody> extends BaseInteractionData<P, B> {

}

/**
 * Command
 * @public
 * @example
 * ```ts
 * import { Command } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const command = new Command();
 * command.setLabel('my-command');
 * command.setExecute(() => console.log('Hello world!'));
 * command.setBody({
 *   name: 'my-command',
 *   description: 'My command',
 *   type: ApplicationCommandType.ChatInput,
 * });
 *
 * export default command;
 * ```
 * @example
 * ```ts
 * import { Command } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * const data = <CommandData>{
 *   label: 'my-command',
 *   body: {
 *     name: 'my-command',
 *     description: 'My command',
 *     type: ApplicationCommandType.ChatInput,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 * ```
 */
export class Command<P = CommandParams, B = CommandBody>
  extends BaseInteraction<P, B> { }
