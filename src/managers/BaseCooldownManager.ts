import Discord from 'discord.js';
import Types from '../../typings';
import { SucroseCooldownError } from '../errors';

// ! CORRIGER LE CACHE ET L'HISTOIRE DE L'OVERLOAD

export default class BaseCooldownManager<C> implements Types.BaseCooldownManager<C> {
  public cache: C;

  constructor(cache?: C) {
    if (cache) this.cache = cache;
    else this.cache = new Discord.Collection() as C;
  }

  /**
   * DO NOT OVERRIDE THIS
   */
  public async isOver(params: {
    cooldowns: Types.Cooldown[] | Types.Cooldown;
    interaction?: Discord.Interaction;
    message?: Discord.Message;
    id: string;
  }) {
    const { cooldowns, interaction, message } = params;
    if (!interaction && !message) return;

    const user = interaction?.user || message?.author;
    if (!user) return;

    // define method variable
    const clds = [cooldowns].flat();
    const now = Date.now();
    const guild = interaction?.guild || message?.guild;
    const member = interaction?.member || message?.member;
    const channel = interaction?.channel || message?.channel;

    // loop on all cooldown
    await Promise.all(clds.map(async (cooldown) => {
      if (cooldown.disabled) return;
      const base = `${interaction ? 'interaction' : 'message'}${cooldown.label ? `${cooldown.label}:` : ''}:${params.id}`;

      let key; // init cooldown key

      // # if guild exist
      if (guild) {
        // # cooldown type is channel
        // # this interaction can be used each x time by everyone in specific channel
        if (cooldown.type === 'CHANNEL' && channel) {
          const temp = `channel:${channel.id}`; // channelId
          if (cooldown.included && !cooldown.included.includes(temp)) key = temp;
          if (cooldown.excluded && cooldown.excluded.includes(temp)) key = temp;
        }

        // # cooldown type is channel member
        // # this interaction can be used each x time per each channel per each member
        if (cooldown.type === 'CHANNEL_MEMBER' && channel && member && 'id' in member) {
          key += `channel-member:${channel.id}:${member.id}`; // channelId + memberId
        }

        // # cooldown type is guild
        // # this interaction can be used each x time per guild
        if (cooldown.type === 'GUILD' && guild) {
          const temp = `guild:${guild.id}`; // guildId
          if (cooldown.included && !cooldown.included.includes(temp)) key = temp;
          if (cooldown.excluded && cooldown.excluded.includes(temp)) key = temp;
        }

        // # cooldown type is guild member
        // # this interaction can be used each x time per guild per member
        if (cooldown.type === 'GUILD_MEMBER' && guild && member && 'id' in member) {
          key += `guild-member:${guild.id}:${member.id}`; // guildId + memberId
        }

        // # cooldown type is role
        // # this interaction can be used each x time per user who has specific role
        if (cooldown.type === 'ROLE' && guild && member && 'id' in member) {
          const { roles, id: memberId } = member;
          const includes = cooldown.included && [cooldown.included].flat();
          const excludes = cooldown.excluded && [cooldown.excluded].flat();
          const ids = Array.isArray(roles) ? roles : roles.cache.map((role) => role.id);
          const temp = `role:${guild.id}:${memberId}`; // role + guildId + memberId
          if (includes && !includes.some((id) => ids.includes(id))) key = temp;
          if (excludes && excludes.some((id) => ids.includes(id))) key = temp;
        }
      }

      // # cooldown type is user
      // # this interaction can be used each x time per specific user
      if (cooldown.type === 'USER') {
        const temp = `user:${user.id}`; // user + userId
        if (cooldown.included && !cooldown.included.includes(temp)) key = temp;
        if (cooldown.excluded && cooldown.excluded.includes(temp)) key = temp;
      }

      // # cooldown type is everyone
      // # this interaction can be used each x time per user
      if (cooldown.type === 'EVERYONE') key = `everyone:${user.id}`;

      // # cooldown type is shared
      // # this interaction can be used each x time
      if (cooldown.type === 'SHARED') key = 'shared:everyone';

      // # check if cooldown is over
      if (key && cooldown.value && this.cache) {
        const methodParams = { interaction, message, key: `${base}:${key}` };
        const current = await this.get({ ...methodParams, cooldown }); // get current

        // if current exist and current value is greater to now
        if (current && current.value && current.value > now) {
          // if stack enabled and current have stack
          if (cooldown.stack && current.stack) {
            // if current stack is greater to cooldown stack
            if (cooldown.stack <= current.stack) throw new SucroseCooldownError('user slapped by cooldown', cooldown, key);
          } else throw new SucroseCooldownError('user slapped by cooldown', cooldown, key);
        }

        // # set new value to cooldown cache
        await this.set({
          ...methodParams,
          cooldown,
          value: now + cooldown.value,
          stack: cooldown.stack ? Math.ceil((current?.stack || 0) + 1) : undefined,
        });
      }
    }));
  }

  public async get(params: Types.CooldownMethodParams) {
    const cache = this.cache as Discord.Collection<string, Types.CooldownValue>;
    const cooldown = cache.get(params.key);
    return cooldown;
  }

  public async set(params: Types.CooldownMethodParams & Types.CooldownValue) {
    const cache = this.cache as Discord.Collection<string, Types.CooldownValue>;
    cache.set(params.key, { value: params.value, stack: params.stack });
  }
}
