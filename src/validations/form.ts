import type Types from '../../typings';

import { SError, STypeError } from '../errors';

/**
 * validate or not the structure of a form modal
 * @internal
 */
export default (form: Types.FormData) => {
  if (!form || typeof form !== 'object') throw STypeError('form', 'object', form);
  if (!form.data || typeof form.data !== 'object') throw STypeError('data', 'object', form.data);

  if (!form.data.customId || typeof form.data.customId !== 'string') throw STypeError('customId', 'string', form.data.customId);
  if (!form.data.title || typeof form.data.title !== 'string') throw STypeError('title', 'string', form.data.title);

  if (Array.isArray(form.data.components)) {
    form.data.components.forEach((row) => {
      if (row.type !== 'ACTION_ROW') throw STypeError('row.type', '"ACTION_ROW"', row.type);
      if (!Array.isArray(row.components)) throw STypeError('row.components', 'array', row.components);
      row.components.forEach((component) => {
        if (component.type !== 'TEXT_INPUT') throw STypeError('component.type', '"TEXT_INPUT"', component.type);
        if (typeof component.label !== 'string') throw STypeError('component.label', 'string', component.label);
        if (typeof component.style !== 'string') throw STypeError('component.style', 'string', component.style);
        if (['SHORT', 'PARAGRAPH'].includes(component.style)) throw STypeError('component.style', '"SHORT" | "PARAGRAPH"', component.style);
        if (component.minLength && typeof component.minLength !== 'number') throw STypeError('component.minLength', 'number', component.minLength);
        if (component.maxLength && typeof component.maxLength !== 'number') throw STypeError('component.maxLength', 'number', component.maxLength);
        if (component.minLength && component.maxLength && component.minLength <= component.maxLength) throw SError('ERROR', 'component.minLength must be inferior of component.maxLength');
        if (component.placeholder && typeof component.placeholder !== 'string') throw STypeError('component.placeholder', 'string', component.placeholder);
        if (component.required && typeof component.required !== 'boolean') throw STypeError('component.required', 'boolean', component.required);
        if (component.value && typeof component.value !== 'string') throw STypeError('component.value', 'string', component.value);
      });
    });
  }

  if (form.exec && typeof form.exec !== 'function') STypeError(`(${form.data.customId}) exec`, 'function', form.exec);
};
