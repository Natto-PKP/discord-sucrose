import Command, { type CommandBody } from '../structures/Command';

export default abstract class CommandModel extends Command {
  public abstract override label: string;

  public abstract override body: CommandBody;
}
