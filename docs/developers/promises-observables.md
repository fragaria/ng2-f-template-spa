## Promises vs Observables

- Došli jsme k závěru, že je dobré používat `Observables` (mají některé vlastnosti. které `Promises` nemají)
- Použití `Promises` se nevylučuje (jen `Observable` jsou preferovanější cesta)
- Na obě dvě varianty se dá použít [async pipe](https://angular.io/docs/ts/latest/api/common/index/AsyncPipe-pipe.html)

### Promise - poznámky

- je to příslib dat, které v budoucnu obdržím
- jsou defaultně v javascriptu (netřeba nic importovat)
- lze řetězit [.then()](http://es6-features.org/#PromiseUsage) funkce

### Observable - poznámky

- je to stream, co dává data (ideální např. pro použití v [našeptávači](https://angular.io/docs/ts/latest/guide/server-communication.html#!#a-wasteful-app))
- má spoustu [operátorů](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) (které dokážou modelovat data ve steamu): [filter](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-filter), [map](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map), [switchMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-switchMap) atd.
- potřebují [rxjs](https://github.com/ReactiveX/RxJS) balíček v dependencies v `package.json`
- je potřeba správně `unsubscribovat`, jinak to může vést k memory leakům (pokud si nejsem jist pak je lepší vždy volat `unsubscribe`) viz. [angular 2 doc](https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service)
- je potřeba správně importovat (jinak se zbytečně načítá hodně nepotřebného js), tedy neimportovat `Observable` z `rxjs/Rx`, je to strašně velké radši si udělat vlastní soubor `rxjs-operators.ts` a tam si naimportovat jen to co potřebuji (operátory a statické metody) a ten soubor naimportovat třeba v app komponentě a pak všude používám jen:

```js
import { Observable } from 'rxjs/Observable'
```

[zpět na README](../../README.md)
