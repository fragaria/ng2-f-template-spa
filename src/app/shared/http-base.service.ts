import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { HttpError } from './errors';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpBaseService<T> {
  protected headers = new Headers({'Accept': 'application/json'});
  protected params = new URLSearchParams();
  protected model = null;

  constructor (protected http: Http) { }

  addObject (
    obj: T,
    url: string,
    model?: any,
    successCallback?: (res: Response) => T,
    errorCallback?: (error: Response | any) => Observable<T>,
    headers?: Headers,
    params?: URLSearchParams): Observable<T> {

    this.model = model || null;
    const targetErrorCallback = errorCallback || this.handleError;
    const targetHeaders = headers || this.headers;
    const targetParams = params || this.params;

    return this.http.post(url, JSON.stringify(obj), {headers: targetHeaders, search: targetParams})
                    .map(response => successCallback ? successCallback(response) : this.extractDataToObj(response))
                    .catch(targetErrorCallback);
  }

  getObjects (
    url: string,
    model?: any,
    successCallback?: (res: Response) => T[],
    errorCallback?: (error: Response | any) => Observable<HttpError>,
    headers?: Headers,
    params?: URLSearchParams): Observable<T[]> {

    this.model = model || null;
    const targetErrorCallback = errorCallback || this.handleError;
    const targetHeaders = headers || this.headers;
    const targetParams = params || this.params;

    return this.http.get(url, {headers: targetHeaders, search: targetParams})
                    .map(response => successCallback ? successCallback(response) : this.extractDataToObjects(response))
                    .catch(targetErrorCallback);
  }

  getObject (
    url: string,
    model?: any,
    successCallback?: (res: Response) => T,
    errorCallback?: (error: Response | any) => Observable<HttpError>,
    headers?: Headers,
    params?: URLSearchParams): Observable<T> {

    this.model = model || null;
    const targetErrorCallback = errorCallback || this.handleError;
    const targetHeaders = headers || this.headers;
    const targetParams = params || this.params;

    return this.http.get(url, {headers: targetHeaders, search: targetParams})
                    .map(response => successCallback ? successCallback(response) : this.extractDataToObj(response))
                    .catch(targetErrorCallback);
  }

  updateObject (
    obj: T,
    url: string,
    model?: any,
    successCallback?: (res: Response) => T,
    errorCallback?: (error: Response | any) => Observable<HttpError>,
    headers?: Headers,
    params?: URLSearchParams): Observable<T> {

    this.model = model || null;
    const targetErrorCallback = errorCallback || this.handleError;
    const targetHeaders = headers || this.headers;
    const targetParams = params || this.params;

    return this.http.put(url, JSON.stringify(obj), {headers: targetHeaders, search: targetParams})
                    .map(response => successCallback ? successCallback(response) : this.extractDataToObj(response))
                    .catch(targetErrorCallback);
  }

  protected extractData(res: Response): any {
    let body = res.json();
    return body.data;
  }

  protected extractDataToObj(res: Response): T | null {
    let obj = this.extractData(res) as T || null;
    if (obj) obj = this.toParticularType(obj);
    return obj
  }

  protected extractDataToObjects(res: Response): T[] {
    let objects = this.extractData(res) as T[] || <T[]>[];
    if (objects.length != 0) objects = objects.map((obj) => this.toParticularType(obj));
    return objects
  }

  protected toParticularType(obj: any): T {
    // if model is specified and has constructFromObj method call it
    if (this.model && typeof this.model.constructFromObj !== 'undefined') {
      return this.model.constructFromObj(obj)
    }
    return obj
  }

  protected handleError (error: Response | any): Observable<any> {
    // TODO: use real logging logic
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
    console.error(errMsg);
    return Observable.throw(errorObj);
  }
}
