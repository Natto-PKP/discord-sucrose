import Button, { type ButtonData, type ButtonParams, type ButtonBody } from '../structures/Button';
import BaseInteractionManager from './BaseInteractionManager';

/**
 * Button manager
 * @public
 */
export default class ButtonManager extends BaseInteractionManager<
ButtonParams,
ButtonBody,
Button,
ButtonData
> {
  protected override readonly _structure = Button;
}
