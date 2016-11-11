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
      console.log("From LOG PROVIDER", config.getVal('loggingLevel'));
      return {
        allowConsoleCatch: config.getVal('loggingAllowConsoleCatch') === undefined ? true : config.getVal('loggingAllowConsoleCatch'),
        level: config.getVal('loggingLevel') === undefined ? Level.LOG : config.getVal('loggingLevel')
      };
    },
    deps: [ Config ]
  },
  Logger
];
