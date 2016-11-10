import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { LanguageService } from './language.service';

@Pipe({
    name: 'numberAsync'
})
export class NumberAsyncPipe implements PipeTransform {
    constructor(private languageService: LanguageService) {
    }

    transform(value: any, digits?: string): Observable<any> {
        return this.languageService.langChanged$
            .map(locale => {
                try {
                    let numberPipe = new DecimalPipe(locale);
                    return numberPipe.transform(value, digits);
                }
                catch (e) {
                    console.log(`NumberAsyncPipe locale: ${JSON.stringify(locale)} value: ${JSON.stringify(value)}`);
                    console.error(e);
                    return value;
                }
            });
    }
}