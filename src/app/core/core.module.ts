import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpBaseService, HttpRestJsonService } from './http';

@NgModule({
  imports: [
    CommonModule,
  ],
  // declarations: [],
  // exports: [],
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
