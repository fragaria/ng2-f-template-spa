## Lokalizace

### Popis

Projekt používá pro lokalizaci řetězců modul [LanguageModule](../src/app/language), který je postaven nad modulem [ng2-translate](https://github.com/ocombe/ng2-translate).
Tato knihovna poskytuje TranslatePipe a další funkce TranslateService pro překlad řetězců na základě unikátního klíče.
Jako zdroje pro překlad jsou nutné lokální překlady v adresáři [assets/i18n](../src/assets/i18n) a popřípadně stahovatelné překlady podle resource linku v config službě.
Zdroje lze stahovat pro každou komponentu, nebo strom komponent z odlišného zdroje. Pro hlavní komponentu aplikace se stahuje ze zdroje `app`.

Dále modul LanguageModule poskytuje:
 - komponentu pro přepínání jazyka, (na pozadí je služba LanguageService, která spravuje a emituje změnu jazyka pomocí Observable langChanged$)
 - DateAsyncPipe : sleduje změnu jazyka a podle formátu datumu ze služby Config volá pipe [DatePipe](https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html)
 - NumberAsyncPipe : sleduje změnu jazyka a podle formátu ze služby Config volá vestavěnou [DecimalPipe](https://angular.io/docs/ts/latest/api/common/index/DecimalPipe-pipe.html)


### Odstranění z projektu

- Ze souboru `package.json` odstraňte `ng2-translate` balíček
- Ze souboru `src/app/app.module.ts` odstraňte import `import { LanguageModule } from 'ng2-f-mock-api';` a řádek `MockApiModule.forRoot()` z pole `imports` (v dekorátoru `@NgModule` třídy `AppModule`)

### Použití

- Předejte do `MockApiModule` (v souboru `src/app/app.module.ts`) svá mock data (data nemusíte předávat, pokud vám stačí ta co jsou v balíčku `ng2-f-mock-api` obsažena více viz. [ng2-f-mock-api](https://github.com/fragaria/ng2-f-mock-api))

```js

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';

// Import mock module
import { MockApiModule } from 'ng2-f-mock-api';

import { AppComponent } from './app.component';

// Your mock data (move it to separate file)
let items = [
  { id: 11, title: 'Whatever' },
  { id: 12, title: 'Thing' }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    // mock module with your mock data
    MockApiModule.forRoot({items: items})
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

```

- Volejte ve vašich službách místo ostré url mockovanou (např. `url = 'api/items'`), ideálně využíte [Config module](./config.md) pro uložení url pro službu (v případě, že pak budete mít už osté api, tak by vám pak mělo stačit v konfigu změnit hodnotu pro url a odstranění mock modulu)

```js

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Config } from '../config';

@Injectable()
export class MyService {
  // in config file set 'mymoduleApiUrl' to 'api/items'
  protected url: string;
  // protected url = 'api/items';  // Use this if you do not use config service

  constructor (private config: Config, protected http: Http) {
    // Get url from config service mymoduleApiUrl = 'api/items'
    this.url = config.getVal('mymoduleApiUrl');
  }

}

```

- více o použití viz. [ng2-f-mock-api](https://github.com/fragaria/ng2-f-mock-api)
