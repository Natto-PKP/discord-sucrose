import type Types from '../../typings';
import BaseInteractionManager from './BaseInteractionManager';

export default class AutocompleteInteractionManager
  extends BaseInteractionManager<Types.AutocompleteData>
  implements Types.AutocompleteInteractionManager {
  public override add(interaction: Types.AutocompleteData | Types.Autocomplete): void {
    const autocomplete = interaction as Types.AutocompleteData;
    const bodies = Array.isArray(autocomplete.body) ? autocomplete.body : [autocomplete.body];

    bodies.forEach((body: Types.AutocompleteBody) => {
      let key = body.command;
      if (body.group) key += `:${body.group}`;
      if (body.option) key += `:${body.option}`;

      this.cache.set(key, { ...autocomplete, body });
    });
  }
}
