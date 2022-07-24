import type Types from '../../typings';

export default (options: Types.InteractionManagerOptions): Types.BaseInteractionManagerOptions => ({
  directory: options.directories.buttons,
  env: options.env,
  logging: options.logging,
  name: 'button',
});
