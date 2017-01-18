# 0002. Use Observables instead of Promises

Date: 11.1.2017

## Status

Accepted

## Context

Angular2 still supports [Promises](http://exploringjs.com/es6/ch_promises.html) but favors using  [Observables](http://reactivex.io/documentation/observable.html) with RxJS library.
Observable API has several advantages over promises:
* can handle more than one event
* is cancelable
* doesn't start operation until there is a event listener ([Cold Observables](https://angular-2-training-book.rangle.io/handout/observables/cold_vs_hot_observables.html))
* provides operators, such as `map`, `forEach` or even `retry` and `replay`
* can be converted to Promise

## Decision

Use Observables instead of Promises where possible.

## Consequences

Observables must be [correctly unsubscribed](https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service) to avoid memory leaks.
If there is a need to use Promises API, it's possible to [convert Observables to Promises](https://angular.io/docs/ts/latest/guide/server-communication.html#!#promises).
