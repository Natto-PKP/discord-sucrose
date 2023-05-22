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
        || interaction.body instanceof Discord.StringSelectMenuBuilder
    ) {
      const body = interaction.body.data as Discord.APIRoleSelectComponent
      | Discord.APIUserSelectComponent
      | Discord.APIMentionableSelectComponent
      | Discord.APIStringSelectComponent;

      selectMenu.body = {
        ...body,
        customId: body.custom_id as string,
        maxValues: body.max_values,
        minValues: body.min_values,
      };
    } else if (interaction.body instanceof Discord.ChannelSelectMenuBuilder) {
      const body = interaction.body.data as Discord.APIChannelSelectComponent;

      selectMenu.body = {
        ...body,
        customId: body.custom_id as string,
        maxValues: body.max_values,
        minValues: body.min_values,
        channelTypes: body.channel_types,
      };
    }

    this.cache.set(selectMenu.body.customId, selectMenu);
  }
}
