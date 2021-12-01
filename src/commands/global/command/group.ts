import { CommandOption } from 'src/typings';

/**
 * If you need create other files for command options :
 * - Create a folder nammed with command body name in the same folder
 * - Create your sub commands or sub group commands files in this folder
 * - if you need create other files for group command options :
 * - Create a folder nammed with group command name in the {commandName} folder
 * - create your sub commands files in this folder
 */

export = <CommandOption>{
  option: {
    type: 'SUB_COMMAND_GROUP',
    name: 'group',
    description: 'command group',
  },

  exec: async () => {
    // Code here
  },
};
