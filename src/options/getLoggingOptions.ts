import type Types from '../../typings';

export default (options: Types.SucroseOptions): Types.LoggerOptions => ({
  verbose: typeof options.logging?.verbose === 'boolean' ? options.logging.verbose : false,
  directory: typeof options.logging?.directory === 'string' ? options.logging.directory : undefined,
  details: typeof options.logging?.details === 'boolean' ? options.logging.details : false,
});
