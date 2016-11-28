## SEED APP - frontend

### Prerekvizity
- [GIT](https://git-scm.com/download/) - [testovaná verze 2.10.2](https://github.com/git-for-windows/git/releases/download/v2.10.2.windows.1/Git-2.10.2-32-bit.exe)
- [NODE](https://nodejs.org/en/download/) - [testovaná verze 6.9.1](https://nodejs.org/dist/v6.9.1/node-v6.9.1-x86.msi)

### Příprava projektu
- Udělejte si `git clone` této repozitory a přesuňte se do adresáře projektu
- Ujistěte se, že máte nainstalován [node.js](https://nodejs.org/) (`node --version`)
- Spusťte `npm install -g webpack webpack-dev-server typings typescript` pro instalaci globálních závislostí
- Spusťte `npm install -g karma-cli protractor` pro instalaci globálních testovacích závislostí
- Přidejte si do souboru `.npmrc` v projektu řádku `registry=https://kb-fast1.f-app.it/nexus/repository/npm-fast-group/` _(pozor, nikoliv .npmrc.txt)_
- Spusťte `npm install` pro instalaci závislostí pro běh aplikace
- Spusťte `npm run init-conf` pro vytvoření devel konfigurace projektu (více viz [config module](docs/config.md))
- Pokud chcete z tohoto seed projektu vytvořit nový projekt, pak spusťte `npm run init` z rootu projektu a zadávejte údaje dle pokynů (více viz. [init](docs/init.md))
- Spusťte `npm start` pro naběhnutí aplikace v DEV režimu
- Otevřete prohlížeč na [`http://localhost:8080`](http://localhost:8080)

### Tasky (build a běh aplikace)
- `npm start` - spuštění aplikace v DEV režimu
- `npm test` - spuštění testů a coverage analýzy
- `npm run e2e` - spuštění e2e testů (vyžaduje Javu a Chrome)
- `npm run build:prod` - pro přípravu souborů pro produkční nasazení
- `npm run docs`

### Tasky (CI)
- `npm run jenkins` vytvoří joby v Jenkinsu (více viz [jenkins](docs/jenkins.md))

### Tasky (validace)
- `npm run sonar` pro spuštění analýzy souborů na chyby

### Tasky (release)
- `npm run bump [--major⎮--minor⎮--patch]` - pro zvednutí verze projektu při verzování major.minor.patch, default patch
- `npm run gulp bump-push-[develop|master]` - pro otagování stávající verze a pushunutí inkrementu verze pro další vývoj do git repozitory
- `npm run gulp maven:deploy:[develop|master]` pro výrobu balíku z větve a nahrání do maven repozitory

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
- `.bootstraprc` - konfigurace Bootstrapu a načítáni scss
- `package.json` - konfigurace metadat projektu, skriptů a závislostí
- `tslint.json` - konfigurace validací prováděných nad typescript soubory

### [Časté problémy a otázky](docs/troubleshooting.md)

### Procesy

- [build](docs/build.md)

### Moduly, které projekt obsahuje

- [config](docs/config.md)
- [logging](docs/logging.md)
- [mock api](docs/mock-api.md)
- [lokalizace](docs/ng2-translate.md)
- [item](docs/item.md)
- [core](docs/core.md)
- [shared](docs/shared.md)

### Poznámky pro vývojáře

- [Promises vs Observables](docs/developers/promises-observables.md)
