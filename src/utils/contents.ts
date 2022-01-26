import type { InteractionContentOptions } from '../../typings';

export const interactionsContents = <InteractionContentOptions>{
  MISSING_CLIENT_PERMISSIONS: function () {
    return { content: `❌ \`| \` I don't have permissions to use this command here...` };
  },

  MISSING_COMMAND: function (name) {
    return { content: `❌ \`| \` **${name}** command no longer exists` };
  },

  MISSING_LOCAL_INTERACTION: function (name) {
    return { content: `❌ \`| \` **${name}** interaction no longer exists` };
  },
  MISSING_LOCAL_INTERACTION_EXEC: function (name) {
    return { content: `❌ \`| \` **${name}** interaction could not be executed` };
  },

  MISSING_MEMBER_PERMISSIONS: function (member) {
    return { content: `❌ \`| \` ${member} does not have the required permissions to use this command` };
  },

  MISSING_SUB_COMMAND: function (name) {
    return { content: `❌ \`| \` The subcommand **${name}** no longer exists` };
  },

  MISSING_SUB_COMMAND_GROUP: function (name) {
    return { content: `❌ \`| \` The command group **${name}** no longer exists` };
  },
};
