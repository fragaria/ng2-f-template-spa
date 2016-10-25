'use strict';

var gulp = require('gulp'),
    path = require('path'),
    SonarWebReporters = require("sonar-web-frontend-reporters"),
    SonarWebDuplication = require("sonar-web-frontend-duplication"),
    projectName = 'SEED-APP-frontend',  // TODO fill app name
    projectKey = 'SEED-APP-frontend';  // TODO fill app name

/**
 * Linting
 */
gulp.task('lint', function () {
  return SonarWebReporters.launchReporters({
    project: projectName,
    scss: false,
    css: false,
    eslint: false,
    js: false,
//        scss : {
//          src : "src/**/*.scss",
//          report : "reports/sonar/scsslint.json",
//          rulesFile : "sonar/.scsslintrc",
//          task : "ci-scsslint"
//        },
    html: {
      src: "src/**/*.html",
      language: 'html',
      report: "reports/sonar/htmlhint.json",
      rulesFile: ".htmlhintrc",
      task: "ci-htmlhint"
    },
    ts: {
      src: "src/**/*.ts",
      language: 'ts',
      report: "reports/sonar/tslint.json",
      rulesFile: "tslint.json",
      task: "ci-tslint"
    },
  });
});

/**
 * Duplication
 */
gulp.task('duplication', function () {
  return SonarWebDuplication.launchReporters({
    project: projectName,
    scss: {
      src: 'src/**/*.scss',
      report: 'reports/sonar/scss-duplication.xml',
      task: "ci-scssduplication"
    },
    html: {
      src: 'src/**/*.html',
      report: 'reports/sonar/html-duplication.xml',
      task: "ci-htmlduplication"
    }
  });
});

var sonar = require('gulp-sonar'),
    util = require('gulp-util'),
    fs = require('fs-extra');

gulp.task('sonar:upload', ['sonar:analyze'], function () {

  var json = JSON.parse(fs.readFileSync('package.json'));

  var options = {
    sonar: {
      login: process.env.SONAR_LOGIN,
      password: process.env.SONAR_PASSWORD,
      host: {
        url: 'https://kb-fast1.f-app.it/sonar'//TODO: add real url
      },
      log: {
        level: 'DEBUG'
      },
      projectKey: projectKey,
      projectName: projectName,
      projectVersion: json.version,
      branch: process.env.BRANCH,
      sources: 'src',
      sourceEncoding: 'UTF-8',
//            exclusions: 'node_modules/**/*, ../node_modules/**/*, ../reports/**/*',
      sii: {
        coverage: {
          ut: {
            js: {
              report: {
                path: 'reports/coverage/lcov.info'
              }
            }
          }
        },
        test: {
          unit: {
            js: {
              report: {
                path: 'reports/junit/test-results.xml'
              }
            }
          }
        },
        // issues reports
        quality: {
          html: {
            report: {
              path: 'reports/sonar/htmlhint.json'
            }
          },
//                    scss: {
//                        report: {
//                            path: 'reports/sonar/scsslint.json'
//                        }
//                    },
          ts: {
            report: {
              path: 'reports/sonar/tslint.json'
            }
          }
        },
        // code duplication
        duplication: {
          html: {
            report: {
              path: 'reports/sonar/html-duplication.xml'
            }
          },
          scss: {
            report: {
              path: 'reports/sonar/scss-duplication.xml'
            }
          }
        }
      },
      exec: {
        // All these properties will be send to the child_process.exec method (see: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback )
        // Increase the amount of data allowed on stdout or stderr (if this value is exceeded then the child process is killed, and the gulp-sonar will fail).
        maxBuffer: 1024 * 1024
      }
    }
  };

  // gulp source doesn't matter, all files are referenced in options object above
  return gulp.src('thisFileDoesNotExist.js', {read: false})
  .pipe(sonar(options))
  .on('error', util.log);
});

gulp.task('sonar:analyze', [
  'lint',
  'duplication'
]);

gulp.task('sonar', [
  'sonar:analyze',
  'sonar:upload'
]);
