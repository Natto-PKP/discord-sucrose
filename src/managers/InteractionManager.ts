import Discord from 'discord.js';
import { LoggerOptions, Logger } from '../utils/Logger';
import { Sucrose } from '../Sucrose';
import { ButtonManager } from './ButtonManager';
import { CooldownManager } from './CooldownManager';
import { CommandManager } from './CommandManager';
import { SelectMenuManager } from './SelectMenuManager';
import { ModalManager } from './ModalManager';
import { PermissionManager } from './PermissionManager';
import { BaseInteraction } from '../structures/BaseInteraction';

/**
 * Interaction manager options
 * @public
 */
export interface InteractionManagerOptions {
  managers?: {
    buttons?: ButtonManager | null;
    cooldowns?: CooldownManager | null;
    commands?: CommandManager | null;
    selectMenus?: SelectMenuManager | null;
    modals?: ModalManager | null;
    permissions?: PermissionManager | null;
  } | null;
  sucrose?: Sucrose | null;
  logger?: LoggerOptions;
}

/**
 * Interaction manager
 * @public
 */
export class InteractionManager {
  /**
   * interaction with buttons
   */
  public buttons: ButtonManager;

  /**
   * interaction with commands
   */
  public commands: CommandManager;

  /**
   * interaction with modals
   */
  public modals: ModalManager;

  /**
   * interaction with select menus
   */
  public selectMenus: SelectMenuManager;

  /**
   * interaction with cooldowns
   */
  public cooldowns: CooldownManager;

  /**
   * interaction with permissions
   */
  public permissions: PermissionManager;

  /**
   * @internal
   */
  private sucrose: Sucrose | null;

  /**
   * @internal
   */
  private logger: Logger | null;

  constructor(options?: InteractionManagerOptions) {
    this.sucrose = options?.sucrose || null;

    this.logger = new Logger('InteractionManager', options?.logger);
    this.cooldowns = options?.managers?.cooldowns || new CooldownManager();
    this.permissions = options?.managers?.permissions || new PermissionManager();

    const opts = { sucrose: options?.sucrose || null };
    this.buttons = options?.managers?.buttons || new ButtonManager(opts);
    this.commands = options?.managers?.commands || new CommandManager(opts);
    this.modals = options?.managers?.modals || new ModalManager(opts);
    this.selectMenus = options?.managers?.selectMenus || new SelectMenuManager(opts);
  }

  /**
   * @param interaction - Discord interaction
   */
  public async listener(interaction: Discord.Interaction): Promise<void> {
    try {
      // # Message component
      if (interaction.type === Discord.InteractionType.MessageComponent) {
        const { customId } = interaction;

        // # Button
        if (interaction.componentType === Discord.ComponentType.Button) {
          const button = this.buttons.collection.find((b) => {
            const body = b.body instanceof Discord.ButtonBuilder ? b.body.toJSON() : b.body;
            if ('url' in body || b.disabled) return false;
            return ('customId' in body ? body.customId : body.custom_id) === customId;
          });

          if (button) this.execute(button, interaction);
        } else {
        // # Select menu
          const selectMenu = this.selectMenus.collection.find((s) => {
            const body = s.body instanceof Discord.BaseSelectMenuBuilder ? s.body.toJSON() : s.body;
            if (s.disabled) return false;
            return ('customId' in body ? body.customId : body.custom_id) === customId;
          });

          if (selectMenu) this.execute(selectMenu, interaction);
        }
      } else if (interaction.type === Discord.InteractionType.ModalSubmit) {
      // # Modal
        const modal = this.modals.collection.find((m) => {
          const body = m.body instanceof Discord.ModalBuilder ? m.body.toJSON() : m.body;
          if (m.disabled) return false;
          return ('customId' in body ? body.customId : body.custom_id) === interaction.customId;
        });

        if (modal) this.execute(modal, interaction);
      } else if (interaction.type === Discord.InteractionType.ApplicationCommand) {
      // # Command
        const command = this.commands.collection.find((c) => {
          const body = c.body instanceof Discord.ContextMenuCommandBuilder
        || c.body instanceof Discord.SlashCommandBuilder ? c.body.toJSON() : c.body;
          if (c.disabled) return false;
          return body.name === interaction.commandName;
        });

        if (command) this.execute(command, interaction);
      }
    } catch (err) {
      this.logger?.error(err as Error);
    }
  }

  /**
   * execute an interaction
   * @param structure - interaction structure
   * @param interaction - Discord interaction
   */
  public async execute(
    structure: BaseInteraction<any, any>,
    interaction: Discord.Interaction,
  ): Promise<void> {
    const baseParams = { sucrose: this.sucrose, client: interaction.client };

    const params = {
      guild: interaction.guild,
      channel: interaction.channel,
      member: interaction.member,
      user: interaction.user,
      ...baseParams,
    };

    if (structure.permissions) await this.permissions.check(structure.permissions, params);
    if (structure.cooldowns) await this.cooldowns.check(structure.cooldowns, params);

    const executeParams = { ...baseParams, interaction };
    if (structure.beforeExecute) await structure.beforeExecute(executeParams);
    if (structure.execute) await structure.execute(executeParams);
    if (structure.afterExecute) await structure.afterExecute(executeParams);
  }

  /**
   * listen to interactions event
   * @param client - Discord client
   */
  public listen(client = this.sucrose): void {
    if (!client) throw new Error('No client provided');
    client.on('interactionCreate', this.listener.bind(this));
  }
}
