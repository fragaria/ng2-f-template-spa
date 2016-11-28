import { ModuleWithProviders, FactoryProvider }     from '@angular/core';
import { Http } from '@angular/http';

import { HttpRestJsonService } from '../core';
import { TranslateModule, TranslateService, TranslateLoader, MissingTranslationHandler } from 'ng2-translate/ng2-translate';
import { CustomTranslateLoader, AppMissingTranslationHandler } from './custom-translate-loader.service';
import { LanguageService } from './language.service';
import { Config } from '../config';
import { Logger } from '../logging';

export function createTranslateProviders(module: string): any[] {
    return [
        {
            provide: TranslateLoader,
            useFactory: (http: Http, httpRestService: HttpRestJsonService<any>, config:Config) => new CustomTranslateLoader(http, httpRestService, config, module),
            deps: [Http, HttpRestJsonService, Config],
        },
        {
            provide: MissingTranslationHandler,
            useFactory: (logger: Logger) => new AppMissingTranslationHandler(logger),
            deps: [Logger],
        },
        {
            provide: TranslateService,
            useFactory: (tl: TranslateLoader, handler: MissingTranslationHandler) => new TranslateService(tl, handler),
            deps: [TranslateLoader, MissingTranslationHandler]
        }
    ]
}

const TRANSLATE_FOR_ROOT_PROVIDER: FactoryProvider = {
    provide: TranslateLoader,
    useFactory: (http: Http, httpRestService: HttpRestJsonService<any>, config:Config) => new CustomTranslateLoader(http, httpRestService, config, 'app'),
    deps: [Http, HttpRestJsonService, Config],
}

export const TranslateModuleWithProvider: ModuleWithProviders = TranslateModule.forRoot(TRANSLATE_FOR_ROOT_PROVIDER);
