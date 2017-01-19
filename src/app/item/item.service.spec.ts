import {
    fakeAsync,
    inject,
    tick,
    TestBed
} from '@angular/core/testing';

import {
    ConnectionBackend,
    BaseRequestOptions,
    Http,
    Headers,
    Response,
    RequestMethod,
    ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Item } from "./index";
import { HttpRestJsonService, HttpBaseService } from './../core';
import { ItemService } from "./index";
import { Logger } from "./../logging";
import { Config } from "./../config";

const ITEM: Item = {
    "id": 1,
    "title": "titleValue"
}

describe('test ItemService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Config,
                Logger,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                HttpBaseService,
                HttpRestJsonService,
                ItemService
            ]
        });
    });

    describe('try call', () => {

        it('getItems method',
            inject([ItemService, MockBackend], fakeAsync((itemService, mockBackend) => {
                let connection: MockConnection;
                mockBackend.connections.subscribe(c => {
                    connection = c;
                    let headers = new Headers();
                    let response = new ResponseOptions({ headers: headers, status: 200, body: { data : [ ITEM ] } });
                    c.mockRespond(new Response(response));
                });

                itemService.getItems().subscribe(res => {
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    expect(res.length).toEqual(1);
                });
                tick();
            }))
        );

        it('getItem method',
            inject([ItemService, MockBackend], fakeAsync((itemService, mockBackend) => {
                let connection: MockConnection;
                mockBackend.connections.subscribe(c => {
                    connection = c;
                    let headers = new Headers();
                    let response = new ResponseOptions({ headers: headers, status: 200, body: { data : ITEM } });
                    c.mockRespond(new Response(response));
                });

                itemService.getItem(1).subscribe(res => {
                    expect(connection.request.method).toBe(RequestMethod.Get);
                    expect(res.title).toEqual('titleValue');
                });
                tick();
            }))
        );

    });
});

