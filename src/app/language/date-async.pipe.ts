import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LanguageService } from './language.service';
import { DatePipe } from '@angular/common';
import { Config } from '../config';
/* *
 * DateAsyncPipe, expecting Language and Config services
 * - inspired by @angular/common DatePipe [https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html]
 *
 * ### Syntax
 *
 * - <p>{{ '2016-11-01T00:00:00+00:00' | dateAsync | async }}</p>
 * */
@Pipe({
    name: 'dateAsync'
})
export class DateAsyncPipe implements PipeTransform {
    private datePattern:string;

    constructor(private languageService: LanguageService, private config: Config) {
        this.datePattern = this.config.getVal("language.datePattern") || "fullDate";
    }

    transform(value: any, pattern?: string): Observable<any> {
        this.datePattern = pattern || this.datePattern;
        return this.languageService.langChanged$
            .map((locale) => {
                let datePipe = new DatePipe(locale);
                try {
                    return datePipe.transform(value, this.datePattern);
                }
                catch (e) {
                    // console.log(`DateAsyncPipe locale: ${JSON.stringify(langWithPattern)} value: ${JSON.stringify(value)}`);
                    // console.error(e);
                    return value;
                }
            });
    }
}