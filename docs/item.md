## Item

### Popis

Jedná se čistě o ukázkový modul, který obsahuje jednoduchý výpis položek a detail položky. Jsou v něm vidět některé obecné principy, jako routování v modulu, použití služby, která využívá http službu, použití jednoduchého modelu atd.

### Odstranění z projektu

- Odstraňte složku `src/app/item`
- Ze souboru `src/app/app.module.ts` odstraňte import `import { ItemModule } from './item';` a řádek `ItemModule` z pole `imports` (v dekorátoru `@NgModule` třídy `AppModule`)
- Ze všech `js` souborů, co jsou ve složce `src/assets/configs` odstraňte řádek s klíčem `item.apiUrl`

[zpět na README](../README.md)
