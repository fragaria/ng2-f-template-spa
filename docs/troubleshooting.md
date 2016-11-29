## Časté problémy a otázky

### Popis

Tato stránka obsahuje časté problémy a otázky, které vás mohou potkat:

#### Spuštění `npm install` ihned skončí errorem

- ujistěte se, že jste si do souboru `.npmrc` v rootu projektu přidali řádku `registry=https://kb-fast1.f-app.it/nexus/repository/npm-fast-group/`

- pokud používáte proxy, ujistěte se že ji máte přidanou v souboru `.npmrc` v rootu projektu

#### Spuštění `npm start` mi hází problémy s `typings`

- smažte složku `typings` v rootu projektu a spusťte `npm install`

#### Po té co jsem stáhnul nové změny z `gitu` a spustil `npm start`, tak mi aplikace hází chybu do `konzole prohlížeče`

- zkuste spustit `npm install`, možná někdo udělal změnu v nějaké knihovně (nebo přidal novou).

- zkuste se podívat, jestli nepřibyl nový klíč v [konfiguraci](./config.md) `src/assets/configs/dev.js` (pokud ano přidejte si jej i do svého `src/assets/configs/config.js`), popřípadě znovu spusťte `npm run init-conf` a dejte `y` na otázku zda-li chcete konfiguraci přepsat (tím se vaše osobní konfigurace v `src/assets/configs/config.js` přepíše konfigurací v `src/assets/configs/dev.js`).

#### Příkaz `npm run e2e` mi končí s chybou

- ujistěte se, že máte nainstalovanou [javu](https://www.java.com/en/download/)
- ujistěte se, že máte nainstalován prohlížeč [chrome](https://www.google.com/chrome/browser/desktop/index.html)

#### Jak vypnu pro vývoj logování extra objektů do konzole?

- v souboru `src/assets/configs/config.js` nastavte pro klíč `logging.onlyMsgInConsole` hodnotu na `true`

#### Jak úplně vypnu pro vývoj upravené logování do konzole?

- v souboru `src/assets/configs/config.js` nastavte pro klíč `logging.level` hodnotu na `0`

[zpět na README](../README.md)
