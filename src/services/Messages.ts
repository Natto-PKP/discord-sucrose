import type Types from '../../typings';

export const interaction = <Types.InteractionContent>{
  ERROR(err) {
    return { content: `❌ \`| \` an error has occurred: \`${err?.message}\`` };
  },

  /**
   * Missing command
   */
  MISSING_COMMAND(name) {
    return { content: `❌ \`| \` command "${name}" no longer exists` };
  },

  /**
   * Missing local interaction
   */
  MISSING_LOCAL_INTERACTION(name) {
    return { content: `❌ \`| \` interaction "${name}" no longer exists` };
  },

  /**
   * Missing local interaction exec function
   */
  MISSING_LOCAL_INTERACTION_EXEC(name) {
    return { content: `❌ \`| \` interaction "${name}" could not be executed` };
  },

  /**
   * Missing sub command
   */
  MISSING_SUB_COMMAND(name) {
    return { content: `❌ \`| \` subcommand "${name}" no longer exists` };
  },

  /**
   * Missing sub command group
   */
  MISSING_SUB_COMMAND_GROUP(name) {
    return { content: `❌ \`| \` command group "${name}" no longer exists` };
  },

  /**
   * Missing allow channels - permissions
   */
  PERMISSIONS_MISSING_ALLOW_CHANNELS() {
    return { content: '❌ `| ` you are not in an authorized channel' };
  },

  /**
   * Missing allow guilds - permissions
   */
  PERMISSIONS_MISSING_ALLOW_GUILDS() {
    return { content: '❌ `| ` you are not in an authorized server' };
  },

  /**
   * Missing allow users - permissions
   */
  PERMISSIONS_MISSING_ALLOW_USERS() {
    return { content: '❌ `| ` you are not authorized' };
  },

  /**
   * Missing allow roles - permissions
   */
  PERMISSIONS_MISSING_ALLOW_ROLES(_member, roles) {
    return { content: `❌ \`| \` you do not have these roles: \`${roles.map((role) => `@${role.name}`)}\`` };
  },

  /**
   * Missing client permissions
   */
  PERMISSIONS_MISSING_CLIENT() {
    return { content: '❌ `| ` I don\'t have permissions to use this command here...' };
  },

  /**
   * Missing member permissions
   */
  PERMISSIONS_MISSING_MEMBER(member) {
    return { content: `❌ \`| \` ${member} does not have the required permissions to use this command` };
  },
};

export default { interaction };
