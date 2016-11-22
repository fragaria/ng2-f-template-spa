import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Config } from '../config'


@Injectable()
export class LanguageService {
    private appName;

    // Observable string sources
    private activeLang = new BehaviorSubject<string>('cs');

    // Observable string streams
    langChanged$ = this.activeLang.asObservable();

    constructor(config:Config){
        this.appName = config.getVal('appName') || 'fast';
        this.setUserLang(this.getUserLang());
    }

    setUserLang = (lang:string):void => {
        const KEY_NAME = `${this.appName}.LanguageService.lang`;
        localStorage.setItem(KEY_NAME, lang);
        this.activeLang.next(lang);
    }

    getUserLang = ():string => {
        const KEY_NAME = `${this.appName}.LanguageService.lang`;
        let userLang = localStorage.getItem(KEY_NAME);
        if (!userLang) {
            userLang = (window.navigator.language || window.navigator['browserLanguage']).split('-')[0]; // use navigator lang if available
            userLang = /(cs|en)/gi.test(userLang) ? userLang : 'cs';
        }
        return userLang;
    }
}