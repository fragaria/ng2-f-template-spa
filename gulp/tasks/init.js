var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var replace = require('gulp-replace');
var pipe = require('gulp-pipe');
var prompt = require('gulp-prompt');

var forReplace = [
  // first elem of item is str for replacement and second is key to projectData
  [ 'ng2-f-template-spa', 'normalizedProjectName' ],
  [ 'Seed template for SPA', 'projectDescription' ],
  [ 'seed-app-frontend', 'normalizedProjectNameWithTail' ],
  [ 'SEED APP', 'upperCasedProjectName' ],
  [ 'seed-app', 'normalizedProjectName' ],
  [ 'seedApp', 'projectNameLowerUpperCase' ],
  [ 'SEED-APP-frontend', 'normalizedProjectNameWithTail' ]
];

var locations = {
  globalDirs: [ '.git' ],
  files: [ 'config/*.js', 'gulp/tasks/*.js', '!gulp/tasks/init.js', 'README.md', 'package.json' ],
};

function normalizeProjectName(name) {
  return name.toLowerCase().replace(" ", "-")
}

function projectNameLowerUpperCase(name) {
  var nameArray = name.split("-")
  return nameArray[0] + nameArray.slice(1).map(upperFirstLetter).join("")
}

function upperFirstLetter(item) {
  return item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()
}

function replaceTemplatePatternsInFiles(projectData) {
  var pipeArray = [];

  for (var item of forReplace) {
    pipeArray.push(replace(item[0], projectData[item[1]]));
  }

  pipeArray.push(gulp.dest(function (file) { return file.base }));

  return pipe(gulp.src(locations.files), pipeArray);
}

function userInputsPostProcess(userInputs) {
  var projectName = userInputs.projectName ? userInputs.projectName : 'ng2 awesome project';
  var projectData = { projectName: projectName, projectDescription: userInputs.projectDescription };

  projectData['normalizedProjectName'] = normalizeProjectName(projectName);
  projectData['upperCasedProjectName'] = projectName.toUpperCase();
  projectData['normalizedProjectNameWithTail'] = normalizeProjectName(projectName) + '-frontend';
  projectData['projectNameLowerUpperCase'] = projectNameLowerUpperCase(normalizeProjectName(projectName));

  // removeGlobalDirs();
  replaceTemplatePatternsInFiles(projectData);
}

gulp.task('init', function() {
  gulp.src(locations.files).pipe(prompt.prompt([{
    type: 'input',
    name: 'projectName',
    message: 'Get project name?'
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Get project description?'
  }], userInputsPostProcess));
});
