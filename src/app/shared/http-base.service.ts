import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { HttpError } from './errors';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpBaseService<T> {
  protected headers = new Headers({'Accept': 'application/json'});
  protected url = null; // override this in subclass
  protected model = null; // override this in subclass

  constructor (protected http: Http) { }

  addObject (obj: T, url?: string): Promise<T> {
    const targetUrl = url || this.url;

    return this.http.post(targetUrl, JSON.stringify(obj), {headers: this.headers})
                    .toPromise()
                    .then(response => this.extractDataToObj(response))
                    .catch(this.handleError);
  }

  getObjects (url?: string, params?: URLSearchParams): Promise<T[]> {
    const targetUrl = url || this.url;
    const targetParams = params || new URLSearchParams();

    return this.http.get(targetUrl, {headers: this.headers, search: targetParams})
                    .toPromise()
                    .then(response => this.extractDataToObjects(response))
                    .catch(this.handleError);
  }

  getObject (id: number | string, url?: string): Promise<T> {
    const targetUrl = url || `${this.url}/${id}`;

    return this.http.get(targetUrl, {headers: this.headers})
                    .toPromise()
                    .then(response => this.extractDataToObj(response))
                    .catch(this.handleError);
  }

  updateObject (obj: T, url?: string): Promise<T> {
    const targetUrl = url || this.url;

    return this.http.put(targetUrl, JSON.stringify(obj), {headers: this.headers})
                    .toPromise()
                    .then(response => this.extractDataToObj(response))
                    .catch(this.handleError);
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

  protected handleError (error: Response | any) {
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
    return Promise.reject(errorObj);
  }
}
