import type { CooldownContents } from '../../typings';

const base = '❌ ` | error `';

export default <CooldownContents>{
  COOLDOWN_HIT: () => ({
    content: `${base} you have to wait before`,
    ephemeral: true,
  }),
};
