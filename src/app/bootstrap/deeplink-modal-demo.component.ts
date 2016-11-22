import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


// todo: change to ng2-bootstrap
import { ModalDirective } from 'ng2-bootstrap/components/modal';

@Component({
    selector: 'deeplink-modal-demo',
    template: require('./deeplink-modal-demo.component.html'),
})
export class DeepLinkModalDemoComponent implements AfterViewInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    inputValue: number;
    // @ViewChild('smModal') public smModal: ModalDirective;

    constructor(private route: ActivatedRoute, private _location: Location) {
    }

    ngAfterViewInit() {
        // console.log('ngAfterViewInit',this.route.snapshot.parent.params['id'])
        this.inputValue = this.route.snapshot.params['id']

        // this.childModal.onShow.subscribe(modal =>
        //     console.log('onShow', modal));
        // this.childModal.onShown.subscribe(modal =>
        //     console.log('onShown', modal));
        this.childModal.onHide.subscribe(modal => {
            console.log('onHide', modal);
            this._location.back();
        });
        // this.childModal.onHidden.subscribe(modal =>
        //     console.log('onHidden', modal));
        this.showChildModal();
    }

    public showChildModal(): void {
        // window.location.href = "/test";
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }
}

