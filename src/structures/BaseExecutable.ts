import type Discord from 'discord.js';
import type Sucrose from './Sucrose';
import Base, { type BaseData } from './Base';

export type BaseHooks<P = { }> = {
  beforeExecute: BaseExecute<P> | null;
  afterExecute: BaseExecute<P> | null;
};

export interface BaseExecutableData<P = { }> extends BaseData {
  hooks?: Partial<BaseHooks<P>> | null;
  execute?: BaseExecute<P> | null;
}

export type BaseExecuteParams = { client: Discord.Client<true>; sucrose: Sucrose; };
export type DataHooks<Data extends { hooks?: unknown }> = NonNullable<Required<Data>['hooks']>;
export type DataExecute<Data extends { execute?: unknown }> = NonNullable<Data['execute']>;
export type BaseExecute<P = { }, R = unknown> = (params: P) => Promise<R> | R;

export default abstract class BaseExecutable<
  Params = { },
  Data extends BaseExecutableData<Params> = BaseExecutableData<Params>,
> extends Base<Data> {
  /**
   * Add hook
   * @param key - Hook key
   * @param hook - Hook
   * @returns - This
   */
  public addHook<K extends keyof DataHooks<Data>>(key: K, hook: DataHooks<Data>[K]): this {
    if (!this.data.hooks) this.data.hooks = { };
    this.data.hooks = { ...(this.data.hooks || { }), [key]: hook };
    return this;
  }

  /**
   * Remove hook
   * @param key - Hook key
   * @returns - This
   */
  public removeHook<K extends keyof DataHooks<Data>>(key: K): this {
    if (!this.data.hooks) return this;
    delete this.data.hooks[key as keyof BaseHooks<Params>];
    return this;
  }

  /**
  * Set hooks
  * @param hooks - Hooks
  * @returns - This
  */
  public setHooks(hooks: DataHooks<Data> | null): this {
    this.data.hooks = hooks;
    return this;
  }

  /**
    * Set execute
    * @param execute - Execute
    * @returns - This
    */
  public setExecute(execute: DataExecute<Data> | null): this {
    this.data.execute = execute;
    return this;
  }

  public override verify(data?: Data): boolean {
    const object = data ?? this.data;

    super.verify(object);

    if (object.hooks) {
      if (typeof object.hooks !== 'object') throw new TypeError('data.hooks must be an object');
      if (object.hooks.beforeExecute && typeof object.hooks.beforeExecute !== 'function') throw new TypeError('data.hooks.beforeExecute must be a function');
      if (object.hooks.afterExecute && typeof object.hooks.afterExecute !== 'function') throw new TypeError('data.hooks.afterExecute must be a function');
    }

    if (object.execute && typeof object.execute !== 'function') throw new TypeError('data.execute must be a function');

    return true;
  }

  public get hooks() {
    return this.data.hooks;
  }

  public get execute() {
    return this.data.execute;
  }
}
