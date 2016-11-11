import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Config {

  private config: Object = {};
  private envConfFile: string = 'assets/configs/env.json';

  constructor(private http: Http) { }

  public getVal(key: string) {
    return this.config[key];
  }

  public load() {
    return new Promise((resolve, reject) => {
      this.http.get(this.envConfFile)
          .map(res => res.json())
          .catch((error: any) => {
            console.error(error);
            resolve(error);
            return Observable.throw(error.json().error || 'Server error');
          })
          .subscribe((data) => {
            this.updateConf(data);
            resolve(true);
          })
    });
  }

  public updateConf(updater: Object) {
    for (let prop in updater) {
      this.config[prop] = updater[prop];
    }
  }
}
