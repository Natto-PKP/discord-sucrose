import BaseInteraction, { type BaseInteractionData } from '../structures/BaseInteraction';
import BaseManager from './BaseManager';

export default abstract class BaseInteractionManager<
  Params = { },
  Body = unknown,
  Model extends BaseInteraction<Params, Body> = BaseInteraction<Params, Body>,
  Data extends BaseInteractionData<Params, Body> = BaseInteractionData<Params, Body>,
> extends BaseManager<Model, Data> { }
