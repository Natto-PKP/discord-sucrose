enum Sections {
  COMMAND_MANAGER = 'Command manager',
  INTERACTION_MANAGER = 'Interaction manager',
  EVENT_MANAGER = 'Event manager',
}

enum Codes {
  // === COMMAND
  COMMAND_FOLDER_GUILD_EMPTY = 'guild commands folder is empty',
  COMMAND_COLLECTION_NOT_EXIST = 'guild commands collection does not exist',
  COMMAND_NOT_EXIST_ON_API = 'command is not in Discord API',
  COMMAND_UKNOWN = 'command variable is not a Command type',

  // === INTERACTION
  INTERACTION_MISSING_DATA = 'interaction :: missing data',
  INTERACTION_MISSING_ID = 'interaction :: missing data.customId',
  INTERACTION_MISSING_URL = 'interaction :: missing data.url',

  // === EVENT
  EVENT_MISSING_HANDLER = 'handler file is missing in a event folder',
}

export class SucroseError extends Error {
  private options: { section: string };

  public constructor(code: keyof typeof Codes, options: { section: keyof typeof Sections }) {
    super(`[${options.section}] ${Codes[code]}`);

    this.name = 'SucroseError';
    this.options = options || {};
  }

  public get section(): string {
    return this.options.section;
  }
}
