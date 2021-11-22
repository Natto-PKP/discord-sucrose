import Discord, {
  ApplicationCommandData,
  ButtonInteraction,
  ClientEvents,
  CommandInteraction,
  MessageButton,
  MessageButtonOptions,
  MessageSelectMenu,
  MessageSelectMenuOptions,
  PermissionResolvable,
  SelectMenuInteraction,
} from 'discord.js';
import { Sucrose } from 'src/structures/sucrose';

// Events
export type Params<K extends keyof ClientEvents> = { sucrose: Sucrose; args: ClientEvents[K] };
export interface __event<K extends keyof ClientEvents> {
  listener: (params: Params[K]) => void;
}

// Interactions
interface BaseInteraction {
  permissions?: { client?: PermissionResolvable; user?: PermissionResolvable };
}

export type Command = BaseInteraction & {
  options?: { global?: boolean; guilds?: string[] };
  body: ApplicationCommandData;
  exec: (params: Params<'interactionCreate'> & { args: [interaction: CommandInteraction] }) => void;
};

export type Button = BaseInteraction & {
  data: MessageButton | (MessageButtonOptions & { customId: string });
  exec: (params: Params<'interactionCreate'> & { args: [interaction: ButtonInteraction] }) => void;
};

export type SelectMenu = BaseInteraction & {
  data: MessageSelectMenu | (MessageSelectMenuOptions & { customId: string });
  exec: (params: Params<'interactionCreate'> & { args: [interaction: SelectMenuInteraction] }) => void;
};
