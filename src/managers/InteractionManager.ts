/* eslint-disable consistent-return */

import { Collection } from 'discord.js';
import path from 'path';
import { existsSync, lstatSync, readdirSync } from 'fs';

/* Types */
import type Types from '../../typings';

import { SError } from '../errors';
import ButtonInteractionManager from './ButtonInteractionManager';
import SelectMenuInteractionManager from './SelectMenuInteractionManager';
import Logger from '../services/Logger';
import hasPermissions from '../utils/hasPermissions';

/**
 * Interaction manager
 */
export default class InteractionManager implements Types.InteractionManager {
  private builded = false;

  /**
   * Button manager
   */
  public buttons: Types.ButtonInteractionManager;

  /**
   * Select menu manager
   */
  public selectMenus: Types.SelectMenuInteractionManager;

  public constructor(sucrose: Types.Sucrose, private options: Types.InteractionManagerOptions) {
    this.buttons = new ButtonInteractionManager({ ...options, path: path.join(options.path, 'buttons') });
    this.selectMenus = new SelectMenuInteractionManager({ ...options, path: path.join(options.path, 'select-menus') });
    const { content } = options;

    sucrose.on('interactionCreate', async (interaction) => {
      try {
        const params = { sucrose };
        const { guild } = interaction;

        // ! command or context menu
        if (interaction.isCommand() || interaction.isContextMenu()) {
          const name = interaction.commandName;
          const commands = (guild && sucrose.commands.guilds.get(guild.id)) || sucrose.commands;
          const command = commands.collection.get(name) || sucrose.commands.collection.get(name);
          if (!command) return;

          const commandPermission = hasPermissions(interaction, command.permissions || {}, content);
          if (commandPermission) return await interaction.reply(commandPermission);

          // ! command
          if (interaction.isCommand()) {
            const chatInput = <Types.ChatInputData>command;
            const groupName = interaction.options.getSubcommandGroup(false);
            const optionName = interaction.options.getSubcommand(false);

            // ! sub command group or sub command
            if (groupName || optionName) {
              const option = chatInput.options
                && ((groupName && chatInput.options.get(groupName)) || (optionName && chatInput.options.get(optionName)));
              if (!option) return await interaction.reply(content.MISSING_SUB_COMMAND_GROUP(name));

              const optionPermission = hasPermissions(interaction, option.permissions || {}, content);
              if (optionPermission) return await interaction.reply(optionPermission);

              // ! sub command
              if (option.option.type === 'SUB_COMMAND_GROUP') {
                const opts = (<Types.SubCommandGroupData>option).options;
                const subOption = optionName && opts.get(optionName);
                if (!subOption) return await interaction.reply(content.MISSING_SUB_COMMAND(name));

                const subCommandPermission = hasPermissions(interaction, subOption.permissions || {}, content);
                if (subCommandPermission) return await interaction.reply(subCommandPermission);

                if (!subOption.exec) return await interaction.reply(content.MISSING_LOCAL_INTERACTION_EXEC(name));
                return await subOption.exec({ ...params, interaction });
              } // [end] sub command

              if (!option.exec) return await interaction.reply(content.MISSING_LOCAL_INTERACTION_EXEC(name));
              return await option.exec({ ...params, interaction });
            } // [end] sub command group or sub command

            if (!chatInput.exec) return await interaction.reply(content.MISSING_LOCAL_INTERACTION_EXEC(name));
            return await chatInput.exec({ ...params, interaction });
          } // [end] command

          if (!command.exec) return await interaction.reply(content.MISSING_LOCAL_INTERACTION_EXEC(name));
          return await command.exec({ ...params, interaction: <Types.DiscordCommand>interaction });
        } // [end] command or context menu

        // ! select menu
        if (interaction.isSelectMenu()) {
          const { customId } = interaction;
          const selectMenu = this.selectMenus.collection.get(customId);
          if (!selectMenu) return await interaction.reply(content.MISSING_LOCAL_INTERACTION(customId));

          const permission = hasPermissions(interaction, selectMenu.permissions || {}, content);
          if (permission) return await interaction.reply(permission);

          if (!selectMenu.exec) return await interaction.reply(content.MISSING_LOCAL_INTERACTION_EXEC(customId));
          return await selectMenu.exec({ ...params, interaction });
        } // [end] select menu

        // ! button
        if (interaction.isButton()) {
          const { customId } = interaction;
          const button = this.buttons.collection.get(customId);
          if (!button) return await interaction.reply(content.MISSING_LOCAL_INTERACTION(customId));

          const permission = hasPermissions(interaction, button.permissions || {}, content);
          if (permission) return await interaction.reply(permission);

          if (!button.exec) return await interaction.reply(content.MISSING_LOCAL_INTERACTION_EXEC(customId));
          return await button.exec({ ...params, interaction });
        } // [end] button
      } catch (err) {
        if (err instanceof Error) Logger.error(err);
        if (Array.isArray(err)) Logger.handle(...err);
      }
    });
  }

  /**
   * Build all interactions
   * @returns
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'InteractionManager is already build');

    // ! buttons manager
    const buttonPath = path.join(this.options.path, 'buttons');
    if (existsSync(buttonPath) && lstatSync(buttonPath).isDirectory()) {
      const files = readdirSync(buttonPath).filter((file) => lstatSync(path.join(buttonPath, file)).isFile() && file.endsWith(`.${this.options.env.ext}`));

      this.buttons.collection = new Collection();
      if (!files.length) return;

      await this.buttons.add(files);
    }

    // ! select menus manager
    const selectMenuPath = path.join(this.options.path, 'select-menus');
    if (existsSync(selectMenuPath) && lstatSync(selectMenuPath).isDirectory()) {
      const files = readdirSync(selectMenuPath).filter((file) => lstatSync(path.join(selectMenuPath, file)).isFile() && file.endsWith(`.${this.options.env.ext}`));

      this.selectMenus.collection = new Collection();
      if (!files.length) return;

      await this.selectMenus.add(files);
    }

    this.builded = true;
  } // [end] build()
}
