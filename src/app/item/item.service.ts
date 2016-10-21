import { Injectable } from '@angular/core';
import { Item } from './item.model';

const ITEMS: Item[] = [
  new Item(11, 'Boots'),
  new Item(12, 'Gloves'),
  new Item(13, 'Cap'),
  new Item(14, 'Jacket')
];

const FETCH_LATENCY = 500;

@Injectable()
export class ItemService {

  getItems() {
    return new Promise<Item[]>(resolve => {
      setTimeout(() => {
        resolve(ITEMS);
      }, FETCH_LATENCY);
    });
  }

  getItem(id: number | string) {
    return this.getItems().then(items => 
        items.find(item => item.id === +id)
    );
  }

}
