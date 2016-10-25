'use strict';

/**
 * Credentials are to be set in ~/.m2/settings.xml
 */

var git = require('gulp-git'),
    gulp = require('gulp'),
    maven = require('gulp-maven-deploy');

function suffixForBranch(branch) {
  return branch != 'master' ? '-' + branch : '';
}

function createMavenDeployFor(branch) {
  var config = {
    "groupId": "cz.kb.fast.seed",  // TODO fill app package
    "artifactId": "seed-app-frontend" + suffixForBranch(branch),  // TODO fill app name
    "buildDir": "dist",
    "finalName": "seed-app-frontend" + suffixForBranch(branch),  // TODO fill app name
    "type": "zip",
    "fileEncoding": "utf-8",
    "repositories": [
      {
        "id": "maven",
        "url": "http://localhost:8081/nexus/repository/maven-releases"
      }
    ]
  };

  gulp.task('maven:deploy:' + branch, function () {
    return gulp.src('dist')
    .pipe(maven.deploy({
      'config': config
    }))
  });
}

createMavenDeployFor('develop');
createMavenDeployFor('master');
