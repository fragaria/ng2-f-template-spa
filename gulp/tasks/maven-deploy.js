'use strict';

/**
 * Credentials are to be set in ~/.m2/settings.xml
 */

var git = require('gulp-git'),
    gulp = require('gulp'),
    maven = require('gulp-maven-deploy');

var configRelease = {
  "groupId": "cz.kb.fast.seed",  // TODO fill app package
  "artifactId": "seed-app-frontend",  // TODO fill app name
  "buildDir": "dist",
  "finalName": "seed-app-frontend-{version}",  // TODO fill app name
  "type": "zip",
  "fileEncoding": "utf-8",
  "repositories": [
    {
      "id": "maven",
      "url": "http://localhost:8081/nexus/repository/maven-releases"  // TODO fill nexus url
    }
  ]
};

var configSnapshot = {
  "groupId": "cz.kb.fast.seed",  // TODO fill app package
  "artifactId": "seed-app-frontend",  // TODO fill app name
  "buildDir": "dist",
  "finalName": "seed-app-frontend-{version}-SNAPSHOT",  // TODO fill app name
  "type": "zip",
  "version": "{version}-SNAPSHOT",
  "fileEncoding": "utf-8",
  "repositories": [
    {
      "id": "maven",
      "url": "http://localhost:8081/nexus/repository/maven-snapshots"  // TODO fill nexus url
    }
  ]
};


gulp.task('maven:deploy:release', function (cb) {
  return gulp.src('dist')
  .pipe(maven.deploy({
    'config': configRelease
  }));
});

gulp.task('maven:deploy:snapshot', function (cb) {
  return gulp.src('dist')
  .pipe(maven.deploy({
    'config': configSnapshot
  }));
});