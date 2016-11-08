/*************************************************************************
 *  Copyright © Komercni banka, a.s.
 *  All Rights Reserved.
 *
 * NOTICE:  All rights to the information contained herein is, and remains exclusive property of Komercni banka, a.s.
 * The intellectual and technical concepts and other essentials contained herein are proprietary to Komercni banka, a.s. and are covered and are protected by trade secret and/or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden, unless prior written permission is obtained from Komercni banka, a.s.
 */

gulp = require('gulp');
protractor = require('gulp-protractor').protractor;
utils = require('gulp-util');

gulp.task('protractor', function () {
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