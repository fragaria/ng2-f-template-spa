import { TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from "ng2-translate/ng2-translate";
import { Observable } from 'rxjs/Observable';
import { HttpBaseService } from '../shared/http-base.service';
import { Config } from '../config';
import { Logger } from '../logging';

interface LangModel {lang: string; route:string; data:string;
}

export class CustomTranslateLoader implements TranslateLoader {
    fallbackStaticLoader: TranslateStaticLoader;

    constructor(protected httpService: HttpBaseService<LangModel>,
                protected config: Config,
                protected module: string
                ) {
        let prefix = `${this.config.getVal("language.prefix") || '/assets/i18n'}/${module}`;
        let suffix = this.config.getVal("language.suffix") || '.json';
        this.fallbackStaticLoader = new TranslateStaticLoader(httpService.http, prefix, suffix);
    }

    getTranslation(lang: string): Observable<any> {
        //TODO: resources url is defined by MockApiModule
        let urlResources = this.config.getVal("language.resources") || "i18n/resources?lang=${lang}&module=${module}";
        urlResources = urlResources.replace("${lang}",lang);
        urlResources = urlResources.replace("${module}",this.module);
        return this.httpService.getObject(urlResources)
            .map(data => data[0].data)
            .merge(this.fallbackStaticLoader.getTranslation(lang))
            .catch((e) => {
                return this.fallbackStaticLoader.getTranslation(lang);
            })
    }
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
    constructor(private logger:Logger){}

    handle(params: string) {
        // this.logger.warn(`MyMissingTranslationHandler. ${params}`);
        return `{{${params}}}`;
    }
}


