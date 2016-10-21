import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list.component';
import { ItemDetailComponent } from './item-detail.component';

const routes: Routes = [
  {path: 'items', component: ItemListComponent},
  {path: 'items/:id', component: ItemDetailComponent}
];

export const itemsRouting: ModuleWithProviders = RouterModule.forChild(routes);
