import { Component } from '@angular/core';

@Component({
    selector: 'pagination-demo',
    template: `
<div class="row">
  <div class="col-lg-6" style="margin-top: 10px;">
    <h4>Pagination</h4>
    <pagination [totalItems]="totalItems" [(ngModel)]="currentPage" (pageChanged)="pageChanged($event)"></pagination>
    <pagination [boundaryLinks]="true" [totalItems]="totalItems" [(ngModel)]="currentPage" class="pagination-sm"
                previousText="&lsaquo;" nextText="&rsaquo;" firstText="&laquo;" lastText="&raquo;"></pagination>
    <pagination [directionLinks]="false" [boundaryLinks]="true" [totalItems]="totalItems"
                [(ngModel)]="currentPage"></pagination>
    <pagination [directionLinks]="false" [totalItems]="totalItems" [(ngModel)]="currentPage"
                (numPages)="smallnumPages = $event"></pagination>
    <pre class="card card-block card-header">The selected page no: {{currentPage}}/{{smallnumPages}}</pre>
    <button type="button" class="btn btn-info" (click)="setPage(3)">Set current page to: 3</button>
  </div>
  <hr class="visible-md visible-xs hidden-lg-up">
  <div class="col-lg-6" style="margin-top: 10px;">
    
    <pager [totalItems]="totalItems" [(ngModel)]="currentPage" (pageChanged)="pageChanged($event)"></pager>
 
    <hr/>
    <h4>Limit the maximum visible buttons</h4>
    <pagination [totalItems]="bigTotalItems" [(ngModel)]="bigCurrentPage" [maxSize]="maxSize" class="pagination-sm"
                [boundaryLinks]="true"></pagination>
    <pagination [totalItems]="bigTotalItems" [(ngModel)]="bigCurrentPage" [maxSize]="maxSize" class="pagination-sm"
                [boundaryLinks]="true" [rotate]="false" (numPages)="numPages = $event"></pagination>
    <pre class="card card-block card-header">Page: {{bigCurrentPage}} / {{numPages}}</pre>
  </div>
</div>
`
})
export class PaginationDemoComponent {
    public totalItems:number = 64;
    public currentPage:number = 4;

    public maxSize:number = 5;
    public bigTotalItems:number = 175;
    public bigCurrentPage:number = 1;

    public setPage(pageNo:number):void {
        this.currentPage = pageNo;
    };

    public pageChanged(event:any):void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    };
}