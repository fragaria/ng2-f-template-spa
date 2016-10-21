import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ItemModule } from './item';
import { SharedModule } from './shared';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    SharedModule,
    ItemModule
  ],
  declarations: [AppComponent],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
