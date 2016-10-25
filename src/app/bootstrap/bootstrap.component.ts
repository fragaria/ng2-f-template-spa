import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'bootstrap-demo',
    template: require('./bootstrap.component.html')
})
export class BootstrapComponent {
    // alertCollapse:boolean=false;
    constructor(private router: Router) {
        console.log( window['__theme']);

    }

}
