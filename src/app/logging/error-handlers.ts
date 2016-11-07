import { ErrorHandler, Inject, Injectable } from '@angular/core';

import { Logger } from './logger';

export interface LoggingErrorHandlerOptions {
    rethrowError: boolean;
}

export var LOGGING_ERROR_HANDLER_OPTIONS: LoggingErrorHandlerOptions = {
    rethrowError: true
};

/**
 * Used a hook for centralized exception handling in style
 * according to recommendations from angular2
 * https://github.com/angular/angular/blob/2.1.x/modules/@angular/core/src/error_handler.ts.
 */
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
    let errorData: any = {};
    let msg: any;

    msg = `EXCEPTION: ${this._extractMessage(error)}`;
    errorData['exception'] = msg;

    if (!this.logger.isEnabled()) {
      this._console.error(msg);
    }

    if (originalError) {
      msg = `ORIGINAL EXCEPTION: ${this._extractMessage(originalError)}`;
      errorData['originalException'] = msg;

      if (!this.logger.isEnabled()) {
        this._console.error(msg);
      }

    }

    if (originalStack) {

      errorData['originalStacktrace'] = originalStack;

      // Log to console for easier debugging
      if (this.logger.isLogEnabled() || !this.logger.isEnabled()) {
        this._console.error('ORIGINAL STACKTRACE:');
        this._console.error(originalStack);
      }
    }

    if (context) {
      errorData['errorContext'] = context;
      if (!this.logger.isEnabled()) {
        this._console.error('ERROR CONTEXT:');
        this._console.error(context);
      }
    }

    this.logger.error(errorData);

    // We rethrow exceptions, so operations like 'bootstrap' will result in an error
    // when an error happens. If we do not rethrow, bootstrap will always succeed.
    if (this.options.rethrowError) throw error;
  }

  /**
   * copied from
   * https://github.com/angular/angular/blob/2.1.x/modules/@angular/core/src/error_handler.ts.
   */
  _extractMessage(error: any): string {
    return error instanceof Error ? error.message : error.toString();
  }

  /**
   * copied from (without WrappedError usage)
   * https://github.com/angular/angular/blob/2.1.x/modules/@angular/core/src/error_handler.ts.
   */
  _findContext(error: any): any {
    if (error) {
      return error.context ? error.context :
                             this._findContext(error.originalError);
    }

    return null;
  }

  /**
   * copied from (without WrappedError usage)
   * https://github.com/angular/angular/blob/2.1.x/modules/@angular/core/src/error_handler.ts.
   */
  _findOriginalError(error: any): any {
    let e = error.originalError;
    while (e && e.originalError) {
      e = e.originalError;
    }

    return e;
  }

  /**
   * copied from (without WrappedError usage)
   * https://github.com/angular/angular/blob/2.1.x/modules/@angular/core/src/error_handler.ts.
   */
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
