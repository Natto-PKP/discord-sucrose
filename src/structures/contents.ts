import { Client, GuildMember, InteractionReplyOptions, PermissionString } from 'discord.js';

export default {
  //! INTERACTIONS

  /**
   * ? Missing client permissions content in interaction
   * @param { Client } client
   * @param { PermissionString[] } permissions
   * @returns { InteractionReplyOptions }
   */
  MISSING_CLIENT_PERMISSIONS: function (client: Client, permissions: PermissionString[]): InteractionReplyOptions {
    return { content: `❌ \`| \` I don't have permissions to use this command here...` };
  },

  /**
   * ? Missing member permissions content in interaction
   * @param { Client } client
   * @param { PermissionString[] } permissions
   * @returns { InteractionReplyOptions }
   */
  MISSING_MEMBER_PERMISSIONS: function (member: GuildMember, permissions: PermissionString[]): InteractionReplyOptions {
    return { content: `❌ \`| \` ${member} does not have the required permissions to use this command` };
  },

  /**
   * ? Missing local interaction
   * @param { string } name
   * @returns { InteractionReplyOptions }
   */
  MISSING_LOCAL_INTERACTION: function (name: string): InteractionReplyOptions {
    return { content: `❌ \`| \` **${name}** interaction no longer exists` };
  },

  /**
   * ? Missing function exec to local interaction
   * @param { string } name
   * @returns { InteractionReplyOptions }
   */
  MISSING_LOCAL_INTERACTION_EXEC: function (name: string): InteractionReplyOptions {
    return { content: `❌ \`| \` **${name}** interaction could not be executed` };
  },

  /**
   * ? Missing a sub command group in a command during interaction
   * @param { string } name
   * @returns { InteractionReplyOptions }
   */
  MISSING_SUB_COMMAND_GROUP: function (name: string): InteractionReplyOptions {
    return { content: `❌ \`| \` The command group **${name}** no longer exists` };
  },

  /**
   * ? Missing sub command groups in a command during interaction
   * @param { string } name
   * @returns { InteractionReplyOptions }
   */
  MISSING_SUB_COMMAND_GROUPS: function (name: string): InteractionReplyOptions {
    return { content: `❌ \`| \` The command **${name}** no longer has a group of subcommands` };
  },

  /**
   * ? Missing a sub command in a command during interaction
   * @param { string } name
   * @returns { InteractionReplyOptions }
   */
  MISSING_SUB_COMMAND: function (name: string): InteractionReplyOptions {
    return { content: `❌ \`| \` The subcommand **${name}** no longer exists` };
  },

  /**
   * ? Missing sub commands in a command during interaction
   * @param { string } name
   * @returns { InteractionReplyOptions }
   */
  MISSING_SUB_COMMANDS: function (name: string): InteractionReplyOptions {
    return { content: `❌ \`| \` The command or the command group **${name}** no longer has subcommands` };
  },
};
