# 0003. Use Webpack for application build

Date: 11.1.2017

## Status

Accepted

## Context

AngularJS 2.x uses [CommonJS pattern](http://requirejs.org/docs/commonjs.html) for defining application modules. Thus building/bundling an application is little more complicated than just concatenating all `*.js` files.
All `require` and `import` statements must be evaluated during build time to create a dependency tree. This is something that only **bundlers** as Webpack or Browserify can do. **Task runners** such as Grunt or Gulp are not able to do this.

## Decision

Use [Webpack](https://webpack.js.org) to create application bundle. Use [Gulp](http://gulpjs.com) for non-build related tasks - create Jenkins configuration, upload to Sonar etc.

## Consequences

All build tasks use Webpack to create an application bundle. Some tasks (maven publish, protractor tests) use gulp because those exceed Webpack scope.
All tasks (webpack and gulp) are defined in `package.json` and can be run using `npm` - mainly to avoid developer confusion whether particular task is defined in gulp or webpack.
We try to move as much tasks as possible from gulp to webpack.
