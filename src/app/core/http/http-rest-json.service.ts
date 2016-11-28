import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Response,
  URLSearchParams } from '@angular/http';

import { Logger } from '../../logging';

import { HttpError } from './errors';
import { HttpBaseService } from './http-base.service';
import {
  extractJsonDataToObj,
  extractJsonDataToObjects } from './utils';

import { Observable } from 'rxjs/Observable';

export interface BaseExtraOptions<T> {
  model?: any,
  errorCallback?: (error: Response | any) => Observable<Response>,
  headers?: Headers,
  params?: URLSearchParams
}
/**
 * extra options type for method that work with single object
 */
export interface ObjectExtraOptions<T> extends BaseExtraOptions<T> {
  successCallback?: (res: Response) => T
}

/**
 * extra options type for method that work with multiple objects
 */
export interface ObjectsExtraOptions<T> extends BaseExtraOptions<T> {
  successCallback?: (res: Response) => T[]
}

@Injectable()
export class HttpRestJsonService<T> {
  protected headers = new Headers({'Accept': 'application/json'});
  protected params = new URLSearchParams();
  protected model = null;

  constructor (public http: HttpBaseService, protected logger: Logger) { }

  addObject (
    url: string,
    obj: T,
    options?: ObjectExtraOptions<T>): Observable<T | Response> {

    options = options || {};

    return this.http.post(url, JSON.stringify(obj), this.getRequestOptions(options.headers, options.params), options.errorCallback)
                    .map(response => options.successCallback ? options.successCallback(response) : extractJsonDataToObj<T>(response, options.model));
  }

  getObjects (
    url: string,
    options?: ObjectsExtraOptions<T>): Observable<T[] | Response> {

    options = options || {};

    return this.http.get(url, this.getRequestOptions(options.headers, options.params), options.errorCallback)
                    .map(response => options.successCallback ? options.successCallback(response) : extractJsonDataToObjects<T>(response, options.model));
  }

  getObject (
    url: string,
    options?: ObjectExtraOptions<T>): Observable<T | Response> {

    options = options || {};

    return this.http.get(url, this.getRequestOptions(options.headers, options.params), options.errorCallback)
                    .map(response => options.successCallback ? options.successCallback(response) : extractJsonDataToObj<T>(response, options.model));
  }

  updateObject (
    url: string,
    obj: T,
    options?: ObjectExtraOptions<T>): Observable<T | Response> {

    options = options || {};

    return this.http.put(url, JSON.stringify(obj), this.getRequestOptions(options.headers, options.params), options.errorCallback)
                    .map(response => options.successCallback ? options.successCallback(response) : extractJsonDataToObj<T>(response, options.model));
  }

  deleteObject (
    url: string,
    options?: ObjectExtraOptions<T>): Observable<T | Response> {

    options = options || {};

    return this.http.delete(url, this.getRequestOptions(options.headers, options.params), options.errorCallback)
                    .map(response => options.successCallback ? options.successCallback(response) : extractJsonDataToObj<T>(response, options.model));
  }

  protected getRequestOptions(headers?: Headers, params?: URLSearchParams): any {
    const targetHeaders = headers || this.headers;
    const targetParams = params || this.params;
    return { headers: targetHeaders, search: targetParams }
  }

}
