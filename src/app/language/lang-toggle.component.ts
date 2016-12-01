import { Component, OnDestroy } from '@angular/core';
import { LanguageService } from "./language.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'lang-toggle',
    templateUrl: 'lang-toggle.component.html'
})
export class LangToggleComponent implements OnDestroy{
    private lang: string;
    private subsLang:Subscription;

    constructor(private languageService: LanguageService) {
        this.subsLang = languageService.langChanged$.subscribe(lastLang => this.lang = lastLang);
    }

    changeLanguage(lang:string){
        this.languageService.setUserLang(lang);
    }

    ngOnDestroy(){
        this.subsLang.unsubscribe();
    }
}