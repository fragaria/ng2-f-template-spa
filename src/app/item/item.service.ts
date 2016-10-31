import { Injectable } from '@angular/core';

import { HttpBaseService } from '../shared';
import { Item } from './item.model';

@Injectable()
export class ItemService {
  protected url = 'api/items';  // URL to web API
  //private itemsUrl = 'https://private-0f9a88-itemsapi2.apiary-mock.com/items';
  protected model = Item;

  constructor (protected http: HttpBaseService<Item>) { }

  getItems (): Promise<Item[]> {
    return this.http.getObjects(this.url, this.model)
  }

  getItem (id: number | string): Promise<Item> {
    const url = `${this.url}/${id}`;
    return this.http.getObject(url, this.model)
  }

}
