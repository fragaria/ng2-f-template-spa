import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LanguageModule } from '../language';

import { TitleComponent } from './title.component';
import { LoadingPlaceholderComponent } from "./loading-placeholder";

@NgModule({
  imports: [
    CommonModule,
    LanguageModule,
  ],
  declarations: [ TitleComponent, LoadingPlaceholderComponent ],
  exports: [ CommonModule, FormsModule, LanguageModule, TitleComponent, LoadingPlaceholderComponent ],
})
export class SharedModule { }
