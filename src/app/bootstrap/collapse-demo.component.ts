import { Component } from '@angular/core';

@Component({
    selector: 'collapse-demo',
    template: `
<button type="button" class="btn btn-primary"
        (click)="isCollapsed = !isCollapsed">Toggle collapse
</button>
<hr>
<div (collapsed)="collapsed($event)"
     (expanded)="expanded($event)"
     [collapse]="isCollapsed"
     class="card card-block card-header">
  <div class="well well-lg">Some content</div>
</div>
`
})
export class CollapseDemoComponent {
    public isCollapsed:boolean = false;

    public collapsed(event:any):void {
        console.log(event);
    }

    public expanded(event:any):void {
        console.log(event);
    }
}