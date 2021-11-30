import { Client, GuildMember, InteractionReplyOptions, PermissionString } from 'discord.js';

export const interactions = {
  // missing client permissions content in interaction
  MISSING_CLIENT_PERMISSIONS: (client: Client, permissions: PermissionString[]): InteractionReplyOptions => {
    return { content: `❌ \`| \` Je n'ai pas les permissions d'utiliser cette commande ici..` };
  },

  // missing member permissions content in interaction
  MISSING_MEMBER_PERMISSIONS: (member: GuildMember, permissions: PermissionString[]): InteractionReplyOptions => {
    return { content: `❌ \`| \` ${member} n'a pas les permissions requise pour utiliser cette commande` };
  },

  commands: {
    MISSING_SUB_COMMAND_GROUP: (group: string): InteractionReplyOptions => {
      return { content: `❌ \`| \` Le groupe de commande **${group}** n'existe plus` };
    },

    MISSING_SUB_COMMAND: (name: string): InteractionReplyOptions => {
      return { content: `❌ \`| \` La sous commande **${name}** n'existe plus` };
    },

    MISSING_SUB_COMMAND_GROUPS: (command: string): InteractionReplyOptions => {
      return { content: `❌ \`| \` La commande **${command}** ne possède plus de groupe de sous commandes` };
    },

    MISSING_SUB_COMMANDS: (name: string): InteractionReplyOptions => {
      return { content: `❌ \`| \` La commande ou le groupe de commande **${name}** ne possède plus de sous commandes` };
    },
  },
};
