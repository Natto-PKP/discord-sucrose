/* eslint-disable consistent-return */

import { Collection } from 'discord.js';
import path from 'path';
import { existsSync, lstatSync, readdirSync } from 'fs';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';
import type Sucrose from '../structures/Sucrose';

import { SError } from '../errors';
import ButtonInteractionManager from './ButtonInteractionManager';
import SelectMenuInteractionManager from './SelectMenuInteractionManager';
import FormModalInteractionManager from './FormModalInteractionManager';
import Logger from '../services/Logger';

/**
 * interaction manager
 * @public
 * @category Managers
 */
export default class InteractionManager {
  private builded = false;

  /**
   * manager of buttons
   */
  public buttons: ButtonInteractionManager;

  /**
   * manager of form modals
   */
  public forms: FormModalInteractionManager;

  /**
   * manager of select menu
   */
  public selectMenus: SelectMenuInteractionManager;

  /**
   * @internal
   */
  public constructor(private sucrose: Sucrose, private options: {
    contents: Required<Types.InteractionContent>;
    ext: 'js' | 'ts';
    path: string;
  }) {
    this.buttons = new ButtonInteractionManager({ ext: options.ext, path: path.join(options.path, 'buttons') });
    this.forms = new FormModalInteractionManager({ ext: options.ext, path: path.join(options.path, 'forms') });
    this.selectMenus = new SelectMenuInteractionManager({ ext: options.ext, path: path.join(options.path, 'select-menus') });

    sucrose.on('interactionCreate', async (interaction) => {
      try { await this.listener(interaction); } catch (err) {
        if (!(err instanceof Error)) return;
        Logger.handle(err);

        const { channel } = interaction;
        if (channel) await channel.send(options.contents.ERROR(err) as Discord.MessageOptions);
      }
    });
  }

  /**
   * load and build all interactions
   * @internal
   */
  public async build(): Promise<void> {
    if (this.builded) throw SError('ERROR', 'InteractionManager is already build');
    this.builded = true;

    // ! buttons manager
    const buttonPath = path.join(this.options.path, 'buttons');
    if (existsSync(buttonPath) && lstatSync(buttonPath).isDirectory()) {
      const files = readdirSync(buttonPath).filter((file) => lstatSync(path.join(buttonPath, file)).isFile() && file.endsWith(`.${this.options.ext}`));

      this.buttons.collection = new Collection();
      if (files.length) await this.buttons.add(files);
    }

    // ! select menus manager
    const selectMenuPath = path.join(this.options.path, 'select-menus');
    if (existsSync(selectMenuPath) && lstatSync(selectMenuPath).isDirectory()) {
      const files = readdirSync(selectMenuPath).filter((file) => lstatSync(path.join(selectMenuPath, file)).isFile() && file.endsWith(`.${this.options.ext}`));

      this.selectMenus.collection = new Collection();
      if (files.length) await this.selectMenus.add(files);
    }

    // ! form modals manager
    const formPath = path.join(this.options.path, 'forms');
    if (existsSync(formPath) && lstatSync(formPath).isDirectory()) {
      const files = readdirSync(formPath).filter((file) => lstatSync(path.join(formPath, file)).isFile() && file.endsWith(`.${this.options.ext}`));

      this.forms.collection = new Collection();
      if (files.length) await this.forms.add(files);
    }
  }

  /**
   * handle interaction
   * @internal
   *
   * @param interaction - current interaction
   */
  private async listener(interaction: Discord.Interaction): Promise<void> {
    const { sucrose, options: { contents } } = this;
    const params = { sucrose };
    const { guild } = interaction;

    // command or context menu
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const name = interaction.commandName;
      const commands = (guild && sucrose.commands.guilds.get(guild.id)) || sucrose.commands;
      const command = commands.collection.get(name) || sucrose.commands.collection.get(name);
      if (!command || await this.permissions(interaction, command.permissions)) return;

      // command
      if (interaction.isCommand()) {
        const chatInput = <Types.ChatInputData>command;
        const groupName = interaction.options.getSubcommandGroup(false);
        const optionName = interaction.options.getSubcommand(false);

        // sub command groupe or sub command
        if (groupName || optionName) {
          const option = (groupName || optionName)
            && chatInput.options?.get(groupName || optionName as string);
          if (!option) return interaction.reply(contents.MISSING_SUB_COMMAND_GROUP(name));
          if (await this.permissions(interaction, option.permissions)) return;

          // sub command
          if (option.option.type === 'SUB_COMMAND_GROUP') {
            const opts = (<Types.SubCommandGroupData>option).options;
            const subOption = optionName && opts.get(optionName);
            if (!subOption) return interaction.reply(contents.MISSING_SUB_COMMAND(name));
            if (await this.permissions(interaction, subOption.permissions)) return;

            if (!subOption.exec) {
              return interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
            } return subOption.exec({ ...params, interaction });
          } // [end] sub command

          if (!option.exec) return interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
          return option.exec({ ...params, interaction });
        } // [end] sub command groupe or sub command

        if (!chatInput.exec) {
          return interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
        } return chatInput.exec({ ...params, interaction });
      } // [end] command

      if (!command.exec) return interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(name));
      return command.exec({ ...params, interaction: <Types.DiscordCommand>interaction });
    } // [end] command or context menu

    // select menu
    if (interaction.isSelectMenu()) {
      const { customId } = interaction;
      const selectMenu = this.selectMenus.collection.get(customId);
      if (!selectMenu || await this.permissions(interaction, selectMenu.permissions)) return;
      if (!selectMenu.exec) {
        return interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(customId));
      } return selectMenu.exec({ ...params, interaction });
    } // [end] select menu

    // button
    if (interaction.isButton()) {
      const { customId } = interaction;
      const button = this.buttons.collection.get(customId);
      if (!button || await this.permissions(interaction, button.permissions)) return;
      if (!button.exec) return interaction.reply(contents.MISSING_LOCAL_INTERACTION_EXEC(customId));
      return button.exec({ ...params, interaction });
    } // [end] button
  }

  /**
   * handle interaction permissions
   * @internal
   *
   * @param interaction - current interaction
   * @param permissions - current interaction permissions
   */
  private async permissions(
    interaction: Discord.CommandInteraction
    | Discord.ButtonInteraction
    | Discord.SelectMenuInteraction
    | Discord.ContextMenuInteraction,
    permissions?: Types.Permissions,
  ): Promise<Discord.Message | void> {
    if (!permissions) return;

    const { contents } = this.options;
    const { client, user, channel } = interaction;

    // ! Guild check
    if (interaction.guild && interaction.guild.me) {
      const guild = <Discord.Guild>interaction.guild;
      const member = <Discord.GuildMember>interaction.member;

      // ! Client
      if (permissions.client) {
        const missing = interaction.guild.me.permissions.missing(permissions.client);
        if (missing.length) {
          const content = contents.PERMISSIONS_MISSING_CLIENT(client, missing);
          return interaction.reply(content);
        }
      }

      // ! Member
      if (permissions.member) {
        const missing = (<Discord.Permissions>member?.permissions).missing(permissions.member);
        if (missing.length) {
          const content = contents.PERMISSIONS_MISSING_MEMBER(member, missing);
          return interaction.reply(content);
        }
      }

      // ! Roles
      if (permissions.roles) {
        const arr = <string[]>permissions.roles;
        const has = member.roles.cache.some((r) => arr.includes(r.id));
        if (!has) {
          const roles = guild.roles.cache.filter((r) => arr.includes(r.id));
          const content = contents.PERMISSIONS_MISSING_ALLOW_ROLES(member, roles);
          return interaction.reply(content);
        }
      }

      // ! Guilds
      if (permissions.guilds) {
        const arr = <string[]>permissions.guilds;
        const has = arr.includes((<Discord.Guild>guild).id);
        if (!has) {
          const guilds = client.guilds.cache.filter((g) => arr.includes(g.id));
          const content = contents.PERMISSIONS_MISSING_ALLOW_GUILDS(member, guilds);
          return interaction.reply(content);
        }
      }

      // ! Channels
      if (permissions.channels) {
        const arr = <string[]>permissions.channels;
        const has = arr.includes((<Discord.GuildChannel>channel).id);
        if (!has) {
          const channels = guild.channels.cache.filter((c) => arr.includes(c.id));
          const content = contents.PERMISSIONS_MISSING_ALLOW_CHANNELS(member, channels);
          return interaction.reply(content);
        }
      }
    } // [end] Guild check

    // ! Users
    if (permissions.users) {
      const arr = <string[]>permissions.users;
      const has = arr.includes(user.id);
      if (!has) {
        const users = client.users.cache.filter((u) => arr.includes(u.id));
        const content = contents.PERMISSIONS_MISSING_ALLOW_USERS(user, users);
        return interaction.reply(content);
      }
    }

    // ! Private
    if (!interaction.guild && typeof permissions.private === 'boolean' && !permissions.private) {
      const content = contents.PERMISSIONS_DENY_PRIVATE();
      return interaction.reply(content);
    }
  }
}
