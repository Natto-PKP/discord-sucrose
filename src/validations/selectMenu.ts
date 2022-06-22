import type Types from '../../typings';

import { SError, STypeError } from '../errors';

/**
 * validate or not the structure of a select menu
 */
export default (selectMenu: Types.SelectMenuData) => {
  if (!selectMenu || typeof selectMenu !== 'object') throw STypeError('selectMenu', 'object', selectMenu);
  if (!selectMenu.data || typeof selectMenu.data !== 'object') throw STypeError('data', 'object', selectMenu.data);
  if (!selectMenu.data.customId || typeof selectMenu.data.customId !== 'string') throw STypeError('data.customId', 'string', selectMenu.data.customId);
  const { customId } = selectMenu.data;

  if (selectMenu.data.type !== 'SELECT_MENU') throw STypeError(`(${customId}) data.type`, 'SELECT_MENU', selectMenu.data.type);
  if (typeof selectMenu.data.disabled !== 'undefined' && typeof selectMenu.data.disabled !== 'boolean') throw STypeError(`(${customId}) data.disabled`, 'boolean', selectMenu.data.disabled);
  if (typeof selectMenu.data.maxValues !== 'undefined' && (typeof selectMenu.data.maxValues !== 'number' || selectMenu.data.maxValues < 0)) throw STypeError(`(${customId}) data.maxValue`, 'positive integer', selectMenu.data.maxValues);
  if (typeof selectMenu.data.maxValues !== 'undefined' && selectMenu.data.maxValues > 25) throw SError('ERROR', `selectMenu "${customId}" cannot have more than 25 in maxValues`);
  if (typeof selectMenu.data.minValues !== 'undefined' && (typeof selectMenu.data.minValues !== 'number' || selectMenu.data.minValues < 0)) throw STypeError(`(${customId}) data.minValues`, 'positive integer', selectMenu.data.minValues);
  if (selectMenu.data.placeholder && typeof selectMenu.data.placeholder !== 'string') throw STypeError(`(${customId}) data.placeholder`, 'string', selectMenu.data.placeholder);
  if (typeof selectMenu.exec === 'function') SError('WARN', `url button "${customId}" does not need an exec function`);
  if (selectMenu.permissions && typeof selectMenu.permissions === 'object') SError('WARN', `url button "${customId}" does not need an permissions object`);

  if (selectMenu.data.options) {
    if (!Array.isArray(selectMenu.data.options)) throw STypeError(`(${customId}) data.options`, 'array', selectMenu.data.options);
    if (!selectMenu.data.options.length) SError('WARN', `selectMenu "${customId}" options should not be empty`);

    selectMenu.data.options.forEach((option) => {
      if (!option.label || typeof option.label !== 'string') throw STypeError(`(${customId}) label`, 'string', option.label);
      if (!option.value || typeof option.value !== 'string') throw STypeError(`(${customId}) value`, 'string', option.value);
      if (typeof option.default !== 'undefined' && typeof option.default !== 'boolean') throw STypeError(`(${customId}) default`, 'boolean', option.default);
      if (option.description && typeof option.description !== 'string') throw STypeError(`(${customId}) description`, 'string', option.description);
    });
  }
};
