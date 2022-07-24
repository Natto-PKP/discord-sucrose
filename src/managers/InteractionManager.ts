/* eslint-disable consistent-return */

import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ComponentType,
  Interaction,
  InteractionType,
} from 'discord.js';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';
import type Sucrose from '../Sucrose';

import { SError, SInteractionError, SucroseInteractionError } from '../errors';
import BaseInteractionManager from './BaseInteractionManager';
import Logger from '../services/Logger';
import * as defaults from '../options';

/**
 * Structure for manage all classic interaction
 * @category managers
 *
 * @public
 * @example Initialize new InteractionManager
 * ```js
 * new InteractionManager(sucrose, options);
 * ```
 */
export default class InteractionManager implements Types.InteractionManager {
  /**
   * Define if this manager is builded or not
   */
  private builded = false;

  /**
   * autocomplete interaction manager
   */
  public autocompletes: BaseInteractionManager<Types.AutocompleteData>;

  /**
   * buttons interaction manager
   */
  public buttons: BaseInteractionManager<Types.ButtonData>;

  /**
   * form modals interaction manager
   */
  public forms: BaseInteractionManager<Types.FormData>;

  /**
   * select menus interaction manager
   */
  public selectMenus: BaseInteractionManager<Types.SelectMenuData>;

  public constructor(private sucrose: Sucrose, private options: Types.InteractionManagerOptions) {
    const autocompleteOptions = defaults.getAutocompleteInteractionManagerOptions(options);
    const buttonOptions = defaults.getButtonInteractionManagerOptions(options);
    const formOptions = defaults.getFormInteractionManagerOptions(options);
    const selectMenuOptions = defaults.getSelectMenuInteractionManagerOptions(options);

    this.autocompletes = new BaseInteractionManager<Types.AutocompleteData>(autocompleteOptions);
    this.buttons = new BaseInteractionManager<Types.ButtonData>(buttonOptions);
    this.forms = new BaseInteractionManager<Types.FormData>(formOptions);
    this.selectMenus = new BaseInteractionManager<Types.SelectMenuData>(selectMenuOptions);
  }

  /**
   * build this manager and all interaction manager
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'InteractionManager is already build');
    this.builded = true;

    await this.autocompletes.build();
    await this.buttons.build();
    await this.forms.build();
    await this.selectMenus.build();

    this.sucrose.on('interactionCreate', async (interaction) => {
      await this.listener(interaction).catch((err: Error) => {
        const { autoReply } = this.options.features;
        const content = autoReply.contents.ERROR({ interaction, error: err });
        const { channel } = interaction;

        if (autoReply.active && content && channel) {
          channel.send(content as Discord.MessageOptions).catch(() => null);
        }

        if (err instanceof SucroseInteractionError) this.sucrose.emit('error', err);
        else this.sucrose.emit('error', SInteractionError(err.message, content));
        Logger.handle(err);
      });
    });
  }

  /**
   * handle interaction
   * @internal
   *
   * @param interaction - current interaction
   */
  private async listener(
    interaction: Discord.Interaction,
  ): Promise<unknown> {
    const { sucrose, options: { features: { autoReply: { contents } } } } = this;
    const params = { sucrose };
    const { guild } = interaction;

    // ? modal form
    if (interaction.type === InteractionType.ModalSubmit) {
      const { customId } = interaction;
      const form = this.forms.get(customId);

      if (!form) return;
      await this.permissions(interaction, form.permissions);
      if (!form.exec) throw SInteractionError(`form "${customId}" exec function not define`, contents.FORM_INTERACTION_MISSING_EXEC({ interaction, customId }));
      return form.exec({ ...params, interaction });
    } // [end] modal form

    // ? autocomplete
    if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
      const { commandName } = interaction;
      const groupName = interaction.options.getSubcommandGroup();
      const optionName = interaction.options.getFocused();

      let key = commandName;
      if (groupName) key += groupName;
      if (optionName) key += optionName;
      const autocomplete = this.autocompletes.get(key);

      if (!autocomplete) throw SInteractionError(`autocomplete "${key}" interaction missing`, contents.AUTOCOMPLETE_INTERACTION_MISSING({ interaction, key }));
      if (!autocomplete.exec) throw SInteractionError(`autocomplete "${key}" exec function not define`, contents.AUTOCOMPLETE_INTERACTION_MISSING_EXEC({ interaction, key }));
      return autocomplete.exec({ ...params, interaction });
    } // [end] autocomplete

    // ? command or context menu
    if (interaction.type === InteractionType.ApplicationCommand) {
      const name = interaction.commandName;
      const command = (guild && sucrose.commands.guilds.get(guild.id)?.get(name))
        || sucrose.commands.get(name);

      if (!command) throw SInteractionError(`chat input "${name}" interaction missing`, contents.CHAT_INPUT_INTERACTION_MISSING({ interaction, name }));
      await this.permissions(interaction, command.permissions);

      // ? command
      if (interaction.commandType === ApplicationCommandType.ChatInput) {
        const chatInput = <Types.ChatInputData>command;
        const groupName = interaction.options.getSubcommandGroup(false);
        const optionName = interaction.options.getSubcommand(false);

        // ? sub command group
        if (groupName) {
          const group = chatInput.options.get(groupName) as Types.ChatInputSubGroupOptionData;

          if (!group || group.body.type !== ApplicationCommandOptionType.SubcommandGroup) throw SInteractionError(`group "${groupName}" of "${name}" chat input is missing`, contents.CHAT_INPUT_GROUP_MISSING({ interaction, name, group: groupName }));
          await this.permissions(interaction, group.permissions);
          const option = optionName && group.options.get(optionName);

          const contentParams = { name, group: groupName, option: optionName as string };
          if (!option) throw SInteractionError(`option "${optionName}" of group "${groupName}" of chat input "${name}" is missing`, contents.CHAT_INPUT_GROUP_OPTION_MISSING({ interaction, ...contentParams }));
          if (!option.exec) throw SInteractionError(`option "${optionName}" of group "${groupName}" of chat input "${name}" exec function is not define`, contents.CHAT_INPUT_GROUP_OPTION_MISSING_EXEC({ interaction, ...contentParams }));
          return option.exec({ ...params, interaction });
        } // [end] sub command group
        // ? sub command
        if (optionName) {
          const option = chatInput.options.get(optionName) as Types.ChatInputSubOptionData;

          if (!option || option.body.type !== ApplicationCommandOptionType.Subcommand) throw SInteractionError(`option "${optionName}" of chat input "${name}" is missing`, contents.CHAT_INPUT_OPTION_MISSING({ interaction, name, option: optionName }));
          if (!option.exec) throw SInteractionError(`option "${optionName}" of "${name}" chat input exec is not define`, contents.CHAT_INPUT_OPTION_MISSING_EXEC({ interaction, name, option: optionName }));
          return option.exec({ ...params, interaction });
        } // [end] sub command

        if (!chatInput.exec) throw SInteractionError(`chat input "${name}" exec function is not define`, contents.CHAT_INPUT_INTERACTION_MISSING_EXEC({ interaction, name }));
        return chatInput.exec({ ...params, interaction });
      } // [end] command

      // ? message context menu
      if (interaction.commandType === ApplicationCommandType.Message) {
        const context = command as Types.MessageContextMenuData;
        if (!context.exec) throw SInteractionError(`message context menu "${name}" exec function is not define`, contents.MESSAGE_CONTEXT_MENU_MISSING_EXEC({ interaction, name }));
        return context.exec({ ...params, interaction });
      } // [end] message context menu

      // ? user context menu
      if (interaction.commandType === ApplicationCommandType.User) {
        const context = command as Types.UserContextMenuData;
        if (!context.exec) throw SInteractionError(`user context menu "${name}" exec function is not define`, contents.USER_CONTEXT_MENU_MISSING_EXEC({ interaction, name }));
        return context.exec({ ...params, interaction });
      } // [end] user context menu
    } // [end] command or context menu

    // ? message component
    if (interaction.type === InteractionType.MessageComponent) {
      // ? select menu
      if (interaction.componentType === ComponentType.SelectMenu) {
        const { customId } = interaction;
        const selectMenu = this.selectMenus.get(customId);
        if (!selectMenu) return;
        await this.permissions(interaction, selectMenu.permissions);
        if (!selectMenu.exec) throw SInteractionError(`select menu "${customId}" exec function is not define`, contents.SELECT_MENU_INTERACTION_MISSING_EXEC({ interaction, customId }));
        return selectMenu.exec({ ...params, interaction });
      } // [end] select menu

      // ? button
      if (interaction.componentType === ComponentType.Button) {
        const { customId } = interaction;
        const button = this.buttons.get(customId);
        if (!button) return;
        await this.permissions(interaction, button.permissions);
        if (!button.exec) throw SInteractionError(`button "${customId}" exec function is not define`, contents.BUTTON_INTERACTION_MISSING_EXEC({ interaction, customId }));
        return button.exec({ ...params, interaction });
      } // [end] button
    }

    throw SInteractionError('interaction is unknown', contents.UNKNOWN_INTERACTION({ interaction }));
  }

  /**
   * handle interaction permissions
   * @internal
   *
   * @param interaction - current interaction
   * @param permissions - current interaction permissions
   */
  private async permissions(
    interaction: Interaction,
    permissions?: Types.Permissions,
  ): Promise<void> {
    if (!permissions) return;

    const { features: { autoReply: { contents } } } = this.options;
    const { user, channel } = interaction;

    // ! Guild check
    if (interaction.guild && interaction.guild.members.me) {
      const guild = <Discord.Guild>interaction.guild;
      const member = <Discord.GuildMember>interaction.member;
      const me = <Discord.GuildMember>guild.members.me;

      // ! Client
      if (permissions.client) {
        const missing = me.permissions.missing(permissions.client);
        if (missing.length) throw SInteractionError('client does not have permissions', contents.PERMISSIONS_CLIENT_MISSING({ interaction, permissions: missing }));
      }

      // ! Member
      if (permissions.member) {
        const missing = member.permissions.missing(permissions.member);
        if (missing.length) throw SInteractionError('member does not have permissions', contents.PERMISSIONS_CURRENT_MEMBER_MISSING({ interaction, permissions: missing }));
      }

      // ! Roles
      if (permissions.roles) {
        const arr = <string[]>permissions.roles;
        const has = member.roles.cache.some((r) => arr.includes(r.id));
        if (!has) throw SInteractionError('member don\'t have allowed member', contents.PERMISSIONS_MEMBER_ALLOW_ROLES_MISSING({ interaction, roleIDs: arr }));
      }

      // ! Guilds
      if (permissions.guilds) {
        const arr = <string[]>permissions.guilds;
        const has = arr.includes((<Discord.Guild>guild).id);
        if (!has) throw SInteractionError('current guild is not allowed', contents.PERMISSIONS_CURRENT_GUILD_NOT_ALLOWED({ interaction, guildIDs: arr }));
      }

      // ! Channels
      if (permissions.channels) {
        const arr = <string[]>permissions.channels;
        const has = arr.includes((<Discord.GuildChannel>channel).id);
        if (!has) throw SInteractionError('current channel is not allowed', contents.PERMISSIONS_CURRENT_GUILD_CHANNEl_NOT_ALLOWED({ interaction, channelIDs: arr }));
      }

      // ! Only private
      if (permissions.private) throw SInteractionError('guild is not allowed', contents.PERMISSIONS_GUILD_NOT_ALLOWED({ interaction }));
    } // [end] Guild check

    // ! Users
    if (permissions.users) {
      const arr = <string[]>permissions.users;
      const has = arr.includes(user.id);
      if (!has) throw SInteractionError('current user is not allowed', contents.PERMISSIONS_CURRENT_USER_NOT_ALLOWED({ interaction, userIDs: arr }));
    }

    // ! Only guild
    if (!interaction.guild && typeof permissions.private === 'boolean' && !permissions.private) {
      throw SInteractionError('current private channel is not allowed', contents.PERMISSIONS_PRIVATE_CHANNEL_NOT_ALLOWED({ interaction }));
    }
  }
}
