import { Injectable } from '@angular/core';

import { HttpBaseService } from '../shared';
import { Config } from '../config';
import { Item } from './item.model';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {
  protected url: string;
  protected model = Item;

  constructor (private config: Config, protected http: HttpBaseService<Item>) {
    // get url from config service
    this.url = config.getVal('itemsApiUrl');
  }

  getItems (): Observable<Item[]> {
    return this.http.getObjects(this.url, {'model': this.model})
  }

  getItem (id: number | string): Observable<Item> {
    const url = `${this.url}/${id}`;
    return this.http.getObject(url, {'model': this.model})
  }

}
