import { ErrorHandler } from '@angular/core';

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

export const OFF_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { allowConsoleCatch: false, level: Level.OFF } }, Logger ];
export const ERROR_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: Level.ERROR } }, Logger ];
export const WARN_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: Level.WARN } }, Logger ];
export const INFO_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: Level.INFO } }, Logger ];
export const DEBUG_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: Level.DEBUG } }, Logger ];
export const LOG_LOGGER_PROVIDERS: any[] = [ { provide: Options, useValue: { level: Level.LOG } }, Logger ];
