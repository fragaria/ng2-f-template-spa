import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from 'ng2-bootstrap/components/alert';
import { ButtonsModule } from 'ng2-bootstrap/components/buttons';
import { CollapseModule } from 'ng2-bootstrap/components/collapse';
import { DatepickerModule } from 'ng2-bootstrap/components/datepicker';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { ModalModule as RouteModalModule } from "ng2-modal";
import { ModalModule } from 'ng2-bootstrap/components/modal';
import { PaginationModule } from 'ng2-bootstrap/components/pagination';
import { ProgressbarModule } from 'ng2-bootstrap/components/progressbar';
import { TabsModule } from 'ng2-bootstrap/components/tabs';
import { TypeaheadModule } from 'ng2-bootstrap/components/typeahead';

import { BootstrapComponent } from './bootstrap.component';
import { bootstrapRouting } from './bootstrap.routing';

import { AlertDemoComponent } from './alert-demo.component';
import { ButtonsDemoComponent } from './buttons-demo.component';
import { DemoCardComponent } from './demo-card.component';
import { CollapseDemoComponent } from './collapse-demo.component';
import { DatepickerDemoComponent } from './datepicker-demo.component';
import { ModalDemoComponent } from './modal-demo.component';
import { PaginationDemoComponent } from './pagination-demo.component';
import { TabsDemoComponent } from './tabs-demo.component';
import { ProgressbarDemoComponent } from './progressbar-demo.component';
import { TypeaheadDemoComponent } from './typeahead-demo.component';
import { DropdownDemoComponent } from './dropdown-demo.component';

@NgModule({
    imports: [
        AlertModule,
        bootstrapRouting,
        ButtonsModule,
        CollapseModule,
        CommonModule,
        DatepickerModule,
        DropdownModule,
        ModalModule,
        PaginationModule,
        ProgressbarModule,
        ReactiveFormsModule,
        RouteModalModule,
        TabsModule,
        TypeaheadModule,
    ],
    declarations: [
        AlertDemoComponent,
        BootstrapComponent,
        ButtonsDemoComponent,
        DemoCardComponent,
        CollapseDemoComponent,
        DatepickerDemoComponent,
        DropdownDemoComponent,
        ModalDemoComponent,
        PaginationDemoComponent,
        ProgressbarDemoComponent,
        TypeaheadDemoComponent,
        TabsDemoComponent
    ],
})
export class BootstrapModule {
}
