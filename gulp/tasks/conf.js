var fs = require('fs-extra');
var fileExists = require('file-exists');
var gulp = require('gulp');
var path = require('path');
var prompt = require('gulp-prompt');

var locations = {
  inputFile: 'src/assets/configs/dev.js',
  outputFile: 'src/assets/configs/config.js',
};

function userChoice(userInputs) {
  if (userInputs.ans && !(userInputs.ans in {'n': 0, 'no': 0}) ) {
    fs.copySync(locations.inputFile, locations.outputFile);
    console.log('Config "' + locations.outputFile + '" was replaced by "' + locations.inputFile + '"');
  } else {
    console.log('Config "' + locations.outputFile + '" was not replaced');
  }
}

gulp.task('init-conf', function() {

  if (fileExists(locations.inputFile)) {
    if (!fileExists(locations.outputFile)) {
      fs.copySync(locations.inputFile, locations.outputFile);
      console.log('Config created in "' + locations.outputFile + '"');
    } else {
      gulp.src(locations.inputFile).pipe(prompt.prompt([{
        type: 'input',
        name: 'ans',
        message: 'File "' + locations.outputFile + '" was not created because it already exists. Do you want replace it?'
      }], userChoice));
    }
  } else {
    console.error('Can\'t create file "' + locations.outputFile + '" because of source file "' + locations.inputFile + '" does not exist.');
  }
});
