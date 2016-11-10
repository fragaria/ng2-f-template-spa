import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LanguageService } from './language.service';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateAsync'
})
export class DateAsyncPipe implements PipeTransform {
    constructor(private languageService: LanguageService) {
    }

    transform(value: any, pattern?: string): Observable<any> {
        return this.languageService.langChanged$
            .map(locale => {
                let datePipe = new DatePipe(locale);
                try {
                    return datePipe.transform(value, pattern);
                }
                catch (e) {
                    console.log(`DateAsyncPipe locale: ${JSON.stringify(locale)} value: ${JSON.stringify(value)}`);
                    console.error(e);
                    return value;
                }
            });
    }
}