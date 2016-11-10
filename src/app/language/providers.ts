import { ModuleWithProviders, FactoryProvider, ValueProvider, LOCALE_ID }     from '@angular/core';
import { Http } from '@angular/http';

import { HttpBaseService } from '../shared/http-base.service';
import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { CustomTranslateLoader } from './custom-translate-loader.service';
import { LanguageService } from './language.service';

export const LOCALE_ID_PROVIDER:FactoryProvider =  {
    provide: LOCALE_ID,
    deps: [LanguageService],      //some service handling global settings
    useFactory: (languageService) => languageService.getUserLang() //returns locale string
}

export function createTranslateProvider(route: string): FactoryProvider {
    console.log('createTranslateProvider called',route);
    return {
        provide: TranslateLoader,
        useFactory: (http: Http, httpBaseService: HttpBaseService<any>) => new CustomTranslateLoader(http, httpBaseService, route),
        deps: [Http, HttpBaseService],
    }
}

const TRANSLATE_FOR_ROOT_PROVIDER: FactoryProvider = {
    provide: TranslateLoader,
    useFactory: (http: Http, httpBaseService: HttpBaseService<any>) => new CustomTranslateLoader(http, httpBaseService, 'app'),
    deps: [Http, HttpBaseService],
}

export const TranslateModuleWithProvider: ModuleWithProviders = TranslateModule.forRoot(TRANSLATE_FOR_ROOT_PROVIDER);
