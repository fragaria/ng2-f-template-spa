import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Item } from './item.model';

@Injectable()
export class ItemService {
  private headers = new Headers({'Accept': 'application/json'});
  private itemsUrl = 'api/items';  // URL to web API
  //private itemsUrl = 'https://private-0f9a88-itemsapi2.apiary-mock.com/items';

  constructor (private http: Http) {}

  getItems (): Promise<Item[]> {
    return this.http.get(this.itemsUrl, {headers: this.headers})
                    .toPromise()
                    .then(response => this.extractDataToItems(response))
                    .catch(this.handleError);
  }

  getItem (id: number | string): Promise<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
                    .toPromise()
                    .then(response => this.extractDataToItem(response))
                    .catch(this.handleError);
  }

  private extractData(res: Response): any {
    let body = res.json();
    return body.data;
  }

  private extractDataToItem(res: Response): Item | null {
    return this.extractData(res) as Item || null;
  }

  private extractDataToItems(res: Response): Item[] {
    return this.extractData(res) as Item[] || <Item[]>[];
  }

  private handleError (error: Response | any) {
    // TODO: use real logging logic
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
