import type Types from '../../typings';
import getConditionContentsOptions from './getConditionContentsOptions';
import getCooldownContentsOptions from './getCooldownContentsOptions';
import getInteractionContentsOptions from './getInteractionContentsOptions';
import getPermissionContentsOptions from './getPermissionContentsOptions';

export default (options: Types.SucroseOptions<false, true>): Types.Contents => ({
  ...getInteractionContentsOptions(options),
  ...getPermissionContentsOptions(options),
  ...getCooldownContentsOptions(options),
  ...getConditionContentsOptions(options),
});
