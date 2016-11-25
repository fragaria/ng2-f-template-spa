## Init

### Popis

Jedná se o pžíkaz, který připraví z této šablony nový čistý projekt. Pokud při spuštění zadáte, že chcete smazat `.git` složku, tak vám pak stačí dát `git init .` a můžete začít pracovat na vašem novém projektu.

### Použití

Spusťte `npm run init` z rootu projektu. Příkaz se vás zeptá na pár věcí:

- `jméno projektu` zadejte jméno projektu (např. ng2 clients). Jméno bude použito na různých místech, např. v `package.json`, `README`, `webpack` konfiguračních souborech atd.
- `popis projektu` zadejte popis projektu, bude použit v `package.json` v políčku `description`
- `url root pro produkci` zadejte url root, na kterém projekt poběží (ve tvaru `/xyz/`, např. /demo/), nezadáte-li nic pak bude použito `/`
- `zda chcete smazat .git složku` stisknete-li `enter` nebo zadáte-li `n` nebo `no`, tak `.git` složka nebude smazána, jinak bude odstraněna (zadat nesmazání složky se hodí v podstatě jen pro případ, že se chcete podívat pomocí `git diff`, co vše příkaz nahradil, pak můžete složku smazat ručne)

Potom se provede náhrada `seed` značek za vámi zadaná data (a případně se smaže `.git`), také vám bude v `package.json` nastavena verze projektu na `0.0.0-SNAPSHOT`.

### Co vše je nahrazeno za seed značky

Seed značky jsou nahrazeny za vámi zadaná data (popřípadě normalizované tvary vašich dat) při spuštění příkazu

- v souboru `README.md` je nahrazeno jméno projektu
- v souboru `package.json` je nahrazeno jméno projektu, popis projektu a git url repozitáře, verze je nastavena na 0.0.0-SNAPSHOT
- v souboru `src/index.html` je nahrazen html značka, do které se aplikace načte
- v souboru `src/app/app.component.ts` je nahrazen `selector` pro `AppComponent`
- v souboru `config/karma.conf.js` je nahrazeno jméno `suite` pro testy postavené na [karma](https://karma-runner.github.io/1.0/index.html)
- v souboru `config/webpack.common.js` je nahrazen titulek aplikace požívaný [webpackem](https://webpack.github.io/) pro [build](./build.md) projektu
- v souboru `config/webpack.prod.js` je nahrazena `baseUrl` požívaná pro base html tag v souboru `src/index.html`
- v souboru `gulp/task/bump.js` je nahrazen prefix pro commit message při zvedání verze
- v souboru `gulp/tasks/sonar.js` je nahrazen `projectName` a `projectKey` pro [sonar](http://www.sonarqube.org/) analýzu
- v souboru `gulp/tasks/maven-deploy.js` je nahrazen `artifactId` a `finalName` v konfiguraci pro buildy pomocí [maven](https://maven.apache.org/)

### Opětovné spuštění

Pokud spustíte příkaz `npm run init` znovu, tak skončí s hláškou, že už byl jednou spuštěn.


[zpět na README](../README.md)
