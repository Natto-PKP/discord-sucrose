import { Button, type ButtonBody } from '../structures/Button';

/**
 * Button model
 * @public
 * @example
 * ```ts
 * import { ButtonModel } from 'sucrose';
 * import { ComponentType } from 'discord.js';
 *
 * export default class MyButton extends ButtonModel {
 *   public override label = 'my-button';
 *
 *   public override body = {
 *     type: ComponentType.Button,
 *     style: 'PRIMARY',
 *     label: 'Click me!',
 *     customId: 'my-button',
 *   };
 *
 *   public override execute() {
 *     console.log('Hello world!');
 *   }
 * }
 * ```
 */
export abstract class ButtonModel extends Button {
  public abstract override label: string;

  public abstract override body: ButtonBody;
}
