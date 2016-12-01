import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, PageNotFoundComponent } from './core';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
