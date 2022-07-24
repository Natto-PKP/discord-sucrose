import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.EnvironmentOptions => ({
  ext: options.env?.ext || 'js',
  source: options.env?.source || '',
});
