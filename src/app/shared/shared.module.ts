import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LanguageModule } from '../language';

import { TitleComponent } from './title.component';

@NgModule({
  imports: [
    CommonModule,
    LanguageModule,
  ],
  declarations: [ TitleComponent ],
  exports: [ CommonModule, FormsModule, LanguageModule, TitleComponent ]
})
export class SharedModule { }
