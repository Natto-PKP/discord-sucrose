import Button, { type ButtonBody } from '../structures/Button';

export default abstract class ButtonModel extends Button {
  public abstract override label: string;

  public abstract override body: ButtonBody;
}
