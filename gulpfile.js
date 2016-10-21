'use strict';

var gulp = require('gulp');
var fs = require('fs');
var utils = require('./gulp/utils');

fs.readdirSync('./gulp/tasks/')
  .filter(utils.onlyScripts)
  .forEach(function (task) {
    require('./gulp/tasks/' + task);
});
