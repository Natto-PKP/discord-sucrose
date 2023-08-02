import Base, { type BaseData } from './Base';
import type { BaseExecute, BaseExecuteParams } from './BaseExecutable';

export interface CooldownExecuteParams extends BaseExecuteParams {
  self: Cooldown;
  args: any[];
}

export type CooldownType = 'SHARED' | 'PER_USER' | 'PER_GUILD' | 'PER_CHANNEL' | 'PER_ROLE' | 'CUSTOM';

export type CooldownData<P = { }> = BaseData & ({
  type: 'SHARED' | 'PER_USER' | 'PER_GUILD' | 'PER_CHANNEL' | 'PER_ROLE';
  allowed?: string[] | null;
  denied?: string[] | null;
} | {
  type: 'CUSTOM';
  condition?: BaseExecute<P, boolean> | null;
}) & {
  duration: number;
  stack?: number | null;
};

const CooldownTypes = ['SHARED', 'PER_USER', 'PER_GUILD', 'PER_CHANNEL', 'PER_ROLE', 'CUSTOM'] as CooldownType[];

export default class Cooldown<Params extends any = { }> extends Base<CooldownData<Params>> {
  public override verify(data?: CooldownData<Params>) {
    const object = data ?? this.data;

    super.verify(object);

    if (!object.duration) throw new Error('data.duration is required.');
    if (typeof object.duration !== 'number') throw new Error('data.duration must be a number.');
    if (object.duration < 0) throw new Error('data.duration must be a positive number.');
    if (object.stack && typeof object.stack !== 'number') throw new Error('data.stack must be a number.');
    if (object.stack && object.stack < 0) throw new Error('data.stack must be a positive number.');
    if (!object.type) throw new Error('data.type is required.');
    if (!CooldownTypes.includes(object.type)) throw new Error(`data.type must be one of ${CooldownTypes.join(', ')}.`);
    if (object.type === 'CUSTOM' && !object.condition) throw new Error('data.condition is required.');

    if (object.type !== 'CUSTOM') {
      if (object.allowed && !Array.isArray(object.allowed)) throw new Error('data.allowed must be an array.');
      if (object.allowed && !object.allowed.every((id) => typeof id === 'string')) throw new Error('data.allowed must be an array of strings.');
      if (object.denied && !Array.isArray(object.denied)) throw new Error('data.denied must be an array.');
      if (object.denied && !object.denied.every((id) => typeof id === 'string')) throw new Error('data.denied must be an array of strings.');
    }

    return true;
  }

  public addAllowed(id: string): this {
    if (this.data.type === 'CUSTOM') throw new Error('Cannot add allowed to a CUSTOM cooldown.');
    if (!this.data.allowed) this.data.allowed = [];
    this.data.allowed.push(id);
    return this;
  }

  public addDenied(id: string): this {
    if (this.data.type === 'CUSTOM') throw new Error('Cannot add denied to a CUSTOM cooldown.');
    if (!this.data.denied) this.data.denied = [];
    this.data.denied.push(id);
    return this;
  }

  public removeAllowed(id: string): this {
    if (this.data.type === 'CUSTOM') throw new Error('Cannot remove allowed to a CUSTOM cooldown.');
    if (!this.data.allowed) return this;
    this.data.allowed = this.data.allowed.filter((i) => i !== id);
    return this;
  }

  public removeDenied(id: string): this {
    if (this.data.type === 'CUSTOM') throw new Error('Cannot remove denied to a CUSTOM cooldown.');
    if (!this.data.denied) return this;
    this.data.denied = this.data.denied.filter((i) => i !== id);
    return this;
  }

  public setDuration(duration: number): this {
    this.data.duration = duration;
    return this;
  }

  public setStack(stack: number | null): this {
    this.data.stack = stack;
    return this;
  }

  public setType(type: CooldownType): this {
    this.data.type = type;
    return this;
  }

  public setAllowed(allowed: string[] | null): this {
    if (this.data.type === 'CUSTOM') throw new Error('Cannot set allowed to a CUSTOM cooldown.');
    this.data.allowed = allowed;
    return this;
  }

  public setDenied(denied: string[] | null): this {
    if (this.data.type === 'CUSTOM') throw new Error('Cannot set denied to a CUSTOM cooldown.');
    this.data.denied = denied;
    return this;
  }

  public setCondition(condition: BaseExecute<Params, true> | null): this {
    if (this.data.type !== 'CUSTOM') throw new Error('Cannot set condition to a non CUSTOM cooldown.');
    this.data.condition = condition;
    return this;
  }

  public get condition() {
    return 'condition' in this.data ? this.data.condition ?? null : null;
  }

  public get allowed(): string[] | null {
    return 'allowed' in this.data ? this.data.allowed ?? null : null;
  }

  public get denied(): string[] | null {
    return 'denied' in this.data ? this.data.denied ?? null : null;
  }

  public get type(): CooldownType | null {
    return this.data.type;
  }

  public get duration(): number {
    return this.data.duration;
  }

  public get stack(): number | null {
    return this.data.stack ?? null;
  }
}
