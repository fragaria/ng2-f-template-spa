import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';

import { MockApiModule } from 'ng2-f-mock-api';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ItemModule } from './item';
import { consoleCatcher, Logger, LOGGING_ERROR_HANDLER_PROVIDERS } from './logging'
import { SharedModule } from './shared';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    SharedModule,
    ItemModule,
    HttpModule,
    MockApiModule
  ],
  declarations: [AppComponent],
  exports: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    Logger,
    LOGGING_ERROR_HANDLER_PROVIDERS
  ]
})
export class AppModule {

  constructor(private logger: Logger) {
    consoleCatcher(logger);
  }
}
