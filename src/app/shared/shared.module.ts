import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LanguageModule } from "../language";

@NgModule({
  imports: [
    CommonModule,
    LanguageModule,
  ],
  declarations: [HomeComponent, PageNotFoundComponent],
  exports: [HomeComponent, PageNotFoundComponent,
    CommonModule, FormsModule]
})
export class SharedModule { }
