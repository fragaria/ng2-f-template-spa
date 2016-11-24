import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { HttpBaseService } from './http-base.service';
import { LanguageModule } from "../language";

@NgModule({
  imports: [
    CommonModule,
    LanguageModule,
  ],
  declarations: [HomeComponent, PageNotFoundComponent],
  exports: [HomeComponent, PageNotFoundComponent,
    CommonModule, FormsModule],
    providers: [HttpBaseService]
})
export class SharedModule { }
