/**
 * Classes structures are inspired by
 * https://github.com/code-chunks/angular2-logger
 */

import { Injectable, Optional } from "@angular/core";

import { Level } from "./level";

export class Options {
  allowConsoleCatch: boolean;
  level: Level;
  onlyMsgInConsole: boolean;
}

// Temporal until https://github.com/angular/angular/issues/7344 gets fixed.
const DEFAULT_OPTIONS: Options = {
  allowConsoleCatch: true,
  level: Level.LOG,
  onlyMsgInConsole: false
};

@Injectable()
export class Logger {

    private _allowConsoleCatch: boolean;
    private _level: Level;
    private _onlyMsgInConsole: boolean;

    public consoleMethods = {
      'log': console.log,
      'debug': console && console.debug || console.log,
      'info': console.info,
      'warn': console.warn,
      'error': console.error
    }

    constructor( @Optional() options?: Options ) {

        // Move this to the constructor definition when optional parameters are working with @Injectable: https://github.com/angular/angular/issues/7344
        let { allowConsoleCatch, level, onlyMsgInConsole } = Object.assign( {}, DEFAULT_OPTIONS, options );

        this._allowConsoleCatch = allowConsoleCatch;
        this._level = level in Level ? level : DEFAULT_OPTIONS.level;
        this._onlyMsgInConsole = onlyMsgInConsole;

        this.catchConsole();

    }

    error(message: any, extraData?: Object, userData?: Object) {
        this.isErrorEnabled() && this.sendMessage('error', message, extraData, userData);
    }

    warn(message: any, extraData?: Object, userData?: Object) {
        this.isWarnEnabled() && this.sendMessage('warn', message, extraData, userData);
    }

    info(message: any, extraData?: Object, userData?: Object) {
        this.isInfoEnabled() && this.sendMessage('info', message, extraData, userData);
    }

    debug(message: any, extraData?: Object, userData?: Object) {
        this.isDebugEnabled() && this.sendMessage('debug', message, extraData, userData);
    }

    log(message: any, extraData?: Object, userData?: Object) {
        this.isLogEnabled() && this.sendMessage('log', message, extraData, userData);
    }

    sendMessage(levelStr: string, message: any, extraData?: Object, userData?: Object) {
      // TODO: Add remote log here
      let nowDate: Date = new Date();
      let dateStr: string = nowDate.toISOString();
      let targetExtraData:any = this.updateObject(this.getExtraData(), extraData);
      let targetUserData: any = this.updateObject(this.getUserData(), userData);
      let params: any = [`LOGGER ${dateStr}: `, message, targetExtraData, targetUserData];
      // Send to remote here

      // for console send only message for better readability if option is true
      let consoleParams = this._onlyMsgInConsole ? params.slice(0, 2) : params;
      this.consoleMethods[levelStr](...consoleParams);
    }

    getExtraData(): any {
      // return extra data for logging
      return {}
    }

    getUserData():any {
      return {
        'User-Agent': navigator && navigator.userAgent,
        'location': window.location && window.location.href,
        'lang': navigator && navigator.language
      }
    }

    updateObject (baseObj: Object, expansionObj: Object): Object {
      if (expansionObj) {
        for (let prop in expansionObj) {
          baseObj[prop] = expansionObj[prop];
        }
      }
      return baseObj
    }

    isEnabled = (): boolean => this.level != Level.OFF;
    isErrorEnabled = (): boolean => this.level >= Level.ERROR;
    isWarnEnabled = (): boolean => this.level >= Level.WARN;
    isInfoEnabled = (): boolean => this.level >= Level.INFO;
    isDebugEnabled = (): boolean => this.level >= Level.DEBUG;
    isLogEnabled = (): boolean => this.level >= Level.LOG;

    get level(): Level { return this._level; }

    set level(level: Level) {
        this._level = level;
    }

    catchConsole() {
      if (this._allowConsoleCatch) catchConsole(this);
    }
}

/**
 * Console catching
 */

// used for check if console is already catched
let consoleCatched: boolean = false;

export function catchConsole(logger: Logger) {
  if (!consoleCatched && logger.level != Level.OFF) {
    consoleCatched = true;

    var oldLogFunctions = {
      'log': null,
      'debug': null,
      'info': null,
      'warn': null,
      'error': null
    }

    /* IE9 no console hack */

    if (typeof console === 'undefined') {
      (window as any).console = {
        log: function(){},
        debug: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
      };
    }

    for (let methodName in oldLogFunctions) {
      if (console && console[methodName]) {
        oldLogFunctions[methodName] = console[methodName];
        console[methodName] = function () {

          //modern browsers
          if (oldLogFunctions[methodName].apply) {
            logger.consoleMethods[methodName] = function() { oldLogFunctions[methodName].apply(console, arguments) };
          }
          //ie9
          else {
            logger.consoleMethods[methodName] = Function.prototype.bind.call(oldLogFunctions[methodName], console);
          }

          // for more than one arg in arguments wrrap to Array
          // this is becouse of we want to have fixed logger api
          let newArguments = arguments.length > 1 ? [arguments] : arguments;
          // send message to your logger.
          logger[methodName].apply(logger, newArguments);

        };
      }
    }
  }

}
