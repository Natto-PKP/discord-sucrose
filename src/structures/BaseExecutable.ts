import type Discord from 'discord.js';
import { type Sucrose } from '../Sucrose';
import { Base, BaseData } from './Base';

export type Callback<P = { }, R = void> = (params: P) => R | Promise<R>;

/**
 * Base executable params
 * @public
 */
export interface BaseExecutableParams {
  /**
   * Discord client
   */
  client: Discord.Client;

  /**
   * Sucrose client
   */
  sucrose?: Sucrose | null;
}

/**
 * Base executable data
 * @public
 * @example
 * ```ts
 * import { BaseExecutableData } from 'sucrose';
 *
 * export default <BaseExecutableData>{
 *   label: 'my-executable',
 *   execute: () => console.log('Hello world!'),
 *   beforeExecute: () => console.log('Before execute!'),
 * };
 * ```
 */
export interface BaseExecutableData<P> extends BaseData {
  /**
   * This function will be executed when the interaction is triggered
   */
  execute?: Callback<P & BaseExecutableParams> | null;

  /**
   * This function will be executed before the interaction is triggered
   */
  beforeExecute?: Callback<P & BaseExecutableParams> | null;

  /**
   * This function will be executed after the interaction is triggered
   */
  afterExecute?: Callback<P & BaseExecutableParams> | null;

  /**
   * This function will be executed when an error occurs
   */
  onError?: Callback<P & BaseExecutableParams & { error: Error }> | null;
}

/**
 * Base executable
 * @public
 * @example
 * ```ts
 * import { BaseExecutable } from 'sucrose';
 *
 * const executable = new BaseExecutable();
 * executable.setLabel('my-executable');
 * executable.setExecute(() => console.log('Hello world!'));
 * executable.setBeforeExecute(() => console.log('Before execute!'));
 *
 * export default executable;
 * ```
 * @example
 * ```ts
 * import { BaseExecutable } from 'sucrose';
 * import { ApplicationCommandType } from 'discord.js';
 *
 * export default new BaseExecutable({
 *   label: 'my-executable',
 *   execute: () => console.log('Hello world!'),
 *   beforeExecute: () => console.log('Before execute!'),
 * });
 * ```
 */
export class BaseExecutable<P> extends Base {
  /**
   * This function will be executed when the interaction is triggered
   */
  public execute?: BaseExecutableData<P>['execute'];

  /**
   * This function will be executed before the interaction is triggered
   */
  public beforeExecute?: BaseExecutableData<P>['beforeExecute'];

  /**
   * This function will be executed after the interaction is triggered
   */
  public afterExecute?: BaseExecutableData<P>['afterExecute'];

  /**
   * This function will be executed when an error occurs
   */
  public onError?: BaseExecutableData<P>['onError'];

  constructor(data?: BaseExecutableData<P> | BaseExecutable<P> | string | null) {
    super(data);

    if (!data || typeof data === 'string') return;
    this.execute = data.execute ?? null;
    this.beforeExecute = data.beforeExecute ?? null;
    this.afterExecute = data.afterExecute ?? null;
    this.onError = data.onError ?? null;
  }

  public override get data(): BaseExecutableData<P> {
    return {
      ...super.data,
      execute: this.execute,
      beforeExecute: this.beforeExecute,
      afterExecute: this.afterExecute,
      onError: this.onError,
    };
  }

  /**
   * Set the execute function
   * @param execute - This function will be executed when the interaction is triggered
   * @returns - this
   */
  public setExecute(execute: BaseExecutableData<P>['execute']): this {
    this.execute = execute;
    return this;
  }

  /**
   * Set the beforeExecute function
   * @param beforeExecute - This function will be executed before the interaction is triggered
   * @returns - this
   */
  public setBeforeExecute(beforeExecute: BaseExecutableData<P>['beforeExecute']): this {
    this.beforeExecute = beforeExecute;
    return this;
  }

  /**
   * Set the afterExecute function
   * @param afterExecute - This function will be executed after the interaction is triggered
   * @returns - this
   */
  public setAfterExecute(afterExecute: BaseExecutableData<P>['afterExecute']): this {
    this.afterExecute = afterExecute;
    return this;
  }

  /**
   * Set the onError function
   * @param onError - This function will be executed when an error occurs
   * @returns - this
   */
  public setOnError(onError: BaseExecutableData<P>['onError']): this {
    this.onError = onError;
    return this;
  }
}
