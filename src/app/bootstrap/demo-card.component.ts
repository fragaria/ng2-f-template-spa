import { Component, Input } from '@angular/core';

@Component({
    selector: 'demo-card',
    template: `
           <div class="card">
            <div class="card-header btn btn-block" (click)="isVisible=!isVisible">
                <h4 class="card-title">{{title}}</h4>
            </div>
            <div *ngIf="isVisible" class="card-block">
                <ng-content></ng-content>
           </div>
         </div>
    `
})
export class DemoCardComponent {
    @Input() title:string;
    isVisible:boolean=false;
}
