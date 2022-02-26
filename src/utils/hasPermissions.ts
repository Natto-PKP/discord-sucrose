import type Discord from 'discord.js';
import type Types from '../../typings';

export default function hasPermissions(
  interaction: Discord.Interaction,
  permissions: Types.Permissions,
  content: Required<Types.InteractionContent>
): Discord.InteractionReplyOptions | null {
  if (!interaction.guild) return null;

  const { client, member } = interaction;

  // ! client permissions
  if (permissions.client && interaction.guild.me) {
    const missingPermissions = interaction.guild.me.permissions.missing(permissions.client);
    if (missingPermissions.length) return content.MISSING_CLIENT_PERMISSIONS(client, missingPermissions);
  }

  // ! member permissions
  if (permissions.user && member) {
    const missingPermissions = (<Discord.Permissions>member.permissions).missing(permissions.user);
    if (missingPermissions.length)
      return content.MISSING_MEMBER_PERMISSIONS(<Discord.GuildMember>member, missingPermissions);
  }

  return null;
}
