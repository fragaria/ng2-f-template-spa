## Shared

### Popis

Jedná se o modul, který obsahuje [komponenty](https://angular.io/docs/ts/latest/guide/architecture.html#!#components) a [služby](https://angular.io/docs/ts/latest/guide/architecture.html#!#services), které jsou v jediné instanci pro celou aplikaci.

### Co obsahuje

- `HomeComponent` jedná se o jednoduchou [komponentu]((https://angular.io/docs/ts/latest/guide/architecture.html#!#components)), která se načte pro root url projektu.
- `PageNotFoundComponent` jedná se o jednoduchou [komponentu]((https://angular.io/docs/ts/latest/guide/architecture.html#!#components)), která se načte pro nenalezenou routu.
- `HttpBaseService` jedná se o návrh jednoduché [služby](https://angular.io/docs/ts/latest/guide/architecture.html#!#services), která obaluje standartní [Http službu](https://angular.io/docs/ts/latest/api/http/index/Http-class.html)  a rozšiřuje jí o defaultní logování chyb během zpracování požadavku.
- `HttpRestJsonService` jedná se o návrh jednoduché [služby](https://angular.io/docs/ts/latest/guide/architecture.html#!#services), která obaluje `HttpBaseService` a provádí defaultní zpracování požadavku (jako převodu `json` obpovědi na cílové objekt/objekty), příklad použití je vidět ve službě `ItemService` (soubor `src/app/item/item.service.ts`) v modulu [item](./item.md).

[zpět na README](../README.md)
