var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var path = require('path');
var child_process = require('child_process');

function getProtractorBinary(binaryName){
    var winExt = /^win/.test(process.platform)? '.cmd' : '';
    var pkgPath = require.resolve('protractor');
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
    return path.join(protractorDir, '/'+binaryName+winExt);
}

gulp.task('protractor', ['webdriver-install'], function () {
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
    process.exit(1);
  });
});

gulp.task('webdriver-install', function(done){
    child_process.spawn(getProtractorBinary('webdriver-manager'), ['update'], {
        stdio: 'inherit'
    }).once('close', done);
});