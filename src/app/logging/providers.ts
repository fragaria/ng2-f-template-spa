import { ErrorHandler } from '@angular/core';

import { Config } from '../config';

import { Options, Logger } from "./logger";
import { Level } from "./level";
import { LoggingErrorHandler, LOGGING_ERROR_HANDLER_OPTIONS } from './error-handlers';

export var LOGGING_ERROR_HANDLER_PROVIDERS = [
  {
    provide: LOGGING_ERROR_HANDLER_OPTIONS,
    useValue: LOGGING_ERROR_HANDLER_OPTIONS
  },
  {
    provide: ErrorHandler,
    useClass: LoggingErrorHandler
  }
];

export const LOGGER_PROVIDERS: any[] = [
  {
    provide: Options,
    useFactory: (config: Config) => {
      let options = {};
      if (config.getVal('logging.allowConsoleCatch') !== undefined) options['allowConsoleCatch'] = config.getVal('logging.allowConsoleCatch');
      if (config.getVal('logging.level') !== undefined) options['level'] = config.getVal('logging.level');
      if (config.getVal('logging.onlyMsgInConsole') !== undefined) options['onlyMsgInConsole'] = config.getVal('logging.onlyMsgInConsole');
      return options
    },
    deps: [ Config ]
  },
  Logger
];
