var fs = require('fs-extra');
var fileExists = require('file-exists');
var gulp = require('gulp');
var path = require('path');

gulp.task('init-conf', function() {
  var inputFile = 'src/assets/configs/devel.js';
  var outputFile = 'src/assets/configs/env.js';

  if (fileExists(inputFile)) {
    if (!fileExists(outputFile)) {
      fs.copySync(inputFile, outputFile);
      console.log('Config created in "' + outputFile + '"');
    } else {
      console.log('File "' + outputFile + '" was not created because of already exists');
    }
  } else {
    console.error('Can create file "' + outputFile + '" because of source file "' + inputFile + '" does not exists');
  }
});
