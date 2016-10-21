import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sa-page-not-found',
  template: require('./page-not-found.component.html')
})
export class PageNotFoundComponent {

  constructor(private router: Router) { }

  gotoHP(): void {
    this.router.navigate(['/']);
  }

}
