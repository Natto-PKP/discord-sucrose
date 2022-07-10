import type Types from '../../typings';

import { STypeError } from '../errors';

/**
 * validate or not the structure of a autocomplete
 * @internal
 */
export default (autocomplete: Types.AutocompleteData) => {
  if (!autocomplete || typeof autocomplete !== 'object') throw STypeError('autocomplete', 'object', autocomplete);
  if (!autocomplete.body || typeof autocomplete.body !== 'object') throw STypeError('autocomplete.body', 'object', autocomplete.body);
  if (typeof autocomplete.body.command !== 'string') throw STypeError('body.command', 'string', autocomplete.body.command);
  if (autocomplete.body.option && typeof autocomplete.body.option !== 'string') throw STypeError('body.option', 'string', autocomplete.body.option);
};
