var gulp = require('gulp'),
    shell = require('gulp-shell');

gulp.task('proxyon', shell.task([
  'git config --global http.proxy http://localhost:3128',
  'git config --global https.proxy http://localhost:3128',
  'npm config set proxy http://localhost:3128'
]));

gulp.task('proxyoff', shell.task([
  'git config --global --unset http.proxy',
  'git config --global --unset https.proxy',
  'npm config rm proxy'
]));
