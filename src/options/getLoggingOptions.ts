import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.LoggingOptions => ({
  details: typeof options.logging?.details === 'boolean' ? options.logging.details : false,
  loadings: typeof options.logging?.loadings === 'boolean' ? options.logging.loadings : true,
});
