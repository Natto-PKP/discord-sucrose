import BaseInteraction, { type BaseInteractionData } from '../structures/BaseInteraction';
import BaseManager from './BaseManager';

export default abstract class BaseInteractionManager<
  Data extends BaseInteractionData,
  Builder extends BaseInteraction,
> extends BaseManager<Data, Builder> {

}
