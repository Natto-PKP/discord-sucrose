import ChatInput, { type ChatInputBody } from '../structures/ChatInput';

export default abstract class ChatInputModel extends ChatInput {
  public abstract override label: string;

  public abstract override body: ChatInputBody;
}
