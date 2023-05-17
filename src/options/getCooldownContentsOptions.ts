import { CooldownContents } from '../contents';
import type Types from '../../typings';

export default (options: Types.SucroseOptions<false, true>): Types.CooldownContents => ({
  COOLDOWN_HIT: options.contents?.COOLDOWN_HIT || CooldownContents.COOLDOWN_HIT,
});
