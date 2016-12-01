import { NgModule, Inject } from '@angular/core';

import { ItemService } from './item.service';
import { ItemDetailComponent } from './item-detail.component';
import { ItemListComponent } from './item-list.component';
import { itemsRouting } from './item.routing';
import { SharedModule } from '../shared';
import { LanguageModule } from '../language';

@NgModule({
  imports: [
    SharedModule,
    itemsRouting,
    LanguageModule,
],
  declarations: [
    ItemDetailComponent,
    ItemListComponent
  ],
  providers: [ItemService]
})
export class ItemModule { }
