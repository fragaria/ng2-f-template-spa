import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';

import { MockApiModule } from 'ng2-f-mock-api';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { Config } from './config';
import { ItemModule } from './item';
import { LanguageModule } from './language';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import {
  Logger,
  LOGGER_PROVIDERS,
  LOGGING_ERROR_HANDLER_PROVIDERS } from './logging';

import { HttpHelpersModule } from 'http-helpers-ng2';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    CoreModule,
    SharedModule,
    ItemModule,
    HttpModule,
    LanguageModule,
    HttpHelpersModule,
    MockApiModule.forRoot()
  ],
  declarations: [AppComponent],
  exports: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    Config,
    LOGGER_PROVIDERS,
    LOGGING_ERROR_HANDLER_PROVIDERS
  ]
})
export class AppModule {
  constructor(private logger: Logger) {
  }
}
