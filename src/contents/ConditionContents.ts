import type { ConditionContents } from '../../typings';

const base = '❌ ` | error `';

export default <ConditionContents>{
  CONDITION_FAILED: () => ({
    content: `${base} custom condition failed`,
    ephemeral: true,
  }),
};
