import BaseInteraction from '../structures/BaseInteraction';

export default abstract class BaseInteractionModel<P = { }, B = unknown>
  extends BaseInteraction<P, B> {
  public abstract override label: string;

  public abstract override body: B;
}
