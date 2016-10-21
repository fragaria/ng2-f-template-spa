'use strict';

var git = require('gulp-git'),
    gulp = require('gulp'),
    maven = require('gulp-maven-deploy');

function suffixForBranch(branch) {
  return branch != 'master' ? '-' + branch : '';
}

function createMavenDeployFor(branch) {
  var config = {
    "groupId": "cz.kb.seedApp",  // TODO fill app package
    "artifactId": "seed-app-frontend" + suffixForBranch(branch),  // TODO fill app name
    "buildDir": "dist",
    "finalName": "seed-app-frontend" + suffixForBranch(branch),  // TODO fill app name
    "type": "zip",
    "fileEncoding": "utf-8",
    "repositories": [
      {
        "id": "nexus-public",
        "url": "https://kb-fast1.f-app.it/nexus/content/repositories/releases/"
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
