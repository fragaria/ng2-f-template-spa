import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LanguageService {
    private APP_NAME = 'fast';

    // Observable string sources
    private activeLang = new BehaviorSubject<string>('cs');

    // Observable string streams
    langChanged$ = this.activeLang.asObservable();

    constructor(){
        this.setUserLang(this.getUserLang());
    }

    setUserLang = (lang:string):void => {
        let KEY_NAME = `${this.APP_NAME}.user.lang`;
        localStorage.setItem(KEY_NAME, lang);
        this.activeLang.next(lang);
    }

    getUserLang = ():string => {
        let KEY_NAME = `${this.APP_NAME}.user.lang`;
        let userLang = localStorage.getItem(KEY_NAME);
        if (!userLang) {
            userLang = (window.navigator.language || window.navigator['browserLanguage']).split('-')[0]; // use navigator lang if available
            userLang = /(cs|en)/gi.test(userLang) ? userLang : 'cs';
        }
        return userLang;
    }
}

@Injectable()
export class TestService {
    constructor(num:number){
        console.log('test service',num);;
    }
}