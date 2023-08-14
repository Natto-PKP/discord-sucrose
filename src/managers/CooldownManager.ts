import Discord from 'discord.js';
import Cooldown, { CooldownData } from '../structures/Cooldown';
import BaseManager from './BaseManager';

export type CooldownValue = {
  key: string;
  expireAt: number;
  currentStack?: number | null;
  stackLimit?: number | null;
};

export default class CooldownManager extends BaseManager<Cooldown, CooldownData> {
  protected override readonly _structure = Cooldown;

  public cache = new Discord.Collection<string, CooldownValue>();

  public isExpired(cooldown: string | CooldownValue): boolean {
    const c = typeof cooldown === 'string' ? this.get(cooldown) : cooldown;
    return c ? c.expireAt <= Date.now() : true;
  }

  public remaining(cooldown: string | CooldownValue): number {
    const c = typeof cooldown === 'string' ? this.get(cooldown) : cooldown;
    return c ? c.expireAt - Date.now() : 0;
  }

  public get(cooldown: string): CooldownValue | undefined {
    return this.cache.get(cooldown);
  }

  public set(cooldown: CooldownValue): CooldownValue {
    this.cache.set(cooldown.key, cooldown);
    return cooldown;
  }
}
