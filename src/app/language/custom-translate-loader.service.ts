import { TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from "ng2-translate/ng2-translate";
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { HttpRestJsonService } from '../core';
import { Config } from '../config';
import { Logger } from '../logging';

interface LangModel {lang: string; route:string; data:string;
}

export class CustomTranslateLoader implements TranslateLoader {
    fallbackStaticLoader: TranslateStaticLoader;

    constructor(protected http: Http,
                protected httpRestService: HttpRestJsonService<LangModel>,
                protected config: Config,
                protected module: string
                ) {
        let prefix = `${this.config.getVal("language.prefix") || 'assets/i18n'}/${module}`;
        let suffix = this.config.getVal("language.suffix") || '.json';
        this.fallbackStaticLoader = new TranslateStaticLoader(this.http, prefix, suffix);
    }

    getTranslation(lang: string): Observable<any> {
        //TODO: resources url is defined by MockApiModule
        let urlResources = this.config.getVal("language.resources") || "i18n/resources?lang=${lang}&module=${module}";
        urlResources = urlResources.replace("${lang}",lang);
        urlResources = urlResources.replace("${module}",this.module);
        return this.httpRestService.getObject(urlResources)
            .map(data => data[0].data)//TODO: map function is defined by MockApiModule structure
            .merge(this.fallbackStaticLoader.getTranslation(lang))
            .scan((data1,data2)=> {
                let result ={};
                Object.assign(result , data1, data2);
                return result;
            })
            .catch((e) => {
                return this.fallbackStaticLoader.getTranslation(lang);
            })
    }
}

export class AppMissingTranslationHandler implements MissingTranslationHandler {
    constructor(private logger:Logger){}

    handle(params: string) {
        this.logger.warn(`AppMissingTranslationHandler. ${params}`);
        return ` `;
    }
}
