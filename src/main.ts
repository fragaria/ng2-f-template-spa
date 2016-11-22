import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

//presunuto z app.module z duvodu unit testu
if ('prod' === ENV) {
  // Production
  enableProdMode(); // enable angular production mode in production

} else {
  // Development
  require('raw!./index.html');  // watch for changes in index.html in development mode
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
