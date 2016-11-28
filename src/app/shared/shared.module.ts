import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LanguageModule } from "../language";

@NgModule({
  imports: [
    CommonModule,
    LanguageModule,
  ],
  // declarations: [],
  exports: [ CommonModule, FormsModule, LanguageModule ]
})
export class SharedModule { }
