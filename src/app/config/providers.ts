import { APP_INITIALIZER } from '@angular/core';

import { Config } from './config.service';

export var CONFIG_PROVIDERS = [
  Config,
  {
    provide: APP_INITIALIZER,
    useFactory: (config: Config) => () => config.load(),
    deps: [Config],
    multi: true
  }
];
