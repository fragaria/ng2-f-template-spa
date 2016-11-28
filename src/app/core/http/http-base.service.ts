import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Request,
  Response,
  RequestOptionsArgs,
  URLSearchParams } from '@angular/http';

import { Logger } from '../../logging';

import { HttpError } from './errors';
import { baseHandleError } from './utils';

import { Observable } from 'rxjs/Observable';

type errorCallbackType = (error: Response | any) => Observable<Response>;

@Injectable()
export class HttpBaseService {
  constructor(public http: Http, protected logger: Logger) {
    this.logger = logger;
  }

  request(url: string|Request, options?: RequestOptionsArgs, errorCallback?: errorCallbackType): Observable<Response> {
    return this.http.request(url, options).catch(error => errorCallback ? errorCallback(error) : this.handleError(error));
  }

  protected handleError (error: Response | any): Observable<Response> {
    return baseHandleError(error, this.logger);
  }

  /**
   * Performs a request with `get` http method.
   */
  get(url: string, options?: RequestOptionsArgs, errorCallback?: errorCallbackType): Observable<Response> {
    return this.request(url, options, errorCallback);
  }

  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any, options?: RequestOptionsArgs, errorCallback?: errorCallbackType): Observable<Response> {
    return this.request(url, options, errorCallback);
  }

  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any, options?: RequestOptionsArgs, errorCallback?: errorCallbackType): Observable<Response> {
    return this.request(url, options, errorCallback);
  }

  /**
   * Performs a request with `delete` http method.
   */
  delete (url: string, options?: RequestOptionsArgs, errorCallback?: errorCallbackType): Observable<Response> {
    return this.request(url, options, errorCallback);
  }

  /**
   * Performs a request with `patch` http method.
   */
  patch(url: string, body: any, options?: RequestOptionsArgs, errorCallback?: errorCallbackType): Observable<Response> {
    return this.request(url, options, errorCallback);
  }

  /**
   * Performs a request with `head` http method.
   */
  head(url: string, options?: RequestOptionsArgs, errorCallback?: errorCallbackType): Observable<Response> {
    return this.request(url, options, errorCallback);
  }

  /**
   * Performs a request with `options` http method.
   */
  options(url: string, options?: RequestOptionsArgs, errorCallback?: errorCallbackType): Observable<Response> {
    return this.request(url, options, errorCallback);
  }
}
