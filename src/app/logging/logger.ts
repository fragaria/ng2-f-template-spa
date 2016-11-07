/**
 * Classes structures are inspired by
 * https://github.com/code-chunks/angular2-logger
 */

import { Injectable, Optional } from "@angular/core";

import { Level } from "./level";

export class Options {
    level: Level;
    global: boolean;
    globalAs: string;
    store: boolean;
    storeAs: string;
}

// Temporal until https://github.com/angular/angular/issues/7344 gets fixed.
const DEFAULT_OPTIONS: Options = {
    level: Level.LOG,
    global: true,
    globalAs: "logger",
    store: false,
    storeAs: "angular2.logger.level"
};

@Injectable()
export class Logger {

    private _level: Level;
    private _globalAs: string;
    private _store: boolean;
    private _storeAs: string;

    public Level: any = Level;

    public consoleMethods = {
      'log': console.log,
      'debug': console && console.debug || console.log,
      'info': console.info,
      'warn': console.warn,
      'error': console.error
    }

    constructor( @Optional() options?: Options ) {

        // Move this to the constructor definition when optional parameters are working with @Injectable: https://github.com/angular/angular/issues/7344
        let { level, global, globalAs, store, storeAs } = Object.assign( {}, DEFAULT_OPTIONS, options );

        this._level = level;
        this._globalAs = globalAs;
        this._storeAs = storeAs;

        global && this.global();

        if ( store || this._loadLevel() ) this.store();

    }

    private _loadLevel = (): Level => Level[localStorage.getItem( this._storeAs ) as string];

    private _storeLevel(level: Level) { localStorage[ this._storeAs ] = level; }

    error(message: any, ...optionalParams: any[]) {
        this.isErrorEnabled() && this.sendMessage('error', message, ...optionalParams);
    }

    warn(message: any, ...optionalParams: any[]) {
        this.isWarnEnabled() && this.sendMessage('warn', message, ...optionalParams);
    }

    info(message: any, ...optionalParams: any[]) {
        this.isInfoEnabled() && this.sendMessage('info', message, ...optionalParams);
    }

    debug(message: any, ...optionalParams: any[]) {
        this.isDebugEnabled() && this.sendMessage('debug', message, ...optionalParams);
    }

    log(message: any, ...optionalParams: any[]) {
        this.isLogEnabled() && this.sendMessage('log', message, ...optionalParams);
    }

    sendMessage(levelStr: string, message: any, ...optionalParams: any[]) {
      // TODO: Add remote log here
      let nowDate: Date = new Date();
      let dateStr: string = nowDate.toISOString();
      this.consoleMethods[levelStr](`LOGGER ${dateStr}: `, message, ...optionalParams);
    }

    global = () => ( <any> window )[this._globalAs] = this;

    store(): Logger {

        this._store = true;
        let storedLevel = this._loadLevel();
        if ( storedLevel ) { this._level = storedLevel; }
        else { this._storeLevel( this.level ); }

        return this;

    }

    unstore(): Logger {
        this._store = false;
        localStorage.removeItem( this._storeAs );
        return this;
    }

    isErrorEnabled = (): boolean => this.level >= Level.ERROR;
    isWarnEnabled = (): boolean => this.level >= Level.WARN;
    isInfoEnabled = (): boolean => this.level >= Level.INFO;
    isDebugEnabled = (): boolean => this.level >= Level.DEBUG;
    isLogEnabled = (): boolean => this.level >= Level.LOG;

    get level(): Level { return this._level; }

    set level(level: Level) {
        this._store && this._storeLevel(level);
        this._level = level;
    }

}
