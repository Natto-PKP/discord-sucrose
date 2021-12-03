export enum ErrorTypes {
  SUCCESS,
  LOG,
  WARN,
  ERROR,
}

export enum ErrorSections {
  COMMAND_MANAGER = '[Command manager]',
  INTERACTION_MANAGER = '[Interaction manager]',
  EVENT_MANAGER = '[Event manager]',
}

export enum ErrorCodes {
  // === COMMAND
  COMMAND_FOLDER_GUILD_EMPTY = 'guild commands folder not exist',
  COMMAND_COLLECTION_NOT_EXIST = 'guild commands collection does not exist',
  COMMAND_NOT_EXIST_ON_API = 'command is not in Discord API',
  COMMAND_UKNOWN = 'command variable is not a Command type',

  // === INTERACTION
  INTERACTION_MISSING_DATA = 'missing data in a button/select_menu',
  INTERACTION_MISSING_ID = 'missing data.customId in a button/select_menu',
  INTERACTION_MISSING_URL = 'missing data.url in a button',

  // === EVENT
  EVENT_MISSING_HANDLER = 'handler file is missing in a event folder',
}
