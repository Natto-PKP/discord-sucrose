import type Discord from 'discord.js';
import type Sucrose from '../Sucrose';
import Base, { BaseData } from './Base';

export interface BaseExecutableParams {
  client: Discord.Client;
  sucrose: Sucrose;
}

export interface BaseExecutableData<P> extends BaseData {
  execute?: ((params: P) => Promise<unknown> | unknown) | null;
  beforeExecute?: ((params: P) => Promise<unknown> | unknown) | null;
  afterExecute?: ((params: P) => Promise<unknown> | unknown) | null;
  onError?: ((params: P & { error: Error }) => Promise<unknown> | unknown) | null;
}

export default class BaseExecutable<P = { }> extends Base {
  public execute?: ((params: P) => Promise<unknown> | unknown) | null;

  public beforeExecute?: ((params: P) => Promise<unknown> | unknown) | null;

  public afterExecute?: ((params: P) => Promise<unknown> | unknown) | null;

  public onError?: ((params: P & { error: Error }) => Promise<unknown> | unknown) | null;

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
}
