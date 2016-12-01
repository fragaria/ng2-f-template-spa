import { Component, Input } from '@angular/core';

@Component({
  selector: 'sa-title',
  template: `
    <h1 *ngIf="titleIsTransKey">{{ title | translate }}</h1>
    <h1 *ngIf="!titleIsTransKey">{{ title }}</h1>
  `
})
export class TitleComponent {
  @Input() title: string;
  @Input() titleIsTransKey: boolean = false;
}
