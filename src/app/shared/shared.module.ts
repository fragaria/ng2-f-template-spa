import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component.ts';
import { PageNotFoundComponent } from './page-not-found.component.ts';

@NgModule({
  imports: [CommonModule],
  declarations: [HomeComponent, PageNotFoundComponent],
  exports: [HomeComponent, PageNotFoundComponent,
    CommonModule, FormsModule]
})
export class SharedModule { }
