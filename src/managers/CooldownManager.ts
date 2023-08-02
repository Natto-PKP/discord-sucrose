import Discord from 'discord.js';
import Cooldown from '../structures/Cooldown';

export type CooldownValue = { value: number; stack?: number | null };

export interface CooldownMethodParams {
  key: string;
  cooldown: Cooldown;
  interaction: Discord.Interaction
}

export default class CooldownManager {
  public cache = new Discord.Collection<string, CooldownValue>();

  public async isOver(params: {
    cooldowns: Cooldown[] | Cooldown;
    interaction?: Discord.Interaction;
    key: string;
  }) {
    const { interaction } = params;
    if (!interaction) return;

    const user = interaction?.user;
    if (!user) return;

    // define method variable
    const cooldowns = [params.cooldowns].flat();
    const now = Date.now();
    const guild = interaction?.guild;
    const member = interaction?.member as Discord.GuildMember | null;
    const channel = interaction?.channel;

    await Promise.all(cooldowns.map(async (cooldown) => {
      if (cooldown.disabled) return;
      let key = `interaction:${cooldown.label}:${params.key}`;

      if (cooldown.type === 'PER_CHANNEL' && channel) {
        if (cooldown.allowed && !cooldown.allowed.includes(channel.id)) key += `:channel:${channel.id}`;
        if (cooldown.denied && cooldown.denied.includes(channel.id)) key += `:channel:${channel.id}`;
        if (!cooldown.allowed && !cooldown.denied) key += `:channel:${channel.id}`;
      } else if (cooldown.type === 'PER_GUILD' && guild) {
        if (cooldown.allowed && !cooldown.allowed.includes(guild.id)) key += `:guild:${guild.id}`;
        if (cooldown.denied && cooldown.denied.includes(guild.id)) key += `:guild:${guild.id}`;
        if (!cooldown.allowed && !cooldown.denied) key += `:guild:${guild.id}`;
      } else if (cooldown.type === 'PER_ROLE' && member) {
        const roles = Array.isArray(member.roles)
          ? member.roles
          : member.roles.cache.map((role) => role.id);
        if (cooldown.allowed && !cooldown.allowed.some((role) => roles.includes(role))) key += `:role:${member.id}`;
        if (cooldown.denied && cooldown.denied.some((role) => roles.includes(role))) key += `:role:${member.id}`;
        if (!cooldown.allowed && !cooldown.denied) key += `:role:${member.id}`;
      } else if (cooldown.type === 'PER_USER' && user) {
        if (cooldown.allowed && !cooldown.allowed.includes(user.id)) key += `:user:${user.id}`;
        if (cooldown.denied && cooldown.denied.includes(user.id)) key += `:user:${user.id}`;
        if (!cooldown.allowed && !cooldown.denied) key += `:user:${user.id}`;
      } else if (cooldown.type === 'SHARED') key += ':shared';

      if (key && cooldown.duration) {
        const methodParams = { interaction, key, cooldown };
        const current = await this.get(methodParams);

        if (current && current.value && current.value > now) {
          if (cooldown.stack && current.stack) {
            if (cooldown.stack <= current.stack) throw new Error('user slapped by cooldown');
          } else throw new Error('user slapped by cooldown');
        }

        await this.set({
          ...methodParams,
          value: now + cooldown.duration,
          stack: cooldown.stack ? Math.ceil((current?.stack || 0) + 1) : undefined,
        });
      }
    }));
  }

  public async get(params: CooldownMethodParams): Promise<CooldownValue | undefined> {
    return this.cache.get(params.key);
  }

  public async set(params: CooldownMethodParams & CooldownValue) {
    this.cache.set(params.key, { value: params.value, stack: params.stack });
  }
}
