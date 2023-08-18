import type Discord from 'discord.js';
import { Callback } from 'typings';
import type Sucrose from '../Sucrose';
import Base, { BaseData } from './Base';

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
 * Base executable callback
 * @internal
 */
export type BaseExecutableCallback<P = { }> = Callback<P & BaseExecutableParams>;

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
export interface BaseExecutableData<P = { }> extends BaseData {
  /**
   * This function will be executed when the interaction is triggered
   */
  execute?: BaseExecutableCallback<P> | null;

  /**
   * This function will be executed before the interaction is triggered
   */
  beforeExecute?: BaseExecutableCallback<P> | null;

  /**
   * This function will be executed after the interaction is triggered
   */
  afterExecute?: BaseExecutableCallback<P> | null;

  /**
   * This function will be executed when an error occurs
   */
  onError?: BaseExecutableCallback<P & { error: Error }> | null;
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
export default class BaseExecutable<P = { }> extends Base {
  /**
   * This function will be executed when the interaction is triggered
   */
  public execute?: BaseExecutableCallback<P> | null;

  /**
   * This function will be executed before the interaction is triggered
   */
  public beforeExecute?: BaseExecutableCallback<P> | null;

  /**
   * This function will be executed after the interaction is triggered
   */
  public afterExecute?: BaseExecutableCallback<P> | null;

  /**
   * This function will be executed when an error occurs
   */
  public onError?: BaseExecutableCallback<P & { error: Error }> | null;

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
  public setExecute(execute: BaseExecutableCallback<P> | null): this {
    this.execute = execute;
    return this;
  }

  /**
   * Set the beforeExecute function
   * @param beforeExecute - This function will be executed before the interaction is triggered
   * @returns - this
   */
  public setBeforeExecute(beforeExecute: BaseExecutableCallback<P> | null): this {
    this.beforeExecute = beforeExecute;
    return this;
  }

  /**
   * Set the afterExecute function
   * @param afterExecute - This function will be executed after the interaction is triggered
   * @returns - this
   */
  public setAfterExecute(afterExecute: BaseExecutableCallback<P> | null): this {
    this.afterExecute = afterExecute;
    return this;
  }

  /**
   * Set the onError function
   * @param onError - This function will be executed when an error occurs
   * @returns - this
   */
  public setOnError(onError: BaseExecutableCallback<P & { error: Error }> | null): this {
    this.onError = onError;
    return this;
  }
}
