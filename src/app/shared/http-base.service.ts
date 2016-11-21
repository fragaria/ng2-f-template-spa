import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Logger } from '../logging';

import { HttpError } from './errors';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpBaseService<T> {
  protected headers = new Headers({'Accept': 'application/json'});
  protected params = new URLSearchParams();
  protected model = null;

  constructor (protected http: Http, protected logger: Logger) { }

  addObject (
    obj: T,
    url: string,
    model?: any,
    successCallback?: (res: Response) => T,
    errorCallback?: (error: Response | any) => Observable<HttpError>,
    headers?: Headers,
    params?: URLSearchParams): Observable<T | HttpError> {

    return this.http.post(url, JSON.stringify(obj), this.getRequestOptions(headers, params))
                    .map(response => successCallback ? successCallback(response) : extractDataToObj<T>(response, model))
                    .catch(error => errorCallback ? errorCallback(error) : this.handleError(error));
  }

  getObjects (
    url: string,
    model?: any,
    successCallback?: (res: Response) => T[],
    errorCallback?: (error: Response | any) => Observable<HttpError>,
    headers?: Headers,
    params?: URLSearchParams): Observable<T[] | HttpError> {

    return this.http.get(url, this.getRequestOptions(headers, params))
                    .map(response => successCallback ? successCallback(response) : extractDataToObjects<T>(response, model))
                    .catch(error => errorCallback ? errorCallback(error) : this.handleError(error));
  }

  getObject (
    url: string,
    model?: any,
    successCallback?: (res: Response) => T,
    errorCallback?: (error: Response | any) => Observable<HttpError>,
    headers?: Headers,
    params?: URLSearchParams): Observable<T | HttpError> {

    return this.http.get(url, this.getRequestOptions(headers, params))
                    .map(response => successCallback ? successCallback(response) : extractDataToObj<T>(response, model))
                    .catch(error => errorCallback ? errorCallback(error) : this.handleError(error));
  }

  updateObject (
    obj: T,
    url: string,
    model?: any,
    successCallback?: (res: Response) => T,
    errorCallback?: (error: Response | any) => Observable<HttpError>,
    headers?: Headers,
    params?: URLSearchParams): Observable<T | HttpError> {

    return this.http.put(url, JSON.stringify(obj), this.getRequestOptions(headers, params))
                    .map(response => successCallback ? successCallback(response) : extractDataToObj<T>(response, model))
                    .catch(error => errorCallback ? errorCallback(error) : this.handleError(error));
  }

  protected getRequestOptions(headers?: Headers, params?: URLSearchParams): any {
    const targetHeaders = headers || this.headers;
    const targetParams = params || this.params;
    return { headers: targetHeaders, search: targetParams }
  }

  protected handleError (error: Response | any): Observable<HttpError> {
    let errMsg: string;
    let errorObj: HttpError;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      errorObj = { status: error.status as number, msg: errMsg };
    } else {
      errMsg = error.message ? error.message : error.toString();
      errorObj = { status: 500 as number, msg: errMsg };
    }
    this.logger.error(errMsg, { 'status': error.status, 'stack': error.stack});
    return Observable.throw(errorObj);
  }
}

/*
 * Help functions are out of HttpBaseService for simple usage in customization
 */

export function extractData(res: Response): any {
  let body = res.json();
  return body.data;
}

export function extractDataToObj<T>(res: Response, model: any): T | null {
  let obj = extractData(res) as T || null;
  if (obj) obj = toParticularType<T>(obj, model);
  return obj
}

export function extractDataToObjects<T>(res: Response, model: any): T[] {
  let objects = extractData(res) as T[] || <T[]>[];
  if (objects.length != 0) objects = objects.map((obj) => toParticularType<T>(obj, model));
  return objects
}

export function toParticularType<T>(obj: any, model: any): T {
  // if model is specified and has constructFromObj method call it
  if (model && typeof model.constructFromObj !== 'undefined') {
    return model.constructFromObj(obj)
  }
  return obj
}
