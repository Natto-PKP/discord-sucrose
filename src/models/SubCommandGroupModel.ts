import SubCommandGroup, { type SubCommandGroupBody } from '../structures/SubCommandGroup';

export default abstract class SubCommandGroupModel extends SubCommandGroup {
  public abstract override label: string;

  public abstract override body: SubCommandGroupBody;
}
