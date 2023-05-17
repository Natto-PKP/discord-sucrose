import type { PermissionContents } from '../../typings';

const base = '❌ ` | error `';

export default <PermissionContents>{
  CHANNEL_NOT_ALLOWED: ({ interaction, message }) => {
    const channel = interaction?.channel || message?.channel || '`unknown channel`';
    return {
      content: `${channel} is not allowed`,
      ephemeral: true,
    };
  },

  GUILD_NOT_ALLOWED: ({ interaction, message }) => {
    const guild = interaction?.guild || message?.guild || { name: '`unknown guild`' };
    return ({
      content: `${guild.name} is not allowed`,
      ephemeral: true,
    });
  },

  GUILD_ONLY: () => ({
    content: `${base} private message is not allowed`,
    ephemeral: true,
  }),

  MEMBER_PERMISSION_MISSING: () => ({
    content: `${base} missing required permissions`,
    ephemeral: true,
  }),

  PRIVATE_ONLY: () => ({
    content: `${base} only usable in private message`,
    ephemeral: true,
  }),

  ROLE_NOT_ALLOWED: () => ({
    content: `${base} you don't have one of the allowed roles`,
    ephemeral: true,
  }),

  SELF_PERMISSION_MISSING: () => ({
    content: `${base} i don't have the required permissions`,
    ephemeral: true,
  }),

  USER_NOT_ALLOWED: () => ({
    content: `${base} you're not allowed`,
    ephemeral: true,
  }),
};
