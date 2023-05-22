import Discord from 'discord.js';
import type Types from '../../typings';
import BaseInteractionManager from './BaseInteractionManager';

export default class SelectMenuInteractionManager
  extends BaseInteractionManager<Types.SelectMenuData>
  implements SelectMenuInteractionManager {
  public override add(interaction: Types.SelectMenuData | Types.SelectMenu): void {
    const selectMenu = interaction as Types.SelectMenuData;

    if (
      interaction.body instanceof Discord.UserSelectMenuBuilder
        || interaction.body instanceof Discord.RoleSelectMenuBuilder
        || interaction.body instanceof Discord.MentionableSelectMenuBuilder
    ) {
      const body = interaction.body.data as Discord.APIRoleSelectComponent
      | Discord.APIUserSelectComponent
      | Discord.APIMentionableSelectComponent;

      selectMenu.body = {
        disabled: Boolean(body.disabled),
        customId: body.custom_id as string,
        maxValues: body.max_values,
        minValues: body.min_values,
        placeholder: body.placeholder,
        type: body.type,
      };
    } else if (interaction.body instanceof Discord.StringSelectMenuBuilder) {
      const body = interaction.body.data as Discord.APIStringSelectComponent;
      const options = [
        ...(body.options || []),
        ...(interaction.body.options || []).map((option) => option.data),
      ];

      selectMenu.body = {
        disabled: Boolean(body.disabled),
        customId: body.custom_id as string,
        maxValues: body.max_values,
        minValues: body.min_values,
        placeholder: body.placeholder,
        type: body.type,
        options: options as Discord.SelectMenuComponentOptionData[],
      };
    } else if (interaction.body instanceof Discord.ChannelSelectMenuBuilder) {
      const body = interaction.body.data as Discord.APIChannelSelectComponent;

      selectMenu.body = {
        disabled: Boolean(body.disabled),
        customId: body.custom_id as string,
        maxValues: body.max_values,
        minValues: body.min_values,
        channelTypes: body.channel_types,
        placeholder: body.placeholder,
        type: body.type || Discord.ComponentType.ChannelSelect,
      };
    }

    this.cache.set(selectMenu.body.customId, selectMenu);
  }
}
