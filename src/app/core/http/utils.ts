import { Response } from '@angular/http';

import { Logger } from '../../logging';

import { HttpError } from './errors';

import { Observable } from 'rxjs/Observable';

 export function baseHandleError (error: Response | any, logger: Logger): Observable<Response> {
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
   logger.error(errMsg, { 'status': error.status, 'stack': error.stack});
   return Observable.throw(errorObj);
 }

export function extractJsonData(res: Response): any {
  let body = res.json();
  return body && body.data || {};
}

export function extractJsonDataToObj<T>(res: Response, model: any): T | null {
  let obj = extractJsonData(res) as T || null;
  if (obj) obj = toParticularType<T>(obj, model);
  return obj
}

export function extractJsonDataToObjects<T>(res: Response, model: any): T[] {
  let objects = extractJsonData(res) as T[] || <T[]>[];
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
