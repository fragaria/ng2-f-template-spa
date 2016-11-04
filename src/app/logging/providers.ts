import { ErrorHandler } from '@angular/core';

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
