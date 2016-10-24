import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HomeComponent, PageNotFoundComponent],
  exports: [HomeComponent, PageNotFoundComponent,
    CommonModule, FormsModule]
})
export class SharedModule { }
