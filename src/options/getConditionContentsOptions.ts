import { ConditionContents } from '../contents';
import type Types from '../../typings';

export default (options: Types.SucroseOptions<false, true>): Types.ConditionContents => ({
  CONDITION_FAILED: options.contents?.CONDITION_FAILED || ConditionContents.CONDITION_FAILED,
});
