import { Component, ViewContainerRef } from '@angular/core';

import { LanguageModule, LanguageService, createTranslateProviders } from './language';
import { TranslateService } from 'ng2-translate';

//TODO:removeble hack ng2-bootstrap 1.1.16 x @angular 2.2.0 https://github.com/valor-software/ng2-bootstrap/issues/986
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';
ComponentsHelper.prototype.getRootViewContainerRef = function () {
    // https://github.com/angular/angular/issues/9293
    if (this.root) {
        return this.root;
    }
    var comps = this.applicationRef.components;
    if (!comps.length) {
        throw new Error("ApplicationRef instance not found");
    }
    try {
        /* one more ugly hack, read issue above for details */
        var rootComponent = this.applicationRef._rootComponents[0];
        //this.root = rootComponent._hostElement.vcRef;
        this.root = rootComponent._component.viewContainerRef;
        return this.root;
    }
    catch (e) {
        throw new Error("ApplicationRef instance not found");
    }
};
//
@Component({
  selector: 'seed-app',
  template: `
    <div class="container">
      <nav class="navbar navbar-dark bg-primary">
        <a routerLink="" routerLinkActive="active" class="navbar-brand">HP</a>
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <a routerLink="items" routerLinkActive="active" class="nav-link">{{ 'items' | translate }}</a>
          </li>
          <li class="nav-item">
            <lang-toggle></lang-toggle>
          </li>
          <li class="nav-item">
            <a routerLink="bootstrap" routerLinkActive="active" class="nav-link">Bootstrap</a>
          </li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
    providers:[ createTranslateProviders('app')]
})
export class AppComponent {

    constructor(private viewContainerRef: ViewContainerRef,
                languageService: LanguageService,
                translateService: TranslateService) {
        languageService.langChanged$.subscribe(lang => {
                // translateService.resetLang(lang); uncomment if you want to call API everytime
                translateService.use(lang);
            }
        )
    }
}
