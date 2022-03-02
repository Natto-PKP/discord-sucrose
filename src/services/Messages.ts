import type Types from '../../typings';

export const interaction = <Types.InteractionContent>{
  ERROR(err) {
    return { content: `❌ \`| \` An error has occurred: \`${err?.message}\`` };
  },

  /**
   * Missing client permissions
   * @returns
   */
  MISSING_CLIENT_PERMISSIONS() {
    return { content: '❌ `| ` I don\'t have permissions to use this command here...' };
  },

  /**
   * Missing command
   * @param name
   * @returns
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
   * @param name
   * @returns
   */
  MISSING_LOCAL_INTERACTION_EXEC(name) {
    return { content: `❌ \`| \` interaction "${name}" could not be executed` };
  },

  /**
   * Missing member permissions
   * @param member
   * @returns
   */
  MISSING_MEMBER_PERMISSIONS(member) {
    return { content: `❌ \`| \` ${member} does not have the required permissions to use this command` };
  },

  /**
   * Missing sub command
   * @param name
   * @returns
   */
  MISSING_SUB_COMMAND(name) {
    return { content: `❌ \`| \` subcommand "${name}" no longer exists` };
  },

  /**
   * Missing sub command group
   * @param name
   * @returns
   */
  MISSING_SUB_COMMAND_GROUP(name) {
    return { content: `❌ \`| \` command group "${name}" no longer exists` };
  },
};

export default { interaction };
