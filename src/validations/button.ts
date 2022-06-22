import type Types from '../../typings';

import { SError, STypeError } from '../errors';

/**
 * validate or not the structure of a button
 */
export default (button: Types.ButtonData) => {
  if (!button || typeof button !== 'object') throw STypeError('button', 'object', button);
  if (!button.data || typeof button.data !== 'object') throw STypeError('data', 'object', button.data);
  const name = 'url' in button.data ? button.data.url : button.data.customId;

  if (!name || typeof name !== 'string') throw STypeError('customId or url', 'string', name);
  if (button.data.type !== 'BUTTON') throw SError('ERROR', `button "${name}" must be have type "BUTTON"`);
  if (typeof button.data.disabled !== 'undefined' && typeof button.data.disabled !== 'boolean') throw STypeError('data.disabled', 'boolean', button.data.disabled);
  if (button.data.label && typeof button.data.label !== 'string') throw STypeError(`(${name}) data.label`, 'string', button.data.label);

  if ('url' in button.data) {
    const { url } = button.data;
    if (button.data.style && button.data.style !== 'LINK') throw SError('ERROR', `style is not available url button "${url}"`);
    if (typeof button.exec === 'function') SError('WARN', `url button "${url}" does not need an exec function`);
    if (button.permissions && typeof button.permissions === 'object') SError('WARN', `url button "${url}" does not need an permissions object`);
  } else {
    const { customId } = button.data;
    if (!button.data.style || typeof button.data.style !== 'string') throw STypeError(`(${customId}) data.style`, 'string', button.data.style);
    if (button.exec && typeof button.exec !== 'function') STypeError(`(${customId}) exec`, 'function', button.exec);
  }
};
