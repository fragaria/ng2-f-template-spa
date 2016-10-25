import { Component, ViewChild, AfterViewInit } from '@angular/core';

// todo: change to ng2-bootstrap
import { ModalDirective } from 'ng2-bootstrap/components/modal';

@Component({
    selector: 'modal-demo',
    template: require('./modal-demo.component.html'),
})
export class ModalDemoComponent implements AfterViewInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    @ViewChild('smModal') public smModal: ModalDirective;


    ngAfterViewInit() {

        this.childModal.onShow.subscribe(modal =>
            console.log('onShow', modal));
        this.childModal.onShown.subscribe(modal =>
            console.log('onShown', modal));
        this.childModal.onHide.subscribe(modal =>
            console.log('onHide', modal));
        this.childModal.onHidden.subscribe(modal =>
            console.log('onHidden', modal));
       
    }

    public showChildModal(): void {
        // window.location.href = "/test";
        this.childModal.show();
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }
}

