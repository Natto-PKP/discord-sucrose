import { InteractionContents } from '../contents';
import type Types from '../../typings';

export default (options: Types.SucroseOptions<false, true>): Types.InteractionContents => ({
  AUTOCOMPLETE_INTERACTION_MISSING: options.contents?.AUTOCOMPLETE_INTERACTION_MISSING
  || InteractionContents.AUTOCOMPLETE_INTERACTION_MISSING,
  AUTOCOMPLETE_INTERACTION_MISSING_EXEC: options.contents?.AUTOCOMPLETE_INTERACTION_MISSING_EXEC
  || InteractionContents.AUTOCOMPLETE_INTERACTION_MISSING_EXEC,
  BUTTON_INTERACTION_MISSING_EXEC: options.contents?.BUTTON_INTERACTION_MISSING_EXEC
  || InteractionContents.BUTTON_INTERACTION_MISSING_EXEC,
  CHAT_INPUT_GROUP_MISSING: options.contents?.CHAT_INPUT_GROUP_MISSING
  || InteractionContents.CHAT_INPUT_GROUP_MISSING,
  CHAT_INPUT_GROUP_OPTION_MISSING: options.contents?.CHAT_INPUT_GROUP_OPTION_MISSING
  || InteractionContents.CHAT_INPUT_GROUP_OPTION_MISSING,
  CHAT_INPUT_GROUP_OPTION_MISSING_EXEC: options.contents?.CHAT_INPUT_GROUP_OPTION_MISSING_EXEC
  || InteractionContents.CHAT_INPUT_GROUP_OPTION_MISSING_EXEC,
  CHAT_INPUT_INTERACTION_MISSING: options.contents?.CHAT_INPUT_INTERACTION_MISSING
  || InteractionContents.CHAT_INPUT_INTERACTION_MISSING,
  CHAT_INPUT_INTERACTION_MISSING_EXEC: options.contents?.CHAT_INPUT_INTERACTION_MISSING_EXEC
  || InteractionContents.CHAT_INPUT_INTERACTION_MISSING_EXEC,
  CHAT_INPUT_OPTION_MISSING: options.contents?.CHAT_INPUT_OPTION_MISSING
  || InteractionContents.CHAT_INPUT_OPTION_MISSING,
  CHAT_INPUT_OPTION_MISSING_EXEC: options.contents?.CHAT_INPUT_OPTION_MISSING_EXEC
  || InteractionContents.CHAT_INPUT_OPTION_MISSING_EXEC,
  ERROR: options.contents?.ERROR || InteractionContents.ERROR,
  FORM_INTERACTION_MISSING_EXEC: options.contents?.FORM_INTERACTION_MISSING_EXEC
  || InteractionContents.FORM_INTERACTION_MISSING_EXEC,
  MESSAGE_CONTEXT_MENU_MISSING_EXEC: options.contents?.MESSAGE_CONTEXT_MENU_MISSING_EXEC
  || InteractionContents.MESSAGE_CONTEXT_MENU_MISSING_EXEC,
  SELECT_MENU_INTERACTION_MISSING_EXEC: options.contents?.SELECT_MENU_INTERACTION_MISSING_EXEC
  || InteractionContents.SELECT_MENU_INTERACTION_MISSING_EXEC,
  UNKNOWN_INTERACTION: options.contents?.UNKNOWN_INTERACTION
  || InteractionContents.UNKNOWN_INTERACTION,
  USER_CONTEXT_MENU_MISSING_EXEC: options.contents?.USER_CONTEXT_MENU_MISSING_EXEC
  || InteractionContents.USER_CONTEXT_MENU_MISSING_EXEC,
});
