enum Sections {
  COMMAND_MANAGER = 'Command manager',
}

enum Codes {
  // === COMMANDS
  COMMAND_MISSING_BODY = 'command :: missing body',
  COMMAND_MISSING_BODY_NAME = 'command :: missing body.name',
  COMMAND_FOLDER_GUILD_EMPTY = 'guild commands folder is empty',
  COMMAND_COLLECTION_NOT_EXIST = 'guild commands collection does not exist',
  COMMAND_NOT_EXIST_ON_API = 'command is not in Discord API',
  COMMAND_UKNOWN = 'command variable is not a Command type',

  // ===
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
