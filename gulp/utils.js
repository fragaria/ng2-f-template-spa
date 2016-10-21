plumber = require('gulp-plumber');
gutil = require('gulp-util');
path = require('path');
fs = require('fs');

// Filters out non .js files. Prevents
// accidental inclusion of possible hidden files
exports.onlyScripts = function (name) {
  return /(\.js$)/i.test(path.extname(name));
};

exports.logChange = function (event) {
  console.log('\n\n' + path.relative('./', event.path) + ' ' + event.type);
};
