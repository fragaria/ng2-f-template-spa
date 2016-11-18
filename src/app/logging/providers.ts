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
      if (config.getVal('loggingAllowConsoleCatch') !== undefined) options['allowConsoleCatch'] = config.getVal('loggingAllowConsoleCatch');
      if (config.getVal('loggingLevel') !== undefined) options['level'] = config.getVal('loggingLevel');
      if (config.getVal('loggingOnlyMsgInConsole') !== undefined) options['onlyMsgInConsole'] = config.getVal('loggingOnlyMsgInConsole');
      return options
    },
    deps: [ Config ]
  },
  Logger
];
