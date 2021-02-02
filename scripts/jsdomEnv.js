const JsdomEnv = require('jest-environment-jsdom-fifteen');
const jsdom = require('jsdom');

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(global.console, { omitJSDOMErrors: true });

module.exports = class CustomJsdomEnv extends (
  JsdomEnv
) {
  constructor(config, context) {
    super(
      {
        ...config,
        testEnvironmentOptions: { virtualConsole: virtualConsole },
      },
      context
    );
  }
};
