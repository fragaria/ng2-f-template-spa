import { NgModule } from '@angular/core';

import { Config } from '../config';

import { ItemService } from './item.service';
import { ItemDetailComponent } from './item-detail.component';
import { ItemListComponent } from './item-list.component';
import { itemsRouting } from './item.routing';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    itemsRouting
  ],
  declarations: [
    ItemDetailComponent,
    ItemListComponent
  ],
  providers: [ItemService]
})
export class ItemModule {
  constructor(private config: Config) {
    console.log("From Item module constructor", config.getVal('itemsApiUrl'));
  }
}
