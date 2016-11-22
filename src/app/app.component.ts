import { Component, ViewContainerRef } from '@angular/core';

import './rxjs-operators';

@Component({
  selector: 'seed-app',
  template: `
    <div class="container">
      <nav class="navbar navbar-dark bg-primary">
        <a routerLink="" routerLinkActive="active" class="navbar-brand">HP</a>
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <a routerLink="items" routerLinkActive="active" class="nav-link">Items</a>
          </li>
          <li class="nav-item">
            <a routerLink="bootstrap" routerLinkActive="active" class="nav-link">Bootstrap</a>
          </li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {

    public constructor(private viewContainerRef: ViewContainerRef) {

    }

}
