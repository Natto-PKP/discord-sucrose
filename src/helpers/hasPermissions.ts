import type Discord from 'discord.js';
import type Types from '../../typings';

export default function hasPermissions(
  interaction: Discord.Interaction,
  permissions: Types.Permissions,
  content: Required<Types.InteractionContent>,
): Discord.InteractionReplyOptions | null {
  const { client, user, channel } = interaction;
  let message: Discord.InteractionReplyOptions | null = null;

  // ! Guild check
  if (interaction.guild && interaction.guild.me) {
    const guild = <Discord.Guild>interaction.guild;
    const member = <Discord.GuildMember>interaction.member;

    // ! Client
    if (permissions.client) {
      const missing = interaction.guild.me.permissions.missing(permissions.client);
      if (missing.length) message = content.PERMISSIONS_MISSING_CLIENT(client, missing);
    }

    // ! Member
    if (permissions.member) {
      const missing = (<Discord.Permissions>member?.permissions).missing(permissions.member);
      if (missing.length) message = content.PERMISSIONS_MISSING_MEMBER(member, missing);
    }

    // ! Roles
    if (permissions.roles) {
      const arr = <string[]>permissions.roles;
      const has = member.roles.cache.some((r) => arr.includes(r.id));
      if (!has) {
        const roles = guild.roles.cache.filter((r) => arr.includes(r.id));
        message = content.PERMISSIONS_MISSING_ALLOW_ROLES(member, roles);
      }
    }

    // ! Guilds
    if (permissions.guilds) {
      const arr = <string[]>permissions.guilds;
      const has = arr.includes((<Discord.Guild>guild).id);
      if (!has) {
        const guilds = client.guilds.cache.filter((g) => arr.includes(g.id));
        message = content.PERMISSIONS_MISSING_ALLOW_GUILDS(member, guilds);
      }
    }

    // ! Channels
    if (permissions.channels) {
      const arr = <string[]>permissions.channels;
      const has = arr.includes((<Discord.GuildChannel>channel).id);
      if (!has) {
        const channels = guild.channels.cache.filter((c) => arr.includes(c.id));
        message = content.PERMISSIONS_MISSING_ALLOW_CHANNELS(member, channels);
      }
    }

    // ! Private
    if (typeof permissions.private === 'boolean' && permissions.private) message = content.PERMISSIONS_DENY_GUILDS();
  } // [end] Guild check

  // ! Users
  if (permissions.users) {
    const arr = <string[]>permissions.users;
    const has = arr.includes(user.id);
    if (!has) {
      const users = client.users.cache.filter((u) => arr.includes(u.id));
      message = content.PERMISSIONS_MISSING_ALLOW_USERS(user, users);
    }
  }

  // ! Private
  if (typeof permissions.private === 'boolean' && !permissions.private) message = content.PERMISSIONS_DENY_PRIVATE();

  return message;
}
