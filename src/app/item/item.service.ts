import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { HttpBaseService } from '../shared';
import { Item } from './item.model';

@Injectable()
export class ItemService extends HttpBaseService<Item> {
  protected url = 'api/items';  // URL to web API
  //private itemsUrl = 'https://private-0f9a88-itemsapi2.apiary-mock.com/items';

  constructor (protected http: Http) { super(http); }

  getItems (): Promise<Item[]> {
    return this.getObjects()
  }

  getItem (id: number | string): Promise<Item> {
    return this.getObject(id)
  }

}
