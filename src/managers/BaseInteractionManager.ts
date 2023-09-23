import { Sucrose } from '../Sucrose';
import { BaseInteraction, type BaseInteractionData } from '../structures/BaseInteraction';
import { BaseManager } from './BaseManager';

/**
 * Base interaction manager options
 * @public
 */
export interface BaseInteractionManagerOptions {
  /**
   * sucrose client
   * @defaultValue `null`
   */
  sucrose?: Sucrose | null;
}

/**
 * Base interaction manager
 * @public
 */
export abstract class BaseInteractionManager<
  Params = { },
  Body = unknown,
  Model extends BaseInteraction<Params, Body> = BaseInteraction<Params, Body>,
  Data extends BaseInteractionData<Params, Body> = BaseInteractionData<Params, Body>,
> extends BaseManager<Model, Data> {
  /**
   * sucrose client
   */
  protected sucrose: Sucrose | null;

  constructor(options?: BaseInteractionManagerOptions) {
    super();

    this.sucrose = options?.sucrose || null;
  }
}
