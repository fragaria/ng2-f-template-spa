import { Injectable } from '@angular/core';

@Injectable()
export class Config {

  private configName: string = "app-config";
  private config: Object = {};

  constructor() {
    this.load();
  }

  public getVal(key: string) {
    return this.config[key];
  }

  public load() {
    // load data from window object
    if (!window[this.configName]) {
      throw Error("No config for app");
    }
    this.updateConf(window[this.configName]);
  }

  public updateConf(updater: Object) {
    for (let prop in updater) {
      this.config[prop] = updater[prop];
    }
  }
}
