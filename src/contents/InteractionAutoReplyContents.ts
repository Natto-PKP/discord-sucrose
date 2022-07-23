import type { InteractionAutoReplyContents } from '../../typings';

const base = '❌ ` | error `';

export default <InteractionAutoReplyContents>{
  AUTOCOMPLETE_INTERACTION_MISSING: ({ key }) => ({
    content: `${base} autocompletion "${key}" no longer exist`,
  }),

  AUTOCOMPLETE_INTERACTION_MISSING_EXEC: ({ key }) => ({
    content: `${base} autocompletion "${key}" exec function is not define`,
  }),

  BUTTON_INTERACTION_MISSING_EXEC: ({ customId }) => ({
    content: `${base} button "${customId}" exec function is not define`,
  }),

  CHAT_INPUT_GROUP_MISSING: ({ name, group }) => ({
    content: `${base} group "${group}" of command "${name}" no longer exist`,
  }),

  CHAT_INPUT_GROUP_OPTION_MISSING: ({ name, group, option }) => ({
    content: `${base} option "${option}" of group "${group}" of command "${name}" no longer exist`,
  }),

  CHAT_INPUT_GROUP_OPTION_MISSING_EXEC: ({ name, group, option }) => ({
    content: `${base} option "${option}" of group "${group}" of command "${name}" exec function is not define`,
  }),

  CHAT_INPUT_INTERACTION_MISSING: ({ name }) => ({
    content: `${base} command "${name}" not longer exist`,
  }),

  CHAT_INPUT_INTERACTION_MISSING_EXEC: ({ name }) => ({
    content: `${base} command "${name}" exec function is not define`,
  }),

  CHAT_INPUT_OPTION_MISSING: ({ name, option }) => ({
    content: `${base} option "${option}" of command "${name}" no longer exist`,
  }),

  CHAT_INPUT_OPTION_MISSING_EXEC: ({ name, option }) => ({
    content: `${base} option "${option}" of command "${name}" exec function is not define`,
  }),

  ERROR: ({ error }) => ({
    content: `${base} ${error.message}`,
  }),

  FORM_INTERACTION_MISSING_EXEC: ({ customId }) => ({
    content: `${base} form "${customId}" exec function no longer exist`,
  }),

  MESSAGE_CONTEXT_MENU_MISSING_EXEC: ({ name }) => ({
    content: `${base} message context "${name}" exec function is not define`,
  }),

  PERMISSIONS_CLIENT_MISSING: ({ interaction, permissions }) => ({
    content: `${base} ${interaction.guild?.members.me} has missing permissions \`${permissions.join('` `')}\``,
  }),

  PERMISSIONS_CURRENT_GUILD_CHANNEl_NOT_ALLOWED: ({ interaction }) => ({
    content: `${base} ${interaction.channel} channel is not allowed`,
  }),

  PERMISSIONS_CURRENT_GUILD_NOT_ALLOWED: ({ interaction }) => ({
    content: `${base} ${interaction.guild?.name} guild is not allowed`,
  }),

  PERMISSIONS_CURRENT_MEMBER_MISSING: ({ interaction, permissions }) => ({
    content: `${base} ${interaction.user} has missing permissions \`${permissions.join('` `')}\``,
  }),

  PERMISSIONS_CURRENT_USER_NOT_ALLOWED: ({ interaction }) => ({
    content: `${base} ${interaction.user} user is not allowed`,
  }),

  PERMISSIONS_GUILD_NOT_ALLOWED: ({ interaction }) => ({
    content: `${base} ${interaction.user}, this interaction is only allowed in private message`,
  }),

  PERMISSIONS_MEMBER_ALLOW_ROLES_MISSING: ({ interaction }) => ({
    content: `${base} ${interaction.user} does not have allowed roles`,
  }),

  PERMISSIONS_PRIVATE_CHANNEL_NOT_ALLOWED: ({ interaction }) => ({
    content: `${base} ${interaction.user}, this interaction is only allowed in guild`,
  }),

  SELECT_MENU_INTERACTION_MISSING_EXEC: ({ customId }) => ({
    content: `${base} select menu "${customId}" exec function is not define`,
  }),

  UNKNOWN_INTERACTION: ({ interaction }) => ({
    content: `${base} ${interaction.user}, interaction no longer exist`,
  }),

  USER_CONTEXT_MENU_MISSING_EXEC: ({ name }) => ({
    content: `${base} user context "${name}" exec function no longer exist`,
  }),
};
