import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from './bootstrap.component';

const routes: Routes = [
  {path: 'bootstrap', component: BootstrapComponent},
];

export const bootstrapRouting: ModuleWithProviders = RouterModule.forChild(routes);
