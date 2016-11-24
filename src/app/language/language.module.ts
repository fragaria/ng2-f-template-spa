import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from 'ng2-translate/ng2-translate';
import { LangToggleComponent } from "./lang-toggle.component";
import { LanguageService } from './language.service';
import { NumberAsyncPipe } from './number-async.pipe';
import { DateAsyncPipe } from './date-async.pipe';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule
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
    ]
})
export class LanguageModule {}
