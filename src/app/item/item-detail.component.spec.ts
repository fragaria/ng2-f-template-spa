import {
    async,
    fakeAsync,
    inject,
    tick,
    TestBed,
    ComponentFixture

} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from "rxjs/Observable";
import { Logger } from "./../logging";
import { Config } from "./../config";

import { ItemDetailComponent, Item, ItemModule, ItemService } from "./index";
import { HttpRestJsonService, HttpBaseService } from './../core';

import { itemsRouting } from './item.routing';
import { SharedModule } from '../shared';
import { LanguageModule } from '../language';
import { ItemListComponent } from "./item-list.component";


class MockItemService {

    testItem: Item = {
        'id': 1234,
        'title': 'titleValue'
    }

    getItem(id: number | string): Observable<Item> {
        return Observable.of(this.testItem);
    }

    getItems(): Observable<Item[]> {
        return Observable.of([this.testItem]);
    }
}
class MockActivatedRoute {
    get params(): Observable<any> {
        return Observable.of({ 'id': '1' });
    }
}

class MockTranslateService {
get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return Observable.of("text");
}
}

let testItemModel: Item = { "id": 123, "title": "titleValue" };

describe('ItemComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ItemModule,
                RouterTestingModule
            ],
            providers: [
                Config,
                Logger,
                { provide: ItemService, useClass: MockItemService }
            ]
        });
    });

    it('check HTML DOM for item', async(() => {
        TestBed.overrideComponent(ItemDetailComponent, {
            set: {
                providers: [
                    { provide: ItemService, useClass: MockItemService }
                ]
            }
        });
        this.fixture = TestBed.createComponent(ItemDetailComponent);
        this.fixture.whenStable()
            .then(() => {

                this.fixture.componentInstance.item = testItemModel;

                spyOn(this.fixture.componentInstance, 'ngOnInit').and.callThrough();

                this.fixture.detectChanges();

                let itemLastChild = this.fixture.nativeElement.querySelector(".form-group:last-of-type");
                //let accountLastChild = fixture.debugElement.queryAllNodes(By.css(".form-group:last-of-type"));
                expect((<any>itemLastChild).innerHTML).toContain('titleValue');

            })
            .catch((error) => {
                console.log("error occured: " + error);
            });
    }));
});

