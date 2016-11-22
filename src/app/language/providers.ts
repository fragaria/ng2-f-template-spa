import { ModuleWithProviders, FactoryProvider }     from '@angular/core';

import { HttpBaseService } from '../shared/http-base.service';
import { TranslateModule, TranslateService, TranslateLoader, MissingTranslationHandler } from 'ng2-translate/ng2-translate';
import { CustomTranslateLoader, MyMissingTranslationHandler } from './custom-translate-loader.service';
import { LanguageService } from './language.service';
import { Config } from '../config';
import { Logger } from '../logging';

export function createTranslateProviders(module: string): any[] {
    return [
        {
            provide: TranslateLoader,
            useFactory: (httpBaseService: HttpBaseService<any>, config:Config) => new CustomTranslateLoader(httpBaseService, config, module),
            deps: [HttpBaseService, Config],
        },
        {
            provide: MissingTranslationHandler,
            useFactory: (logger: Logger) => new MyMissingTranslationHandler(logger),
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
    useFactory: (httpBaseService: HttpBaseService<any>, config:Config) => new CustomTranslateLoader(httpBaseService, config, 'app'),
    deps: [HttpBaseService, Config],
}

export const TranslateModuleWithProvider: ModuleWithProviders = TranslateModule.forRoot(TRANSLATE_FOR_ROOT_PROVIDER);
