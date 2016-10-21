/**
 * TODO: Comments
 */
require('core-js/es6');
require('core-js/es7/reflect');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/jasmine-patch');
require('ts-helpers');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/long-stack-trace-zone');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/platform-browser-dynamic/testing');
testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
var testContext = require.context('../src', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);
//# sourceMappingURL=spec-bundle.js.map