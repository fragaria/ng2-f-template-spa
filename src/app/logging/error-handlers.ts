import { ErrorHandler, Inject, Injectable } from '@angular/core';

import { Logger } from './logger';

export interface LoggingErrorHandlerOptions {
    rethrowError: boolean;
}

export var LOGGING_ERROR_HANDLER_OPTIONS: LoggingErrorHandlerOptions = {
    rethrowError: true
};

@Injectable()
export class LoggingErrorHandler implements ErrorHandler {
  _console: Console = console;

  private logger: Logger;
  private options: LoggingErrorHandlerOptions;

  constructor(logger: Logger,
              @Inject( LOGGING_ERROR_HANDLER_OPTIONS ) options: LoggingErrorHandlerOptions) {

    this.logger = logger;
    this.options = options;
  }

  handleError(error: any): void {
    const originalError = this._findOriginalError(error);
    const originalStack = this._findOriginalStack(error);
    const context = this._findContext(error);

    this.logger.error("Error is handled by logger service too");
    this._console.error(`EXCEPTION: ${this._extractMessage(error)}`);

    if (originalError) {
      this._console.error(`ORIGINAL EXCEPTION: ${this._extractMessage(originalError)}`);
    }

    if (originalStack) {
      this._console.error('ORIGINAL STACKTRACE:');
      this._console.error(originalStack);
    }

    if (context) {
      this._console.error('ERROR CONTEXT:');
      this._console.error(context);
    }

    // We rethrow exceptions, so operations like 'bootstrap' will result in an error
    // when an error happens. If we do not rethrow, bootstrap will always succeed.
    if (this.options.rethrowError) throw error;
  }

  _extractMessage(error: any): string {
    return error instanceof Error ? error.message : error.toString();
  }

  _findContext(error: any): any {
    if (error) {
      return error.context ? error.context :
                             this._findContext(error.originalError);
    }

    return null;
  }

  _findOriginalError(error: any): any {
    let e = error.originalError;
    while (e && e.originalError) {
      e = e.originalError;
    }

    return e;
  }

  _findOriginalStack(error: any): string {
    if (!(error instanceof Error)) return null;

    let e: any = error;
    let stack: string = e.stack;
    while (e && e.originalError) {
      e = e.originalError;
      if (e && e.stack) {
        stack = e.stack;
      }
    }

    return stack;
  }
}
