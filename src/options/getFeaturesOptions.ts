import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.Features => ({
  interactions: {
    hooks: options.features?.interactions.hooks || {},
  },
});
