'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('NODE_ENV:', process.env.NODE_ENV);

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test');
    break;
  case 'dev':
  case 'develop':
  case 'development':
  default:
    module.exports = require('./config/webpack.develop');
}
