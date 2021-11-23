import Discord from 'discord.js';
import { Sucrose } from 'src/structures/sucrose';

export type Collection<V> = Map<string, V>;

/* == Events */
type BaseParams = { sucrose: Sucrose };

export type Params<K extends keyof ClientEvents> = BaseParams & { args: ClientEvents[K] };

export interface __event<K extends keyof ClientEvents> {
  listener: (params: Params[K]) => void;
}

/* == Interactions */
interface BaseInteraction {
  permissions?: { client?: Discord.PermissionResolvable; user?: Discord.PermissionResolvable };
}

export type Command = BaseInteraction & {
  options?: { global?: boolean; guilds?: string[] };
  body: Discord.ApplicationCommandData;
  exec: (params: BaseParams & { interaction: Discord.CommandInteraction | Discord.ContextMenuInteraction }) => void;

  path?: string; // Automaticely added, this is path of command
};

export type Button = BaseInteraction & {
  data: Discord.MessageButton | (Discord.MessageButtonOptions & { customId: string });
  exec: (params: BaseParams & { interaction: Discord.ButtonInteraction }) => void;
};

export type SelectMenu = BaseInteraction & {
  data: Discord.MessageSelectMenu | (Discord.MessageSelectMenuOptions & { customId: string });
  exec: (params: BaseParams & { interaction: Discord.SelectMenuInteraction }) => void;
};
