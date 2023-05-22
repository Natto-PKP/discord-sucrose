import Discord from 'discord.js';
import type Types from '../../typings';
import BaseInteractionManager from './BaseInteractionManager';

export default class ModalInteractionManager
  extends BaseInteractionManager<Types.ModalData>
  implements Types.ModalInteractionManager {
  public override add(interaction: Types.ModalData | Types.Modal): void {
    const modal = interaction as Types.ModalData;

    if (interaction.body instanceof Discord.ModalBuilder) {
      const body = interaction.body.data as Discord.APIModalInteractionResponseCallbackData;

      modal.body = {
        title: body.title,
        customId: body.custom_id,
        components: body.components.map((row) => ({
          type: row.type,
          components: row.components.map((component) => ({
            ...component,
            customId: component.custom_id,
            maxLength: component.max_length,
            minLength: component.min_length,
          })) as Discord.ModalActionRowComponentData[],
        })),
      };
    }

    this.cache.set(modal.body.customId, modal);
  }
}
