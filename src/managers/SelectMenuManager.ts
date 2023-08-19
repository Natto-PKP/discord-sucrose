import {
  SelectMenu, type SelectMenuData, type SelectMenuParams, type SelectMenuBody,
} from '../structures/SelectMenu';
import { BaseInteractionManager } from './BaseInteractionManager';

/**
 * Select menu manager
 * @public
 */
export class SelectMenuManager extends BaseInteractionManager<
SelectMenuParams,
SelectMenuBody,
SelectMenu,
SelectMenuData
> {
  protected override readonly _structure = SelectMenu;
}
