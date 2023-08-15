import SubCommand, { type SubCommandBody } from '../structures/SubCommand';

export default abstract class SubCommandModel extends SubCommand {
  public abstract override label: string;

  public abstract override body: SubCommandBody;
}
