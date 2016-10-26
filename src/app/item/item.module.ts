import { NgModule } from '@angular/core';
import { HttpModule }  from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ItemData }             from './item-data';

import { ItemService } from './item.service';
import { ItemDetailComponent } from './item-detail.component';
import { ItemListComponent } from './item-list.component';
import { itemsRouting } from './item.routing';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    itemsRouting,
    HttpModule,
    InMemoryWebApiModule.forRoot(ItemData, { delay: 500 })
  ],
  declarations: [
    ItemDetailComponent,
    ItemListComponent
  ],
  providers: [ItemService]
})
export class ItemModule { }
