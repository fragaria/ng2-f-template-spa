import { Logger } from './logger';

let consoleCatched: boolean = false;

export function consoleCatcher(logger: Logger) {
  if (!consoleCatched) {
    consoleCatched = true;

    var oldLogFunctions = {
      'log': null,
      'debug': null,
      'info': null,
      'warn': null,
      'error': null
    }

    /* IE9 no console hack */

    if (typeof console === 'undefined') {
      (window as any).console = {
        log: function(){},
        debug: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
      };
    }

    for (let methodName in oldLogFunctions) {
      if (console && console[methodName]) {
        oldLogFunctions[methodName] = console[methodName];
        console[methodName] = function () {

          //modern browsers
          if (oldLogFunctions[methodName].apply) {
            logger.consoleMethods[methodName] = function() { oldLogFunctions[methodName].apply(console, arguments) };
          }
          //ie9
          else {
            logger.consoleMethods[methodName] = Function.prototype.bind.call(oldLogFunctions[methodName], console);
          }

          // send message to your logger.
          logger[methodName].apply(logger, arguments);

        };
      }
    }
  }

}
