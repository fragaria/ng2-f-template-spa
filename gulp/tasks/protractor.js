var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var path = require('path');
var child_process = require('child_process');

gulp.task('protractor', ['init-conf'], function () {
  return gulp.src('some/nonexisting/file', {read: false})
  .pipe(protractor({
    configFile: 'config/protractor.conf.js',
    debug: false
  }))
  .on('end', function () {
    process.exit(0);
  })
  .on('error', function (e) {
    console.log(e);
  });
});
