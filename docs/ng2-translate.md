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
- Ze souboru `src/app/app.module.ts` odstraňte import `import { LanguageModule } from './language';` a řádek `LanguageModule` z pole `imports` (v dekorátoru `@NgModule` třídy `AppModule`)
- Ze souboru `src/app/app.component.ts` odstraňte `createTranslateProviders('app')` a z constructoru:
```js
        languageService.langChanged$.subscribe(lang => {
                // translateService.resetLang(lang); uncomment if you want to call API everytime
                translateService.use(lang);
            }
        )
```
- Z adresáře odstraňte složku src/assets/i18n

### Použití hlavního slovníku

- Přidejte do `MockApiModule` (v souboru `src/app/app.module.ts`) svá mock data ... více viz. [ng2-f-mock-api](https://github.com/fragaria/ng2-f-mock-api)). Pokud bude struktura a jiná než je od navržené struktury, je nutné změnit v souboru `src/app/language/custom-translate-loader.service.ts` mapovací funkci `.map(data => data[0].data)` a v `src/assets/configs/dev.js` querry string
- Přidejte svá data do adresáře `src/assets/i18n/app/` , do souborů en.js a cs.js

### Použití

```js

import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { LanguageService, createTranslateProviders } from '../language';


@Component({
  selector: 'test-component',
  template: `<h1>{{ itemMsg }}</h1>
             <h1>{{ 'items' | translate }}</h1>
`,
  providers:[createTranslateProviders('item')]
})
export class TestComponent {
  itemMsg:string;

  constructor(languageService: LanguageService,
              translateService:TranslateService) {

    languageService.langChanged$.subscribe(lang => {
      // translateService.resetLang(lang); uncomment if you want to call API everytime
      translateService.use(lang);
    });

    translateService.get('items')
        .merge(translateService.onLangChange) //pridano z duvodu funkce get nereflektuje zmenu jazyka a slovniku
        .mergeMap(() => translateService.get('items'))
        .subscribe( value => this.itemMsg = value );
  }
}
```

- více o použití viz. [ng2-translate](https://github.com/ocombe/ng2-translate)

[zpět na README](../README.md)
