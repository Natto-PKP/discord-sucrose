import Discord from 'discord.js';
import { CooldownError } from '../errors/CooldownError';
import { Cooldown, type CooldownData, type CooldownExecuteParams } from '../structures/Cooldown';
import { BaseManager } from './BaseManager';

/**
 * cooldown value
 * @public
 */
export type CooldownValue = {
  key: string;
  beginAt: number;
  stack?: number | null;
};

/**
 * cooldown manager
 * @public
 */
export class CooldownManager extends BaseManager<Cooldown, CooldownData> {
  protected override readonly _structure = Cooldown;

  /**
   * cache of cooldowns
   */
  public cache = new Discord.Collection<string, CooldownValue>();

  /**
   * get when cooldown expires
   * @param cooldown - cooldown to check
   * @param value - cooldown value to check
   * @returns
   */
  public async expiresAt(
    cooldown: Cooldown | CooldownData | string,
    value: string | CooldownValue,
  ) {
    const v = typeof value === 'string' ? await this.get(value) : value;
    const c = this.resolve(cooldown);
    return v ? v.beginAt + ((c && c.duration) || 0) : 0;
  }

  /**
   * check if cooldown is expired
   * @param cooldown - cooldown to check
   * @param value - cooldown value to check
   */
  public async isExpired(
    cooldown: Cooldown | CooldownData | string,
    value: string | CooldownValue,
  ) {
    const c = typeof value === 'string' ? await this.get(value) : value;
    return c ? await this.expiresAt(cooldown, value) <= Date.now() : true;
  }

  /**
   * get remaining time on cooldown
   * @param cooldown - cooldown to check
   * @param value - cooldown value to check
   * @returns
   */
  public async remaining(
    cooldown: Cooldown | CooldownData | string,
    value: string | CooldownValue,
  ) {
    const c = typeof value === 'string' ? await this.get(value) : value;
    return c ? await this.expiresAt(cooldown, value) - Date.now() : 0;
  }

  /**
   * get cooldown value
   * @param key - key to get
   * @returns - cooldown value
   */
  public async get(key: string) {
    return this.cache.get(key);
  }

  /**
   * set cooldown value
   * @param value - cooldown value to set
   * @returns - cooldown value
   */
  public async set(value: CooldownValue) {
    this.cache.set(value.key, value);
    return value;
  }

  /**
   * check & handle colldowns
   * @param cooldowns
   * @param params
   */
  public async check(
    cooldowns: Cooldown | CooldownData | string | (Cooldown | CooldownData | string)[],
    params: CooldownExecuteParams,
  ) {
    const clds = Array.isArray(cooldowns) ? cooldowns : [cooldowns];

    await Promise.all(clds.map(async (c) => {
      const cooldown = this.resolve(c);
      if (!cooldown) return;

      if (cooldown.type === 'CHANNEL' || cooldown.type === 'GUILD' || cooldown.type === 'USER') {
        let id = null;
        if (cooldown.type === 'CHANNEL') id = params.channel?.id;
        else if (cooldown.type === 'GUILD') id = params.guild?.id;
        else if (cooldown.type === 'USER') id = params.user?.id;
        if (!id) return;

        const key = `${cooldown.label}:${id}`;

        if (cooldown.includes) {
          if (cooldown.includes.includes(id)) await this.handle(cooldown, key);
        } else if (cooldown.excludes) {
          if (!cooldown.excludes.includes(id)) await this.handle(cooldown, key);
        } else await this.handle(cooldown, key);
      } else if (cooldown.type === 'ROLE') {
        if (!params.member) return;
        const roles = Array.isArray(params.member.roles)
          ? params.member.roles
          : params.member.roles.cache.map((r) => r.id);
        const key = `${cooldown.label}:role:${params.member.user.id}`;

        if (cooldown.includes) {
          if (cooldown.includes.some((r) => roles.includes(r))) await this.handle(cooldown, key);
        } else if (cooldown.excludes) {
          if (!cooldown.excludes.some((r) => roles.includes(r))) await this.handle(cooldown, key);
        } else await this.handle(cooldown, key);
      } else if (cooldown.type === 'ONLY_GUILD') {
        if (!params.guild) return;
        const key = `${cooldown.label}:${params.guild.id}`;
        await this.handle(cooldown, key);
      } else if (cooldown.type === 'ONLY_PRIVATE') {
        if (params.guild || !params.user) return;
        const key = `${cooldown.label}:${params.user.id}`;
        await this.handle(cooldown, key);
      } else if (cooldown.type === 'CUSTOM') {
        if (!cooldown.condition) return;
        const key = `${cooldown.label}:custom:${params.channel?.id}:${params.user?.id}:${params.guild?.id}`;
        await this.handle(cooldown, key);
      }
    }));
  }

  /**
   * handle cooldown
   * @param cooldown - cooldown to handle
   * @param key - cooldown key
   * @internal
   */
  private async handle(
    cooldown: Cooldown | CooldownData | string,
    key: string,
  ) {
    const c = this.resolve(cooldown);
    if (!c) throw new Error('invalid cooldown');

    const current = await this.get(key);

    if (current && !(await this.isExpired(c, current))) {
      if (c.stack) {
        if (!current.stack) await this.set({ key, beginAt: Date.now(), stack: 1 });
        else if (current.stack >= c.stack) throw new CooldownError(c, 'STACK_LIMIT_REACHED');
        else await this.set({ key, beginAt: Date.now(), stack: current.stack + 1 });
      } else throw new CooldownError(c, 'COOLDOWN_NOT_EXPIRED');
    } else await this.set({ key, beginAt: Date.now(), stack: 1 });
  }
}
