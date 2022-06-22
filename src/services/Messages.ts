import type Types from '../../typings';

export const interaction = <Types.InteractionContent>{
  ERROR(err) {
    return { content: `❌ \`| \` an error has occurred: \`${err?.message}\`` };
  },

  MISSING_COMMAND(name) {
    return { content: `❌ \`| \` command "${name}" no longer exists` };
  },

  MISSING_LOCAL_INTERACTION(name) {
    return { content: `❌ \`| \` interaction "${name}" no longer exists` };
  },

  MISSING_LOCAL_INTERACTION_EXEC(name) {
    return { content: `❌ \`| \` interaction "${name}" could not be executed` };
  },

  MISSING_SUB_COMMAND(name) {
    return { content: `❌ \`| \` subcommand "${name}" no longer exists` };
  },

  MISSING_SUB_COMMAND_GROUP(name) {
    return { content: `❌ \`| \` command group "${name}" no longer exists` };
  },

  PERMISSIONS_DENY_GUILDS() {
    return { content: '❌ `| ` interaction is not available in guilds' };
  },

  PERMISSIONS_DENY_PRIVATE() {
    return { content: '❌ `| ` interaction is not available in private messages' };
  },

  PERMISSIONS_MISSING_ALLOW_CHANNELS() {
    return { content: '❌ `| ` you are not in an authorized channel' };
  },

  PERMISSIONS_MISSING_ALLOW_GUILDS() {
    return { content: '❌ `| ` you are not in an authorized server' };
  },

  PERMISSIONS_MISSING_ALLOW_USERS() {
    return { content: '❌ `| ` you are not authorized' };
  },

  PERMISSIONS_MISSING_ALLOW_ROLES(_member, roles) {
    return { content: `❌ \`| \` you do not have these roles: \`${roles.map((role) => `@${role.name}`)}\`` };
  },

  PERMISSIONS_MISSING_CLIENT() {
    return { content: '❌ `| ` I don\'t have permissions to use this command here...' };
  },

  PERMISSIONS_MISSING_MEMBER(member) {
    return { content: `❌ \`| \` ${member} does not have the required permissions to use this command` };
  },
};

export default { interaction };
