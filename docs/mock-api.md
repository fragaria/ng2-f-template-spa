## Mock api

### Popis

Projekt v současnosti používá pro mockování api samostatný npm balíček [ng2-f-mock-api](https://github.com/fragaria/ng2-f-mock-api), který je postaven nad modulem [in-memory-web-api](https://github.com/angular/in-memory-web-api), který udržuje data v paměti (přičemž se lze přes standardní `HttpModule` dotazovat, jako by to bylo standardní api). Pokud máte vlastní api mocky (nebo používáte něco jako [apiary](https://apiary.io/)) a nepotřebujete nic dalšího mockovat, pak můžete modul odstranit (viz níže).

### Odstranění z projektu

- Ze souboru `package.json` odstraňte `ng2-f-mock-api` balíček
- Ze souboru `src/app/app.module.ts` odstraňte import `import { MockApiModule } from 'ng2-f-mock-api';` a řádek `MockApiModule.forRoot()` z pole `imports` (v dekorátoru `@NgModule` třídy `AppModule`)

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

- Volejte ve vašich službách místo ostré url mockovanou (např. `url = 'api/items'`), ideálně využijte [Config module](./config.md) pro uložení url pro službu (v okamžiku, kdy budete mít ostré api, by vám mělo stačit v configu změnit hodnotu pro url a odstranit mock modul)

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
