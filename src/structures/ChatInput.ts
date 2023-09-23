import Discord from 'discord.js';
import { Command, type CommandData, type CommandParams } from './Command';

/**
 * Body of the chat input, discord.js will handle this
 * @public
 */
export type ChatInputBody = Discord.ChatInputApplicationCommandData | Discord.SlashCommandBuilder;

/**
 * Chat input params
 * @public
 */
export interface ChatInputParams extends CommandParams {
  interaction: Discord.ChatInputCommandInteraction;
}

/**
 * Chat input data
 * @public
 * @example
 * ```ts
 * import { ChatInputData } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * export default <ChatInputData>{
 *   label: 'my-chat-input',
 *   body: {
 *     name: 'my-chat-input',
 *     description: 'My chat input',
 *     type: ApplicationCommandOptionType.Subcommand,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 */
export interface ChatInputData extends CommandData<ChatInputParams, ChatInputBody> {
  /**
   * Chat input options
   */
  // options?: (SubCommandData | SubCommand | SubCommandGroupData | SubCommandGroup)[] | null;
}

/**
 * Chat input
 * @public
 * @example
 * ```ts
 * import { ChatInput } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * const chatInput = new ChatInput();
 * chatInput.setLabel('my-chat-input');
 * chatInput.setExecute(() => console.log('Hello world!'));
 * chatInput.setBody({
 *   name: 'my-chat-input',
 *   description: 'My chat input',
 *   type: ApplicationCommandOptionType.Subcommand,
 * });
 *
 * export default chatInput;
 * ```
 * @example
 * ```ts
 * import { ChatInput } from 'sucrose';
 * import { ApplicationCommandOptionType } from 'discord.js';
 *
 * const data = <ChatInputData>{
 *   label: 'my-chat-input',
 *   body: {
 *     name: 'my-chat-input',
 *     description: 'My chat input',
 *     type: ApplicationCommandOptionType.Subcommand,
 *   },
 *   execute: () => console.log('Hello world!'),
 *   permissions: ['ADMINISTRATOR'],
 * };
 *
 * export default new ChatInput(data);
 */
export class ChatInput extends Command<ChatInputParams, ChatInputBody> {
  /**
   * add chat input options
   * @param options - Chat input options
   * @returns - this
   */
  // public addOptions(...options: (SubCommand | SubCommandGroup)[]): this {
  //   if (!this.options) this.options = [];

  //   options.forEach((option) => {
  //     if (!option.label) return;
  //     this.options?.push(option);
  //   });

  //   return this;
  // }

  /**
   * remove chat input options
   * @param options - Chat input options
   * @returns - this
   */
  // public removeOptions(...options: (SubCommand | SubCommandGroup)[]): this {
  //   if (!this.options) return this;

  //   options.forEach((option) => {
  //     if (!option.label) return;
  //     this.options?.delete(option.label);
  //   });

  //   return this;
  // }

  /**
   * set chat input options
   * @param options - Chat input options
   * @returns - this
   */
  // public setOptions(options: ChatInputData['options']): this {
  //   this.options = options;

  //   return this;
  // }

  public override get data(): ChatInputData {
    return {
      ...super.data,
      // options: this.options?.map((option) => option.data) || null,
    };
  }
}
