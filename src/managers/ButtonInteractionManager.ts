import Discord from 'discord.js';
import type Types from '../../typings';
import BaseInteractionManager from './BaseInteractionManager';

export default class ButtonInteractionManager
  extends BaseInteractionManager<Types.ButtonData>
  implements Types.ButtonInteractionManager {
  public override add(interaction: Types.ButtonData | Types.Button): void {
    const button = interaction as Types.ButtonData;

    if (interaction.body instanceof Discord.ButtonBuilder) {
      const body = interaction.body.data as Discord.APIButtonComponent;
      if ('custom_id' in body) button.body = { ...body, customId: body.custom_id };
      else if ('url' in body) button.body = body;
    }

    if ('customId' in button.body) this.cache.set(button.body.customId, button);
    else if ('url' in button.body) this.cache.set(button.body.url, button);
  }
}
