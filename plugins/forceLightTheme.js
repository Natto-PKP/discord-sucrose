// eslint-disable-next-line import/no-unresolved
const { JSX } = require('typedoc');

exports.load = function load(app) {
  app.renderer.hooks.on('head.begin', () => JSX.createElement(
    'script',
    null,
    JSX.createElement(JSX.Raw, { html: "localStorage.setItem('tsd-theme', localStorage.getItem('tsd-theme') || 'light')" }),
  ));
};
