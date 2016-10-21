import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import CustomMatcherFactory = jasmine.CustomMatcherFactory;

import { AppModule } from '../app.module';
import { routes } from '../app.routing';
import { PageNotFoundComponent } from './.';

describe('PageNotFoundComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    });
  });

  it('is shown for unknown URL', () => {
    this.fixture = TestBed.createComponent(PageNotFoundComponent);
    this.fixture.whenStable()
        .then(() => {
          let titleElement = this.fixture.nativeElement.querySelector("h1");
          expect((<any>titleElement).innerHTML).toContain('Page not found!');
        });
  });

  it('has link to homepage', () => {
    this.fixture = TestBed.createComponent(PageNotFoundComponent);
    this.fixture.whenStable()
        .then(() => {
          let titleElement = this.fixture.nativeElement.querySelector("a.btn");
          expect((<any>titleElement).innerHTML).toContain('Go to HP');
        });
  });
});
