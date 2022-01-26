import type Discord from 'discord.js';
import type Types from '../../typings';

export const hasPermissions = async (
  contents: Types.InteractionContentOptions,
  interaction: Discord.Interaction,
  permissions: Types.Permissions | null | undefined
): Promise<Discord.InteractionReplyOptions | null> => {
  if (!interaction.guild || !permissions) return null;

  /**
   * Ajouter l'immunité de certains rôles, de certains users, certaines guildes et de certains channels
   * Ajouter les messages d'erreurs customisable
   */

  //? Client permissions
  if (permissions.client && interaction.guild.me) {
    const missingPermissions = interaction.guild.me.permissions.missing(permissions.client);
    if (missingPermissions.length) return contents.MISSING_CLIENT_PERMISSIONS(interaction.client, missingPermissions);
  } //? [end] Client permissions

  //? Member permissions
  if (permissions.user) {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const missingPermissions = member.permissions.missing(permissions.user);
    if (member && missingPermissions.length) return contents.MISSING_MEMBER_PERMISSIONS(member, missingPermissions);
  } //? [end] Member permissions

  return null;
};
