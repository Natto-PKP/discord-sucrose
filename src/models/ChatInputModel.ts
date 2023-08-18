import ChatInput, { type ChatInputBody } from '../structures/ChatInput';

/**
 * Chat input model
 * @public
 * @example
 * ```ts
 * import { ChatInputModel } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default class MyChatInput extends ChatInputModel {
 *   public override label = 'my-chat-input';
 *
 *   public override body = {
 *     type: ApplicationCommandType.ChatInput,
 *     description: 'My chat input',
 *     name: 'my-chat-input',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export default abstract class ChatInputModel extends ChatInput {
  public abstract override label: string;

  public abstract override body: ChatInputBody;
}
