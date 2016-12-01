## Logging module

### Popis

Jedná se o modul, který lze použít k logování v projektu (umí odchytnout javascriptovou `console` a logují se pomocí něj chyby, které zachytává `Angular 2` ).

### Příprava a použití

#### Příprava s využitím [Config](./config.md) služby (doporučená cesta)

- pokud tak ještě není učiněno, přidejte službu [Config](./config.md), `LOGGER_PROVIDERS` (obsahuje vytvoření providera pro `Logger` službu s využitím [Config](./config.md) služby) a `LOGGING_ERROR_HANDLER_PROVIDERS` (obsahuje vlastní provider pro logování chyb v [angular 2](https://angular.io/docs/ts/latest/api/core/index/ErrorHandler-class.html)) do pole `providers` v `AppModule` (soubor `src/app/app.module.ts`). Ještě přidáme `Logger` službu do konstruktoru v `AppModule` (aby odchycení konzole nastalo, co nejdříve).

```js

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { Config } from './config';
import {
  Logger,
  LOGGER_PROVIDERS,
  LOGGING_ERROR_HANDLER_PROVIDERS } from './logging';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    Config,
    LOGGER_PROVIDERS,
    LOGGING_ERROR_HANDLER_PROVIDERS
  ]
})
export class AppModule {
  constructor(private logger: Logger) {
  }
}

```

- pokud potřebujete změnit defaultní hodnoty nastavení pro službu `Logger`, tak to můžete udělat v souboru konfigurace `config.js` (popřípadě dalších konfiguračních souborech více viz. [Config](./config.md))

```js
var appConfig = {
  // set log level to error
  "logging.level": 2
}
```

#### Příprava bez použití [Config](./config.md) služby

- přidejte službu `Logger` a provider `LOGGING_ERROR_HANDLER_PROVIDERS` (obsahuje vlastní provider pro logování chyb v [angular 2](https://angular.io/docs/ts/latest/api/core/index/ErrorHandler-class.html)) do pole `providers` v `AppModule` (soubor `src/app/app.module.ts`). Ještě přidáme `Logger` službu do konstruktoru v `AppModule` (aby odchycení konzole nastalo, co nejdříve).

```js

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import {
  Logger,
  LOGGING_ERROR_HANDLER_PROVIDERS } from './logging';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    Logger,
    LOGGING_ERROR_HANDLER_PROVIDERS
  ]
})
export class AppModule {
  constructor(private logger: Logger) {
  }
}

```

- pokud potřebujete změnit defaultní hodnoty nastavení pro službu `Logger`, tak můžete do pole `providers` vložit vlastní provider

```js

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import {
  Level,
  Logger,
  LOGGING_ERROR_HANDLER_PROVIDERS,
  Options } from './logging';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    [ { provide: Options, useValue: { level: Level.ERROR } }, Logger ],
    LOGGING_ERROR_HANDLER_PROVIDERS
  ]
})
export class AppModule {
  constructor(private logger: Logger) {
  }
}

```

#### Použití

- použijte službu tam, kde je třeba (např. ve vaší službě vašeho modulu)

```js

import { Injectable } from '@angular/core';

import { Logger } from './logger';

@Injectable()
export class MyService {

  constructor (private logger: Logger) {
    logger.log("Log it");
  }

}

```

- potřebujete-li zalogovat extra data, předejte je jako druhý parametr metody

```js

import { Injectable } from '@angular/core';

import { Logger } from './logger';

@Injectable()
export class MyService {

  constructor (private logger: Logger) {
    logger.log("Log it", {"fromMethod": "constructor"});
  }

}

```

- potřebujete-li přidat data o uživateli, předejte je jako třetí parametr metody

```js

import { Injectable } from '@angular/core';

import { Logger } from './logger';

@Injectable()
export class MyService {

  constructor (private logger: Logger) {
    logger.log("Log it", undefined, {"username": "Joe"});
  }

}

```

### Nastavení pro logovací službu

Následující volby lze nastavit pro službu `Logger`

- `allowConsoleCatch` povoluje zachycení js `console` (v `config.js` použijte jméno `logging.allowConsoleCatch`)
- `level` povolený level logování (v `config.js` použijte jméno `logging.level`)
- `onlyMsgInConsole` do konzole se nevypisují extra data a data o uživateli (v `config.js` použijte jméno `logging.onlyMsgInConsole`)


### Úrovně pro logovací službu

- `OFF` (služba nebude logovat, ani neodchytne konzoli)
- `ERROR`
- `WARN`
- `INFO`
- `DEBUG`
- `LOG`

### Seznam metod logovací služby

- `error` logovuje chybové zprávy (zaloguje pokud není nastaven level na `OFF`)
- `warn` logovuje varovné zprávy (zaloguje pokud není nastaven level na `OFF` nebo `ERROR`)
- `info` logovuje informační zprávy (zaloguje pokud není nastaven level na `OFF` nebo `ERROR` nebo` WARN`)
- `debug` logovuje ladící zprávy (zaloguje pokud není nastaven level na `OFF` nebo `ERROR` nebo` WARN` nebo `INFO`)
- `log` logovuje ladící zprávy (zaloguje pokud není nastaven level na `OFF` nebo `ERROR` nebo` WARN` nebo `INFO` nebo `DEBUG`)

[zpět na README](../README.md)
