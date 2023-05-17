import type { InteractionContents } from '../../typings';

const base = '❌ ` | error `';

export default <InteractionContents>{
  AUTOCOMPLETE_INTERACTION_MISSING: ({ key }) => ({
    content: `${base} autocompletion "${key}" no longer exist`,
    ephemeral: true,
  }),

  AUTOCOMPLETE_INTERACTION_MISSING_EXEC: ({ key }) => ({
    content: `${base} autocompletion "${key}" exec function is not define`,
    ephemeral: true,
  }),

  BUTTON_INTERACTION_MISSING_EXEC: ({ customId }) => ({
    content: `${base} button "${customId}" exec function is not define`,
    ephemeral: true,
  }),

  CHAT_INPUT_GROUP_MISSING: ({ name, group }) => ({
    content: `${base} group "${group}" of command "${name}" no longer exist`,
    ephemeral: true,
  }),

  CHAT_INPUT_GROUP_OPTION_MISSING: ({ name, group, option }) => ({
    content: `${base} option "${option}" of group "${group}" of command "${name}" no longer exist`,
    ephemeral: true,
  }),

  CHAT_INPUT_GROUP_OPTION_MISSING_EXEC: ({ name, group, option }) => ({
    content: `${base} option "${option}" of group "${group}" of command "${name}" exec function is not define`,
    ephemeral: true,
  }),

  CHAT_INPUT_INTERACTION_MISSING: ({ name }) => ({
    content: `${base} command "${name}" not longer exist`,
    ephemeral: true,
  }),

  CHAT_INPUT_INTERACTION_MISSING_EXEC: ({ name }) => ({
    content: `${base} command "${name}" exec function is not define`,
    ephemeral: true,
  }),

  CHAT_INPUT_OPTION_MISSING: ({ name, option }) => ({
    content: `${base} option "${option}" of command "${name}" no longer exist`,
    ephemeral: true,
  }),

  CHAT_INPUT_OPTION_MISSING_EXEC: ({ name, option }) => ({
    content: `${base} option "${option}" of command "${name}" exec function is not define`,
    ephemeral: true,
  }),

  ERROR: ({ error }) => ({
    content: `${base} ${error.message}`,
    ephemeral: true,
  }),

  FORM_INTERACTION_MISSING_EXEC: ({ customId }) => ({
    content: `${base} form "${customId}" exec function no longer exist`,
    ephemeral: true,
  }),

  MESSAGE_CONTEXT_MENU_MISSING_EXEC: ({ name }) => ({
    content: `${base} message context "${name}" exec function is not define`,
    ephemeral: true,
  }),

  SELECT_MENU_INTERACTION_MISSING_EXEC: ({ customId }) => ({
    content: `${base} select menu "${customId}" exec function is not define`,
    ephemeral: true,
  }),

  UNKNOWN_INTERACTION: ({ interaction }) => ({
    content: `${base} ${interaction.user}, interaction no longer exist`,
    ephemeral: true,
  }),

  USER_CONTEXT_MENU_MISSING_EXEC: ({ name }) => ({
    content: `${base} user context "${name}" exec function no longer exist`,
    ephemeral: true,
  }),
};
