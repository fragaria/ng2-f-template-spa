import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from './bootstrap.component';
import { DeepLinkModalDemoComponent } from './deeplink-modal-demo.component';

const routes: Routes = [
    {
        path: 'bootstrap',
        component: BootstrapComponent,
        children: [
            {
                path: '',
            },
            {
                path: ':id',
                component: DeepLinkModalDemoComponent,
            }

        ]
    },

];

export const bootstrapRouting: ModuleWithProviders = RouterModule.forChild(routes);
