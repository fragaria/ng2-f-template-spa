import { NgModule, LOCALE_ID, ReflectiveInjector, ModuleWithProviders, FactoryProvider }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { HttpBaseService } from '../shared/http-base.service';
import { TranslateModule, TranslateLoader, TranslateService } from 'ng2-translate/ng2-translate';
import { CustomTranslateLoader} from './custom-translate-loader.service';
import { LangToggleComponent } from "./lang-toggle.component";
import { LanguageService, TestService } from './language.service';
import { NumberAsyncPipe } from './number-async.pipe';
import { DateAsyncPipe } from './date-async.pipe';
import { LOCALE_ID_PROVIDER, createTranslateProvider } from './providers';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forRoot(createTranslateProvider('app'))
    ],
    declarations: [
        LangToggleComponent,
        NumberAsyncPipe,
        DateAsyncPipe
    ],
    exports: [
        LangToggleComponent,
        TranslateModule,
        NumberAsyncPipe,
        DateAsyncPipe,
    ],
    providers: [
        LanguageService,
        LOCALE_ID_PROVIDER,
    ]
})
export class LanguageModule {
}

