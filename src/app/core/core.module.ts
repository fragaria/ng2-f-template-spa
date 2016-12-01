import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpBaseService, HttpRestJsonService } from './http';

import { SharedModule } from '../shared';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [ HomeComponent, PageNotFoundComponent ],
  exports: [ HomeComponent, PageNotFoundComponent ],
  providers: [ HttpBaseService, HttpRestJsonService ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
