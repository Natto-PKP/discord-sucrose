import type Types from '../../typings';
import * as contents from '../contents';

export default (options: Types.SucroseOptions): Types.Features => ({
  interactions: {
    autoReply: {
      active: typeof options.features?.interactions?.autoReply?.active === 'boolean' ? options.features.interactions.autoReply.active : true,
      contents: {
        ...contents,
        ...(options.features?.interactions?.autoReply?.contents || {}),
      } as Types.InteractionAutoReplyContents,
    },
  },
});
