import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpBaseService } from '../../core';
import { Subscription } from 'rxjs/Subscription';
/*
* using:
* control under HttpBaseService Request method
* <loading-placeholder><div> ...</div></loading-placeholder>
*
* control under component
* <loading-placeholder [loaded]="loaded"><div> ...</div></loading-placeholder>
* */
@Component({
    selector: 'loading-placeholder',
    templateUrl: 'loading-placeholder.component.html',
    styleUrls: ['loading-placeholder.component.scss'],
})
export class LoadingPlaceholderComponent implements OnInit,OnDestroy {
    @Input() loaded: boolean;

    private subsSubjects: Subscription;

    constructor(private http: HttpBaseService) {
    }

    ngOnInit() {
        if (this.loaded === undefined) {
            this.subsSubjects = this.http.loadingChanged$
                .subscribe(isLoading => {
                    this.loaded = !isLoading;
                });
        }
    }

    ngOnDestroy() {
        this.subsSubjects.unsubscribe();
    }
}
