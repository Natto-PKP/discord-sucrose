/* eslint-disable consistent-return */

import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ComponentType,
  InteractionType,
  InteractionReplyOptions,
} from 'discord.js';

/* Types */
import type Discord from 'discord.js';
import type Types from '../../typings';
import Sucrose from '../Sucrose';

import {
  SucroseError, SucroseCooldownError, SucroseInteractionError, SucrosePermissionError,
} from '../errors';
import BaseInteractionManager from './BaseInteractionManager';
import InteractionCommandManager from './InteractionCommandManager';
import Logger from '../services/Logger';
import * as defaults from '../options';
import ConditionService from '../services/ConditionService';
import { SucroseConditionError } from '../errors/SConditionError';

export default class InteractionManager implements Types.InteractionManager {
  private builded = false;

  private logger: Logger;

  public autocompletes: BaseInteractionManager<Types.AutocompleteData>;

  public buttons: BaseInteractionManager<Types.ButtonData>;

  public commands: InteractionCommandManager;

  public forms: BaseInteractionManager<Types.FormData>;

  public selectMenus: BaseInteractionManager<Types.SelectMenuData>;

  public constructor(private sucrose: Sucrose, private options: Types.InteractionManagerOptions) {
    this.logger = new Logger(options.logging);

    // # init managers
    const autocompleteOptions = defaults.getAutocompleteInteractionManagerOptions(options);
    const buttonOptions = defaults.getButtonInteractionManagerOptions(options);
    const commandOptions = defaults.getCommandManagerOptions(options);
    const formOptions = defaults.getFormInteractionManagerOptions(options);
    const selectMenuOptions = defaults.getSelectMenuInteractionManagerOptions(options);

    this.autocompletes = new BaseInteractionManager<Types.AutocompleteData>(autocompleteOptions);
    this.buttons = new BaseInteractionManager<Types.ButtonData>(buttonOptions);
    this.commands = new InteractionCommandManager(sucrose, commandOptions);
    this.forms = new BaseInteractionManager<Types.FormData>(formOptions);
    this.selectMenus = new BaseInteractionManager<Types.SelectMenuData>(selectMenuOptions);
  }

  /**
   * build this manager and all interaction manager
   */
  public async build(): Promise<void> {
    // # prevent multiple build
    if (this.builded) throw new SucroseError('ERROR', 'InteractionManager is already build');
    this.builded = true;

    // # build interaction managers
    await this.autocompletes.build().catch((err: Error) => this.logger.handle(err));
    await this.buttons.build().catch((err: Error) => this.logger.handle(err));
    await this.commands.build().catch((err: Error) => this.logger.handle(err));
    await this.forms.build().catch((err: Error) => this.logger.handle(err));
    await this.selectMenus.build().catch((err: Error) => this.logger.handle(err));

    // # listen to interactionCreate event
    this.sucrose.on('interactionCreate', async (interaction) => {
      await this.listener(interaction).catch(async (err: Error) => {
        const { contents } = this.options;

        // # if an error and can reply to interaction
        if (err instanceof Error && interaction.isRepliable()) {
          let content: InteractionReplyOptions;

          // # manager sucrose interaction error or sucrose permission error
          if (err instanceof SucroseInteractionError || err instanceof SucrosePermissionError) {
            content = await err.content as InteractionReplyOptions;
            await interaction.reply(content).catch(() => null);

            // # manager sucrose cooldown error
          } else if (err instanceof SucroseCooldownError) {
            const { key, cooldown } = err;
            const response = await contents.COOLDOWN_HIT({ key, cooldown, interaction });
            content = response as InteractionReplyOptions;
            await interaction.reply(content).catch(() => null);

            // # manager sucrose condition error
          } if (err instanceof SucroseConditionError) {
            const { conditions } = err;
            const response = await contents.CONDITION_FAILED({ conditions, interaction });
            content = response as InteractionReplyOptions;
            await interaction.reply(content).catch(() => null);

            // # manager other type of errors
          } else {
            const response = await contents.ERROR({ interaction, error: err });
            content = response as InteractionReplyOptions;
            await interaction.reply(content).catch(() => null);
          }
        }
      });
    });
  }

  /**
   * handle interaction
   * @param interaction - current interaction
   */
  private async listener(
    interaction: Discord.Interaction,
  ) {
    // # define listener variable
    const { sucrose, options: { contents, features: { hooks } } } = this;
    const { cooldown, permission } = sucrose;
    const params = { sucrose };
    const { guild } = interaction;

    // # interaction is a form
    if (interaction.type === InteractionType.ModalSubmit) {
      // # get form
      const { customId } = interaction; // get form id
      const form = this.forms.cache.get(customId);
      if (!form) return;
      const formId = form.body.customId; // define id

      // # form conditions
      if (form.conditions) {
        const { conditions } = form;
        const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
        if (!alright) throw new SucroseConditionError(`custom error failed on form "${customId}"`, conditions);
      }

      // # form permissions
      if (form.permissions) {
        await permission.isAuthorized({ interaction, permissions: form.permissions });
      }

      // # form cooldowns
      if (form.cooldowns) {
        await cooldown.isOver({ interaction, cooldowns: form.cooldowns, id: formId });
      }

      // # form can't be executed
      if (!form.exec) throw new SucroseInteractionError(`form "${customId}" exec function not define`, contents.FORM_INTERACTION_MISSING_EXEC({ interaction, customId }));

      const baseHookParams = { interaction, sucrose };
      const hookParams = { ...baseHookParams, data: form };

      // # before hooks
      if (form.hooks?.beforeExecute) await form.hooks.beforeExecute(baseHookParams);
      if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
      if (hooks?.beforeFormExecute) await hooks.beforeFormExecute(hookParams);

      // # execute form
      await form.exec({ ...params, interaction });

      // # after form
      if (form.hooks?.afterExecute) await form.hooks.afterExecute(baseHookParams);
      if (hooks?.afterFormExecute) await hooks.afterFormExecute(hookParams);
      if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);

      // # interaction is autocomplete
    } else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
      // # get autocomplete info
      const { commandName } = interaction;
      const groupName = interaction.options.getSubcommandGroup();
      const optionName = interaction.options.getFocused();

      // # get autocomplete
      let key = commandName;
      if (groupName) key += groupName;
      if (optionName) key += optionName;
      const autocomplete = this.autocompletes.cache.get(key);
      if (!autocomplete) throw new SucroseInteractionError(`autocomplete "${key}" interaction missing`, contents.AUTOCOMPLETE_INTERACTION_MISSING({ interaction, key }));

      // # autocomplete conditions
      if (autocomplete.conditions) {
        const { conditions } = autocomplete;
        const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
        if (!alright) throw new SucroseConditionError(`custom error failed on autocomplete "${key}"`, conditions);
      }

      // # autocomplete permissions
      if (autocomplete.permissions) {
        await permission.isAuthorized({ interaction, permissions: autocomplete.permissions });
      }

      // # autocomplete cooldowns
      if (autocomplete.cooldowns) {
        await cooldown.isOver({ interaction, cooldowns: autocomplete.cooldowns, id: key });
      }

      // # autocomplete can't be executed
      if (!autocomplete.exec) throw new SucroseInteractionError(`autocomplete "${key}" exec function not define`, contents.AUTOCOMPLETE_INTERACTION_MISSING_EXEC({ interaction, key }));

      const baseHookParams = { interaction, sucrose };
      const hookParams = { ...baseHookParams, data: autocomplete };

      // # before hooks
      if (autocomplete.hooks?.beforeExecute) await autocomplete.hooks.beforeExecute(baseHookParams);
      if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
      if (hooks?.beforeAutocompleteExecute) await hooks.beforeAutocompleteExecute(hookParams);

      // # execute autocomplete
      await autocomplete.exec({ ...params, interaction });

      // # after hooks
      if (autocomplete.hooks?.afterExecute) await autocomplete.hooks.afterExecute(baseHookParams);
      if (hooks?.afterAutocompleteExecute) await hooks.afterAutocompleteExecute(hookParams);
      if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);

      // # interaction is command
    } else if (interaction.type === InteractionType.ApplicationCommand) {
      // # get command
      const name = interaction.commandName; // get command
      const command = (guild && sucrose.interactions.commands.guilds.get(guild.id)?.cache.get(name))
        || sucrose.interactions.commands.cache.get(name);
      if (!command) throw new SucroseInteractionError(`chat input "${name}" interaction missing`, contents.CHAT_INPUT_INTERACTION_MISSING({ interaction, name }));

      // # interaction is chat input
      if (interaction.commandType === ApplicationCommandType.ChatInput) {
        const chatInput = <Types.ChatInputData>command; // cast
        const chatInputId = chatInput.body.name; // define an id
        const groupName = interaction.options.getSubcommandGroup(false);
        const optionName = interaction.options.getSubcommand(false);

        // # command conditions
        if (chatInput.conditions) {
          const { conditions } = chatInput;
          const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
          if (!alright) throw new SucroseConditionError(`custom error failed on chat input "${chatInputId}"`, conditions);
        }

        // # chat input permissions
        if (command.permissions) {
          await permission.isAuthorized({ interaction, permissions: command.permissions });
        }

        // # chat input cooldowns
        if (command.cooldowns) {
          await cooldown.isOver({ interaction, cooldowns: command.cooldowns, id: chatInputId });
        }

        // # chat input has a group
        if (groupName) {
          // # get chat input group
          const group = chatInput.options.get(groupName) as Types.ChatInputSubGroupOptionData;
          if (!group || group.body.type !== ApplicationCommandOptionType.SubcommandGroup) throw new SucroseInteractionError(`group "${groupName}" of "${name}" chat input is missing`, contents.CHAT_INPUT_GROUP_MISSING({ interaction, name, group: groupName }));
          const groupId = `${chatInputId}:${group.body.name}`; // define an id

          // # command group conditions
          if (group.conditions) {
            const { conditions } = group;
            const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
            if (!alright) throw new SucroseConditionError(`custom error failed on command group "${groupId}"`, conditions);
          }

          // # group permissions
          if (group.permissions) {
            await permission.isAuthorized({ interaction, permissions: group.permissions });
          }

          // # group cooldowns
          if (group.cooldowns) {
            await cooldown.isOver({ interaction, cooldowns: group.cooldowns, id: groupId });
          }

          // # before hooks
          if (group.hooks?.beforeExecute) await group.hooks.beforeExecute({ sucrose });

          // # execute if exec exist
          if (group.exec) await group.exec({ sucrose });

          // # after hooks
          if (group.hooks?.afterExecute) await group.hooks.afterExecute({ sucrose });

          // # get group option
          const option = optionName && group.options.get(optionName);
          const contentParams = { name, group: groupName, option: optionName as string };
          if (!option) throw new SucroseInteractionError(`option "${optionName}" of group "${groupName}" of chat input "${name}" is missing`, contents.CHAT_INPUT_GROUP_OPTION_MISSING({ interaction, ...contentParams }));
          const optionId = `${chatInputId}:${groupId}:${option.body.name}`; // define an id

          // # command group option conditions
          if (option.conditions) {
            const { conditions } = option;
            const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
            if (!alright) throw new SucroseConditionError(`custom error failed on command group option "${optionId}"`, conditions);
          }

          // # group option permissions
          if (option.permissions) {
            await permission.isAuthorized({ interaction, permissions: option.permissions });
          }

          // # group option cooldowns
          if (option.cooldowns) {
            await cooldown.isOver({ interaction, cooldowns: option.cooldowns, id: optionId });
          }

          // # option can't be executed
          if (!option.exec) throw new SucroseInteractionError(`option "${optionName}" of group "${groupName}" of chat input "${name}" exec function is not define`, contents.CHAT_INPUT_GROUP_OPTION_MISSING_EXEC({ interaction, ...contentParams }));

          const baseHookParams = { interaction, sucrose };
          const hookParams = { ...baseHookParams, data: option };

          // # before hooks
          if (option.hooks?.beforeExecute) await option.hooks.beforeExecute(baseHookParams);
          if (hooks?.beforeCommandExecute) await hooks.beforeCommandExecute(hookParams);
          if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
          if (hooks?.beforeChatInputOptionExecute) {
            await hooks.beforeChatInputOptionExecute(hookParams);
          }

          // # execute option
          await option.exec({ ...params, interaction });

          // # after hooks
          if (option.hooks?.afterExecute) await option.hooks.afterExecute(baseHookParams);
          if (hooks?.afterChatInputOptionExecute) {
            await hooks.afterChatInputOptionExecute(hookParams);
          }
          if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);
          if (hooks?.afterCommandExecute) await hooks.afterCommandExecute(hookParams);

          // # chat input don't have group but have option
        } else if (optionName) {
          // # get chat input option
          const option = chatInput.options.get(optionName) as Types.ChatInputSubOptionData;
          if (!option || option.body.type !== ApplicationCommandOptionType.Subcommand) throw new SucroseInteractionError(`option "${optionName}" of chat input "${name}" is missing`, contents.CHAT_INPUT_OPTION_MISSING({ interaction, name, option: optionName }));
          const optionId = `${chatInputId}:${option.body.name}`; // define an id

          // # command option conditions
          if (option.conditions) {
            const { conditions } = option;
            const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
            if (!alright) throw new SucroseConditionError(`custom error failed on command option "${optionId}"`, conditions);
          }

          // # option permissions
          if (option.permissions) {
            await permission.isAuthorized({ interaction, permissions: option.permissions });
          }

          // # option cooldowns
          if (option.cooldowns) {
            await cooldown.isOver({ interaction, cooldowns: option.cooldowns, id: optionId });
          }

          // # option can't be executed
          if (!option.exec) throw new SucroseInteractionError(`option "${optionName}" of "${name}" chat input exec is not define`, contents.CHAT_INPUT_OPTION_MISSING_EXEC({ interaction, name, option: optionName }));

          const baseHookParams = { interaction, sucrose };
          const hookParams = { ...baseHookParams, data: option };

          // # before hooks
          if (option.hooks?.beforeExecute) await option.hooks.beforeExecute(baseHookParams);
          if (hooks?.beforeCommandExecute) await hooks.beforeCommandExecute(hookParams);
          if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
          if (hooks?.beforeChatInputOptionExecute) {
            await hooks.beforeChatInputOptionExecute(hookParams);
          }

          // # execute option
          await option.exec({ ...params, interaction });

          // # after hooks
          if (option.hooks?.afterExecute) await option.hooks.afterExecute(baseHookParams);
          if (hooks?.afterChatInputOptionExecute) {
            await hooks.afterChatInputOptionExecute(hookParams);
          }
          if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);
          if (hooks?.afterCommandExecute) await hooks.afterCommandExecute(hookParams);

          // # interaction is just a chat input without any option
        } else {
          // # chat input can't be executed
          if (!chatInput.exec) throw new SucroseInteractionError(`chat input "${name}" exec function is not define`, contents.CHAT_INPUT_INTERACTION_MISSING_EXEC({ interaction, name }));

          const baseHookParams = { interaction, sucrose };
          const hookParams = { ...baseHookParams, data: chatInput };

          // # before hooks
          if (chatInput.hooks?.beforeExecute) await chatInput.hooks.beforeExecute(baseHookParams);
          if (hooks?.beforeCommandExecute) await hooks.beforeCommandExecute(hookParams);
          if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
          if (hooks?.beforeChatInputExecute) await hooks.beforeChatInputExecute(hookParams);

          // # execute chat input
          await chatInput.exec({ ...params, interaction });

          // # after hooks
          if (chatInput.hooks?.afterExecute) await chatInput.hooks.afterExecute(baseHookParams);
          if (hooks?.afterChatInputExecute) await hooks.afterChatInputExecute(hookParams);
          if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);
          if (hooks?.afterCommandExecute) await hooks.afterCommandExecute(hookParams);
        }

        // # interaction is message command
      } else if (interaction.commandType === ApplicationCommandType.Message) {
        const context = command as Types.MessageContextCommandData; // cast
        const contextId = command.body.name; // defined an id

        // # message context command conditions
        if (context.conditions) {
          const { conditions } = context;
          const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
          if (!alright) throw new SucroseConditionError(`custom error failed on message context command "${contextId}"`, conditions);
        }

        // # context permissions
        if (context.permissions) {
          await permission.isAuthorized({ interaction, permissions: context.permissions });
        }

        // # context cooldowns
        if (context.cooldowns) {
          await cooldown.isOver({ interaction, cooldowns: context.cooldowns, id: contextId });
        }

        // # context can't be executed
        if (!context.exec) throw new SucroseInteractionError(`message context menu "${name}" exec function is not define`, contents.MESSAGE_CONTEXT_MENU_MISSING_EXEC({ interaction, name }));

        const baseHookParams = { interaction, sucrose };
        const hookParams = { ...baseHookParams, data: context };

        // # before hooks
        if (context.hooks?.beforeExecute) await context.hooks.beforeExecute(baseHookParams);
        if (hooks?.beforeCommandExecute) await hooks.beforeCommandExecute(hookParams);
        if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
        if (hooks?.beforeMessageCommandExecute) await hooks.beforeMessageCommandExecute(hookParams);

        // # execute context
        await context.exec({ ...params, interaction });

        // # after hooks
        if (context.hooks?.afterExecute) await context.hooks.afterExecute(baseHookParams);
        if (hooks?.afterMessageCommandExecute) await hooks.afterMessageCommandExecute(hookParams);
        if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);
        if (hooks?.afterCommandExecute) await hooks.afterCommandExecute(hookParams);

        // # interaction is user command
      } else if (interaction.commandType === ApplicationCommandType.User) {
        const context = command as Types.UserContextCommandData; // cast
        const contextId = command.body.name; // defined an id

        // # user context command conditions
        if (context.conditions) {
          const { conditions } = context;
          const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
          if (!alright) throw new SucroseConditionError(`custom error failed on user context command "${contextId}"`, conditions);
        }

        // # context permissions
        if (command.permissions) {
          await permission.isAuthorized({ interaction, permissions: command.permissions });
        }

        // # context cooldowns
        if (command.cooldowns) {
          await cooldown.isOver({ interaction, cooldowns: command.cooldowns, id: contextId });
        }

        // # context can't be executed
        if (!context.exec) throw new SucroseInteractionError(`user context menu "${name}" exec function is not define`, contents.USER_CONTEXT_MENU_MISSING_EXEC({ interaction, name }));

        const baseHookParams = { interaction, sucrose };
        const hookParams = { ...baseHookParams, data: context };

        // # before hooks
        if (context.hooks?.beforeExecute) await context.hooks.beforeExecute(baseHookParams);
        if (hooks?.beforeCommandExecute) await hooks.beforeCommandExecute(hookParams);
        if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
        if (hooks?.beforeUserCommandExecute) await hooks.beforeUserCommandExecute(hookParams);

        // # execute context
        await context.exec({ ...params, interaction });

        // # after context
        if (context.hooks?.afterExecute) await context.hooks.afterExecute(baseHookParams);
        if (hooks?.afterUserCommandExecute) await hooks.afterUserCommandExecute(hookParams);
        if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);
        if (hooks?.afterCommandExecute) await hooks.afterCommandExecute(hookParams);
      }

      // # interaction is a message component
    } else if (interaction.type === InteractionType.MessageComponent) {
      // # interaction is a select menu
      if ([
        ComponentType.ChannelSelect,
        ComponentType.MentionableSelect,
        ComponentType.RoleSelect,
        ComponentType.StringSelect,
        ComponentType.UserSelect,
      ].includes(interaction.componentType) && interaction.componentType !== ComponentType.Button) {
        // # get select meny
        const { customId } = interaction;
        const selectMenu = this.selectMenus.cache.get(customId);
        if (!selectMenu) return;

        const selectMenuId = selectMenu.body.customId; // define an id

        // # select menu conditions
        if (selectMenu.conditions) {
          const { conditions } = selectMenu;
          const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
          if (!alright) throw new SucroseConditionError(`custom error failed on select menu "${selectMenuId}"`, conditions);
        }

        // # select menu permissions
        if (selectMenu.permissions) {
          await permission.isAuthorized({ interaction, permissions: selectMenu.permissions });
        }

        // # select menu cooldowns
        if (selectMenu.cooldowns) {
          await cooldown.isOver({ interaction, cooldowns: selectMenu.cooldowns, id: selectMenuId });
        }

        // # select menu can't be executed
        if (!selectMenu.exec) throw new SucroseInteractionError(`select menu "${customId}" exec function is not define`, contents.SELECT_MENU_INTERACTION_MISSING_EXEC({ interaction, customId }));

        const baseHookParams = { interaction, sucrose };
        const hookParams = { ...baseHookParams, data: selectMenu };

        // # before hooks
        if (selectMenu.hooks?.beforeExecute) await selectMenu.hooks.beforeExecute(baseHookParams);
        if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
        if (hooks?.beforeSelectMenuExecute) await hooks.beforeSelectMenuExecute(hookParams);

        // # execute select menu
        await selectMenu.exec({ ...params, interaction });

        // # after hooks
        if (selectMenu.hooks?.afterExecute) await selectMenu.hooks.afterExecute(baseHookParams);
        if (hooks?.afterSelectMenuExecute) await hooks.afterSelectMenuExecute(hookParams);
        if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);

        // # interaction in a button
      } else if (interaction.componentType === ComponentType.Button) {
        // # get button
        const { customId } = interaction;
        const button = this.buttons.cache.get(customId);
        if (!button) return;
        const buttonId = 'url' in button.body ? button.body.url : button.body.customId; // define an id

        // # button conditions
        if (button.conditions) {
          const { conditions } = button;
          const alright = await ConditionService.isAlright({ interaction, sucrose, conditions });
          if (!alright) throw new SucroseConditionError(`custom error failed on button "${buttonId}"`, conditions);
        }

        // # button permissions
        if (button.permissions) {
          await permission.isAuthorized({ interaction, permissions: button.permissions });
        }

        // # button cooldowns
        if (button.cooldowns) {
          await cooldown.isOver({ interaction, cooldowns: button.cooldowns, id: buttonId });
        }

        // # button can't be executed
        if (!button.exec) throw new SucroseInteractionError(`button "${customId}" exec function is not define`, contents.BUTTON_INTERACTION_MISSING_EXEC({ interaction, customId }));

        const baseHookParams = { interaction, sucrose };
        const hookParams = { ...baseHookParams, data: button };

        // # before hooks
        if (button.hooks?.beforeExecute) await button.hooks.beforeExecute(baseHookParams);
        if (hooks?.beforeInteractionExecute) await hooks.beforeInteractionExecute(hookParams);
        if (hooks?.beforeButtonExecute) await hooks.beforeButtonExecute(hookParams);

        // # execute button
        await button.exec({ ...params, interaction });

        // # after hooks
        if (button.hooks?.afterExecute) await button.hooks.afterExecute(baseHookParams);
        if (hooks?.afterButtonExecute) await hooks.afterButtonExecute(hookParams);
        if (hooks?.afterInteractionExecute) await hooks.afterInteractionExecute(hookParams);
      }

      // # interaction is unknown
    } else throw new SucroseInteractionError('interaction is unknown', contents.UNKNOWN_INTERACTION({ interaction }));
  }
}
