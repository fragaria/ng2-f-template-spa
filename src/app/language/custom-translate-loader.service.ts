import { Injectable } from '@angular/core';
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/ng2-translate";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';
import { HttpBaseService } from '../shared/http-base.service';

declare interface LangModel {lang: string; route:string; data:string;
}
@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
    fallbackStaticLoader: TranslateStaticLoader;
    private model: LangModel;

    constructor(protected http: Http,
                protected httpService: HttpBaseService<LangModel>,
                protected route: string) {
        console.log('CustomTranslateLoader.constructor for route', this.route);
        this.fallbackStaticLoader = new TranslateStaticLoader(http, '/assets/i18n', '.json');
    }

    getTranslation(lang: string): Observable<any> {
        console.log('getTranslation call MOCK API', lang, this.route);
        return this.httpService.getObject(`i18n/resources?lang=${lang}&route=${this.route}`)
            // .do(data => console.log(data))
            .map(data => data[0].data)
            .merge(this.fallbackStaticLoader.getTranslation(lang))
            .catch((e) => {
                console.log('getTranslation MOCK API catch', e);
                return this.fallbackStaticLoader.getTranslation(lang);
            })
    }
}



