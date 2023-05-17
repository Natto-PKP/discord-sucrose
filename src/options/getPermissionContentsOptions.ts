import { PermissionContents } from '../contents';
import type Types from '../../typings';

export default (options: Types.SucroseOptions<false, true>): Types.PermissionContents => ({
  CHANNEL_NOT_ALLOWED: options.contents?.CHANNEL_NOT_ALLOWED
    || PermissionContents.CHANNEL_NOT_ALLOWED,
  GUILD_NOT_ALLOWED: options.contents?.GUILD_NOT_ALLOWED || PermissionContents.GUILD_NOT_ALLOWED,
  GUILD_ONLY: options.contents?.GUILD_ONLY || PermissionContents.GUILD_ONLY,
  MEMBER_PERMISSION_MISSING: options.contents?.MEMBER_PERMISSION_MISSING
    || PermissionContents.MEMBER_PERMISSION_MISSING,
  PRIVATE_ONLY: options.contents?.PRIVATE_ONLY || PermissionContents.PRIVATE_ONLY,
  ROLE_NOT_ALLOWED: options.contents?.ROLE_NOT_ALLOWED || PermissionContents.ROLE_NOT_ALLOWED,
  SELF_PERMISSION_MISSING: options.contents?.SELF_PERMISSION_MISSING
    || PermissionContents.SELF_PERMISSION_MISSING,
  USER_NOT_ALLOWED: options.contents?.USER_NOT_ALLOWED || PermissionContents.USER_NOT_ALLOWED,
});
