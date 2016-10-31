import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { HttpBaseService } from './http-base.service';

@NgModule({
  imports: [CommonModule],
  declarations: [HomeComponent, PageNotFoundComponent],
  exports: [HomeComponent, PageNotFoundComponent,
    CommonModule, FormsModule],
  providers: [HttpBaseService]
})
export class SharedModule { }
