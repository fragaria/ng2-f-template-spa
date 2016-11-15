import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LanguageService } from './language.service';
import { DatePipe } from '@angular/common';
import { Config } from '../config';

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