import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from "rxjs/Observable";
import { Logger } from "./../logging";
import { Config } from "./../config";

import { TranslateService } from "ng2-translate";
import { ItemModule, ItemListComponent, Item, ItemService } from '../item';

class MockItemService {

    testItems: Item[] = [
        {'id': 1234,'title': 'titleValue1'},
        {'id': 4567,'title': 'titleValue2'},
    ]

    getItem(id: number | string): Observable<Item> {
        return Observable.of(this.testItems[0]);
    }

    getItems(): Observable<Item[]> {
        return Observable.of(this.testItems);
    }
}

// class MockActivatedRoute {
//     get params(): Observable<any> {
//         return Observable.of({ 'id': 1 });
//     }
// }

class MockTranslateService {
    testLang = {
        'lang': 'cs',
        'translations': 'test'
    };
    getParsedResult(translations: any, key: any, interpolateParams?: Object): any{
        return Observable.of("translatedText");
    }

    get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
        return Observable.of("translatedText");
    }

    get onLangChange() {
        return Observable.of(this.testLang);
    }
    get onTranslationChange() {
        return Observable.of(this.testLang);
    }
    use(lang: string): Observable<any> {
        return Observable.of(this.testLang);
    };
}

describe('ItemListComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ItemModule,
                RouterTestingModule
            ],
            providers: [
                Config,
                Logger,
                { provide: TranslateService, useClass: MockTranslateService },
                { provide: ItemService, useClass: MockItemService },
            ]
        });
    });


    it('check transactions list', async(() => {
        TestBed.overrideComponent(ItemListComponent, {
            set: {
                providers: [
                    { provide: ItemService, useClass: MockItemService }
                ]
            }
        });
        this.fixture = TestBed.createComponent(ItemListComponent);
        this.fixture.whenStable()
            .then(() => {

                spyOn(this.fixture.componentInstance, 'ngOnInit').and.callThrough();
                this.fixture.detectChanges();
                expect(this.fixture.componentInstance.ngOnInit).toHaveBeenCalled();

                this.fixture.detectChanges();
                let items = this.fixture.nativeElement.querySelectorAll("div>a");
                // console.log(this.fixture.nativeElement.querySelectorAll(".row"));
                expect(items.length).toBe(2);
            })
            .catch((error) => {
                console.log("error occured: " + error);
            });
    }));

})
;
