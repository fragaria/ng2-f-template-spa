'use strict';

var COMMIT_PREFIX = 'SEED APP';  // TODO fill app short name

var gulp = require('gulp'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    tag_version = require('gulp-tag-version'),
    argv = require('yargs')
      .usage('gulp bump [--minor|--major]')
      .boolean(['patch', 'minor', 'major'])
      .describe('patch', 'Increment patch version number (default)')
      .describe('minor', 'Increment minor version number')
      .describe('major', 'Increment major version number')
      .default('patch', true)
      .default('minor', false)
      .default('major', false)
      .check(function (argv, arga) {
        if (argv._.length > 1 || (argv.minor && argv.major)) {
          throw 'Too many arguments';
        }
        return true;
      })
      .strict()
      .help('help')
      .argv;

function inc(importance, cb) {
  return gulp.src(['./package.json'])
    .pipe(tag_version())
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit(COMMIT_PREFIX + ' - Aktualizace ' + importance + ' čísla verze'), function (err) {
      cb(err);
  });
}

function push(branch) {
  return git.push('origin', branch, {args: '--tags'}, function (err) {
    if (err) throw err;
  });
}

gulp.task('bump-push-master', ['bump'], function () {
  return push('master');
});

gulp.task('bump-push-develop', ['bump'], function () {
  return push('develop');
});
gulp.task('bump', function (cb) {
  var importance = 'patch';
  if (argv.minor) {
    importance = 'minor';
  } else if (argv.major) {
    importance = 'major';
  }
  return inc(importance, cb);
});
