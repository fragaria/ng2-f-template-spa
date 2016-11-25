import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  Headers,
  Http,
  Request,
  Response,
  RequestOptions,
  RequestOptionsArgs,
  URLSearchParams } from '@angular/http';

import { Logger } from '../../logging';

import { HttpError } from './errors';
import { baseHandleError } from './utils';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttpBaseService extends Http {
  constructor(protected _backend: ConnectionBackend, protected _defaultOptions: RequestOptions, protected logger: Logger) {
    super(_backend, _defaultOptions);
    this.logger = logger;
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch(error => this.handleError(error));
  }

  protected handleError (error: Response | any): Observable<Response> {
    return baseHandleError(error, this.logger);
  }
}
