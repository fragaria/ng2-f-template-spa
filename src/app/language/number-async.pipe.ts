import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { LanguageService } from './language.service';
import { Config } from '../config';

@Pipe({
    name: 'numberAsync'
})
export class NumberAsyncPipe implements PipeTransform {
    private numberDigits:string;
    constructor(private languageService: LanguageService, private config: Config) {
        this.numberDigits = this.config.getVal("language.numberDigits");
    }
    transform(value: any, digits?: string): Observable<any> {
        this.numberDigits = digits || this.numberDigits;
        return this.languageService.langChanged$
            .map( (locale) => {
                try {
                    let numberPipe = new DecimalPipe(locale);
                    return numberPipe.transform(value, this.numberDigits);
                }
                catch (e) {
                    // console.log(`NumberAsyncPipe locale: ${JSON.stringify(langWithDigits)} value: ${JSON.stringify(value)}`);
                    // console.error(e);
                    return value;
                }
            });
    }
}