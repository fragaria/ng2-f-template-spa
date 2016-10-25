## SEED APP - frontend

### Příprava projektu
- Udělejte si `git clone` této repozitory a přesuňte se do adresáře projektu
- Ujistěte se, že máte nainstalován [node.js](https://nodejs.org/)
- Spusťte `npm install -g webpack webpack-dev-server typings typescript` pro instalaci globálních závislostí
- Spusťte `npm install -g karma-cli protractor` pro instalaci globálních testovacích závislostí
- Přidejte si do souboru `.npmrc` v projektu řádku `registry=https://kb-fast1.f-app.it/nexus/repository/npm-fast-group/`
- Spusťte `npm install` pro instalaci závislostí pro běh aplikace
- Spusťte `npm start` pro naběhnutí aplikace v DEV režimu
- Otevřete prohlížeč na [`http://localhost:8080`](http://localhost:8080)
- Spusťte `./node_modules/.bin/gulp init` z rootu projektu a zadávejte údaje dle pokynů

### Tasky (build a běh aplikace)
- `npm start` - spuštění aplikace v DEV režimu
- `npm test` - spuštění testů a coverage analýzy
- `npm run build:prod` - pro přípravu souborů pro produkční nasazení
- `npm run docs`

### Tasky (validace)
- `./node_modules/.bin/gulp sonar` pro spuštění analýzy souborů na chyby

### Tasky (release)
- `./node_modules/.bin/gulp bump [--major⎮--minor⎮--patch]` - pro zvednutí verze projektu při verzování major.minor.patch, default patch
- `./node_modules/.bin/gulp bump-push-[develop|master]` - pro otagování stávající verze a pushunutí inkrementu verze pro další vývoj do git repozitory
- `./node_modules/.bin/gulp maven:deploy:[develop|master]` pro výrobu balíku z větve a nahrání do maven repozitory

### Důležité adresáře a soubory
- `config/` - nastavení konfigurace buildu pro různé prostředí
- `dist/` - distribuovatelné aplikační zdroje
- `gulp/` - tasky nástroje gulp
- `node_modules/` - lokální repozitory aplikačních a vývojových modulů
- `reports/` - generované reporty z testů a sonar validací
  - `coverage/html/` - html stránky s vizualizací pokrytí kódu testy
- `src/` - zdrojové soubory aplikace
  - `app/` - aplikační kód
  - `assets/` - doplňující zdroje jako css, i18n, obrázky
  - `index.html` - vstupní stránka aplikace
  - `main.ts` - vstupní bod aplikace
- `typings/` - typescript definice
- `package.json` - konfigurace metadat projektu, skriptů a závislostí
- `tslint.json` - konfigurace validací prováděných nad typescript soubory
