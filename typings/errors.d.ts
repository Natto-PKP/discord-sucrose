declare enum Codes {
  SUCCESS = '\x1b[32m✔ SUCCESS\x1b[0m',
  LOG = '\x1b[34m🔎 LOG\x1b[0m',
  WARN = '\x1b[33m⚡ WARN\x1b[0m',
  ERROR = '\x1b[31m💢 ERROR\x1b[0m',
}

declare enum Messages {
  // # command manager
  'COMMAND_MANAGER_MISSING_GROUP_FOLDER' = 'a command with groups missing this group folder',
  'COMMAND_MANAGER_SUB_FOLDER_EMPTY' = 'a command folder is empty',
  'COMMAND_MANAGER_MISSING_COLLECTION' = 'command collection does not exist',

  // # interaction manager
  'INTERACTIONS_MANAGER_MISSING_FILE' = 'an interaction file is missing',
  'INTERACTIONS_MANAGER_ALREADY_EXIST' = 'an interaction is already exist in collection',
  'INTERACTIONS_MANAGER_MISSING' = 'an interaction not exist in collection',

  // # event
  'EVENT_DISABLED' = 'this event is disabled because you removed it from the collection',
  'EVENT_MISSING_LISTENER' = 'this event does not have a listener and therefore cannot be mute',
  'EVENT_MISSING_HANDLER' = 'this event does not have handler file',

  // # event manager
  'EVENT_MANAGER_EMPTY_DIRECTORY' = 'events directory is empty',
  'EVENT_MANAGER_EVENT_ALREADY_EXIST' = 'an event already exist in collection',
  'EVENT_MANAGER_EVENT_NOT_EXIST' = 'an event not exist in collection',
  'EVENT_MANAGER_EVENT_PATH_INVALID' = 'an event path not exist',
}

declare enum Sections {
  'COMMAND_MANAGER' = '[Command manager]',
  'INTERACTION_MANAGER' = '[Interaction manager]',
  'EVENT_MANAGER' = '[Event manager]',
}

type Code = keyof typeof Codes;
type Message = keyof typeof Messages;
type Section = keyof typeof Sections;

declare class SucroseTypeError extends TypeError {
  public constructor(parameter: string, type: string, received: unknown);
}

declare class SucroseError extends Error {
  public code: Code;
  public constructor(code: Code, message: Message);
}
