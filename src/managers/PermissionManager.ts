import type Discord from 'discord.js';
import type Types from '../../typings';
import { SucrosePermissionError } from '../errors';

export default class PermissionManager implements Types.PermissionManager {
  constructor(public contents: Types.PermissionContents) { }

  public async isAuthorized(params: {
    interaction?: Discord.Interaction,
    message?: Discord.Message,
    permissions: Types.Permission[] | Types.Permission,
  }) {
    const { interaction, message, permissions } = params;
    const { contents } = this;

    // # get user
    const user = interaction?.user || message?.author;
    if (!user) return; // go back if don't exist

    // # define method variables
    const perms = Array.isArray(permissions) ? permissions : [permissions];
    const guild = interaction?.guild || message?.guild;
    const member = interaction?.member || message?.member;

    // loop each permission
    perms.forEach((perm) => {
      if (perm.disabled) return;
      const errorParams = { interaction, message, permission: perm };

      // # permission type is user
      if (perm.type === 'USER') {
        const userId = user.id; // get user id

        // # user allowed to use this
        if (perm.allowed && !perm.allowed.includes(userId)) {
          throw new SucrosePermissionError('user not allowed', contents.USER_NOT_ALLOWED(errorParams), perm);
        }

        // # user not allowed to use this
        if (perm.denied && perm.denied.includes(userId)) {
          throw new SucrosePermissionError('user not allowed', contents.USER_NOT_ALLOWED(errorParams), perm);
        }
      }

      // # if guild
      if (guild) {
        const channel = interaction?.channel || message?.channel; // define channel

        // # permission type is channel
        if (perm.type === 'CHANNEL' && channel) {
          const channelId = channel.id; // get channel id

          // # channel allowed to use this
          if (perm.allowed && !perm.allowed.includes(channelId)) {
            throw new SucrosePermissionError('channel not allowed', contents.CHANNEL_NOT_ALLOWED(errorParams), perm);
          }

          // # channel not allowed to use this
          if (perm.denied && perm.denied.includes(channelId)) {
            throw new SucrosePermissionError('channel not allowed', contents.CHANNEL_NOT_ALLOWED(errorParams), perm);
          }

          // # permission type is guild
        } else if (perm.type === 'GUILD') {
          const guildId = guild.id; // get channel id

          // # guild allowed to use this
          if (perm.allowed && !perm.allowed.includes(guildId)) {
            throw new SucrosePermissionError('guild not allowed', contents.GUILD_NOT_ALLOWED(errorParams), perm);
          }

          // # guild not allowed to use this
          if (perm.denied && perm.denied.includes(guildId)) {
            throw new SucrosePermissionError('guild not allowed', contents.GUILD_NOT_ALLOWED(errorParams), perm);
          }

          // # permission type is role
        } else if (perm.type === 'ROLE' && member) {
          const { roles } = member; // get member roles

          // # flat
          const includes = perm.allowed && [perm.allowed].flat();
          const excludes = perm.denied && [perm.denied].flat();

          // # get member roles > id
          const ids = Array.isArray(roles) ? roles : roles.cache.map((role) => role.id);

          // # roles allowed to use this
          if (includes && !includes.some((id) => ids.includes(id))) {
            throw new SucrosePermissionError('role not allowed', contents.ROLE_NOT_ALLOWED(errorParams), perm);
          }

          // # roles not allowed to use this
          if (excludes && excludes.some((id) => ids.includes(id))) {
            throw new SucrosePermissionError('role not allowed', contents.ROLE_NOT_ALLOWED(errorParams), perm);
          }

          // # permission type member
        } else if (perm.type === 'MEMBER' && member && typeof member.permissions !== 'string') {
          const missing = member.permissions.missing(perm.permissions); // get missing permissions

          // # if have missing permissions
          if (missing.length) {
            throw new SucrosePermissionError('member does not have required permissions', contents.MEMBER_PERMISSION_MISSING(errorParams), perm);
          }

          // # permission type self
        } else if (perm.type === 'SELF' && guild.members.me && typeof guild.members.me.permissions !== 'string') {
          const missing = guild.members.me.permissions.missing(perm.permissions); // get missing

          // # if have missing permissions
          if (missing.length) {
            throw new SucrosePermissionError('i don\'t have the required permissions', contents.SELF_PERMISSION_MISSING(errorParams), perm);
          }

          // # permission type is private only
        } else if (perm.type === 'PRIVATE_ONLY') {
          // # if not in private channel
          throw new SucrosePermissionError('private message only', contents.PRIVATE_ONLY(errorParams), perm);
        }

        // # permission type is guild only
      } else if (perm.type === 'GUILD_ONLY') {
        // # if not in guild
        throw new SucrosePermissionError('guild only', contents.GUILD_ONLY(errorParams), perm);
      }
    });
  }
}
