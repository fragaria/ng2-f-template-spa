## Config module

### Popis

Jedná se o modul, který se používá ke konfiguraci projektu (nastavení mohou být rozdílná dle prostředí, tedy se nastavují během deploy).

### Příprava modulu ve vývoji

Pro vývoj stačí spustit `npm run init-conf` viz. [README](../), tento příkaz zkopíruje soubor `src/assets/configs/dev.js` do `src/assets/configs/config.js` (v něm můžete dělat úpravy jenotlivých hodnot, tento soubor není zahrnut v gitu) a tím je konfigurační modul připraven k použití.

### Úprava konfigurací

- pokud upravujete konfigurace v `config.js` na lokále a chcete, aby se přenesly i pro ostatní vývojáře, je třeba upravit i `dev.js` (a ideálně i ostatní js soubory, které leží v `src/assets/configs/`). Ostatní vývojáři si pak mohou aktuáním `dev.js` nahradit svůj `config.js` opětovným zavoláním `npm run init-conf`.
- do produkce se pak vaše změny automaticky dostanou jen v případě, že využíváte `src/assets/configs/prod.js` jako zdroj pro symlink při nasazování.

### Použití

- pokud tak ještě není učiněno, přidejte službu `Config` do pole `providers` v `AppModule` (soubor `src/app/app.module.ts`)

```js

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Config } from './config';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [ Config ]
})
export class AppModule { }

```

- použijte službu tam, kde je třeba (např. ve vaší službě vašeho modulu)

```js

import { Injectable } from '@angular/core';

import { Config } from '../config';

@Injectable()
export class MyService {
  protected url: string;

  constructor (private config: Config) {
    this.url = config.getVal('mymodule.apiUrl');
  }

}

```

### Použití v produkčních prostředích

- při nasazení balíčku je třeba udělat symlink (nebo nakopírovat) produkční konfigurace na místo `config.js`, tedy něco jako `/app_root/myapp/assets/configs/config.js -> /app_configs/myapp/prod.js`
- ve webovém serveru je také třeba nastavit nějak rozumně cachovací hlavičky pro `config.js` (kvůli tomu jak ho budou prohlížeče cachovat), při linkování do `index.html` soubor obsahuje za otazníkem jen parametr t, který má za hodnotu timestamp buildu:

```html

<script type="text/javascript" src="assets/configs/config.js?t=1479225159678"></script>

```

[zpět na README](../README.md)
