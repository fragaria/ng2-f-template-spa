## Build

### Popis

Build projektu se provádí pomocí nástroje [webpack](https://webpack.github.io/) v jedné z následujících konfigurací:

- vývoj `config/webpack.develop.js`
- produkční prostředí `config/webpack.prod.js`
- testy `config/webpack.test.js`

Společným základem je soubor `config/webpack.common.js`.

To který soubor se použije je dáno volbou commandu, který použijete pro build:

- `npm start` pouští vývojový server a používá [webpack](https://webpack.github.io/) vývojový build (tedy se souborem `config/webpack.develop.js`)
- `npm run build:prod` používá [webpack](https://webpack.github.io/) produkční build (tedy se souborem `config/webpack.prod.js`)
- `npm test` pouští testy a používá [webpack](https://webpack.github.io/) testovací build (tedy se souborem `config/webpack.test.js`)

### Co [webpack](https://webpack.github.io/) dělá během buildu?

#### Vytvoří výsledné `js` soubory

Vytváří tři výsledné `js` bundle soubory (polyfills.bundle.js, vendor.bundle.js a app.bundle.js) z typescript souborů, které jsou v `src` složce a vkládá je do `src/index.html` před uzavírací `</body>` tag. Soubory jsou v `src/index.html` seřazeny, tak jak je uvedeno v `config/webpack.common.js`.

Pokud se provádí produkční build, tak všechny tři soubory obsahují ještě `hash` v názvu souboru (např. app.44db90e0cdb299124f27.bundle.js), který se mění se změnou souboru. Dále jsou minifikované pomocí [uglifyjs pluginu](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) a vytváří se pro ně source mapy.

- `polyfills.bundle.js` obsahuje sesbíraný kód javascript obohacujících knihoven, jako je [core-js](https://github.com/zloirock/core-js) a [zone.js](https://github.com/angular/zone.js) (root z kterého se vychází pro sběr je soubor `src/polyfills.ts`)
- `vendor.bundle.js` obsahuje sesbíraný kód vendor knihoven, jako je [bootstrap-loader](https://github.com/shakacode/bootstrap-loader/tree/v1), [rxjs](https://github.com/ReactiveX/RxJS) atd. (root z kterého se vychází pro sběr je soubor `src/vendor.ts`)
- `app.bundle.js` obsahuje sesbíraný kód aplikace (root z kterého se vychází pro sběr je soubor `src/main.ts`)

#### Vytváří výsledné `css` soubory

Vytváří vásledné css styly a vkládá je do `src/index.html` do `<style type="text/css">` tagu v `<head>` části.

Pokud se provádí produkční build, tak se výsledné css ještě minifikují.

#### Kopíruje složky

Kopíruje složku `src/assets` do výsledné dist složky (tedy bude pak dostupná na url `/assets`). V této složce leží věci jako překlady, obrázky, [konfigurace](./config.md) atd.

[zpět na README](../README.md)
