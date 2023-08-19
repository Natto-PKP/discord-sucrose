import Discord from 'discord.js';
import { CooldownError } from 'src/errors/CooldownError';
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
 * cooldown types
 * @internal
 */
type Cool = Cooldown | CooldownData | string;

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
  public async expiresAt(cooldown: Cool, value: string | CooldownValue) {
    const v = typeof value === 'string' ? await this.get(value) : value;
    const c = this.resolve(cooldown);
    return v ? v.beginAt + ((c && c.duration) || 0) : 0;
  }

  /**
   * check if cooldown is expired
   * @param cooldown - cooldown to check
   * @param value - cooldown value to check
   */
  public async isExpired(cooldown: Cool, value: string | CooldownValue) {
    const c = typeof value === 'string' ? await this.get(value) : value;
    return c ? await this.expiresAt(cooldown, value) <= Date.now() : true;
  }

  /**
   * get remaining time on cooldown
   * @param cooldown - cooldown to check
   * @param value - cooldown value to check
   * @returns
   */
  public async remaining(cooldown: Cool, value: string | CooldownValue) {
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
  public async check(cooldowns: Cool | Cool[], params: CooldownExecuteParams) {
    const clds = Array.isArray(cooldowns) ? cooldowns : [cooldowns];

    await Promise.all(clds.map(async (c) => {
      const cooldown = this.resolve(c);
      if (!cooldown) return;

      if (cooldown.type === 'CHANNEL') {
        if (!params.channel) return;
        const channelId = params.channel.id;
        const key = `${cooldown.label}:${channelId}`;

        if (cooldown.includes && cooldown.includes.includes(channelId)) {
          await this.handle(cooldown, key);
        }

        if (cooldown.excludes && !cooldown.excludes.includes(channelId)) {
          await this.handle(cooldown, key);
        }
      } else if (cooldown.type === 'GUILD') {
        if (!params.guild) return;
        const guildId = params.guild.id;
        const key = `${cooldown.label}:${guildId}`;

        if (cooldown.includes && cooldown.includes.includes(guildId)) {
          await this.handle(cooldown, key);
        }

        if (cooldown.excludes && !cooldown.excludes.includes(guildId)) {
          await this.handle(cooldown, key);
        }
      } else if (cooldown.type === 'USER') {
        if (!params.user) return;
        const userId = params.user.id;
        const key = `${cooldown.label}:${userId}`;

        if (cooldown.includes && cooldown.includes.includes(userId)) {
          await this.handle(cooldown, key);
        }

        if (cooldown.excludes && !cooldown.excludes.includes(userId)) {
          await this.handle(cooldown, key);
        }
      } else if (cooldown.type === 'ROLE') {
        if (!params.member) return;
        const roles = Array.isArray(params.member.roles)
          ? params.member.roles
          : params.member.roles.cache.map((r) => r.id);
        const key = `${cooldown.label}:role:${params.member.user.id}`;

        if (cooldown.includes && cooldown.includes.some((r) => roles.includes(r))) {
          await this.handle(cooldown, key);
        }

        if (cooldown.excludes && !cooldown.excludes.some((r) => roles.includes(r))) {
          await this.handle(cooldown, key);
        }
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
  private async handle(cooldown: Cool, key: string) {
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
