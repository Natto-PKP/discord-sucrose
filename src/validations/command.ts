import type Types from '../../typings';

import { SError, STypeError } from '../errors';

type Interaction = Types.CommandData | Types.SubCommandGroupData | Types.SubCommandData;
export default (interaction: Interaction, fullName: string) => {
  if (!interaction || typeof interaction !== 'object') throw STypeError(`(${fullName}) command or option`, 'object', interaction);

  const data = 'body' in interaction ? interaction.body : interaction.option;
  if (!data || typeof data !== 'object') throw STypeError(`(${fullName}) body or option`, 'object', data);

  const { name } = data;
  const { exec } = interaction;

  if (!name || typeof name !== 'string') throw STypeError('name', 'string', name);
  if (exec && typeof exec !== 'function') throw STypeError(`(${fullName}) exec`, 'function', exec);

  // ! context menu
  if ('body' in interaction && (interaction.body.type === 'MESSAGE' || interaction.body.type === 'USER')) {
    const { body } = interaction;

    if (typeof body.defaultPermission !== 'undefined' && typeof body.defaultPermission !== 'boolean') throw STypeError(`(${fullName}) body.defaultPermission`, 'boolean', body.defaultPermission);
    if ('options' in body) SError('WARN', `context menu "${fullName}" cannot have options`);

    // [end] context menu
  } else if ('body' in interaction && (!interaction.body.type || interaction.body.type === 'CHAT_INPUT')) { // ! chat input
    const { body } = interaction;

    if (!body.description || typeof body.description !== 'string') throw STypeError(`(${fullName}) body.description`, 'string', body.description);
    if (typeof body.defaultPermission !== 'undefined' && typeof body.defaultPermission !== 'boolean') throw STypeError(`(${fullName}) body.defaultPermission`, 'boolean', body.defaultPermission);

    // [end] chat input
  } else if ('option' in interaction) { // ! sub command or sub command group
    const { option } = interaction;

    if (option.type !== 'SUB_COMMAND' && option.type !== 'SUB_COMMAND_GROUP') throw STypeError(`(${fullName}) option.type`, 'SUB_COMMAND or SUB_COMMAND_GROUP', option.type);
    if (!option.description || typeof option.description !== 'string') throw STypeError(`(${fullName}) option.description`, 'string', option.description);
    if (typeof option.autocomplete !== 'undefined' && typeof option.autocomplete !== 'boolean') throw STypeError(`(${fullName}) option.autocomplete`, 'boolean', option.autocomplete);

    // [end] sub command or sub command group
  } else throw SError('ERROR', `command "${fullName}" does not have a valid type`); // [end] context menu
};
