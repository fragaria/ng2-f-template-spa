var gulp = require('gulp');
var jenkins = require('gulp-jenkins');

/**
 * Creates jobs in `APP_FOLDER` folder in jenkins.
 */

var APP_FOLDER = 'APP'; // TODO fill app name
var GIT_ENDPOINT = 'https://github.com/fragaria/ng2-f-client-models.git'; // TODO fill git endpoint
var OPTIONS = {
  username: 'cmelak', // TODO fill credentials
  password: 'fastFURY',
  url: 'localhost:8090/jenkins',
  headers: {
    'crumb': 'ecfea09ec02110483b1ea110e86a18d9'  // CRUMB=$(curl -L -s -u $LOGIN:$PASSWORD $BASE_URL/crumbIssuer/api/xml | sed -n 's/.*<crumb>\(.*\)<\/crumb>.*/\1/p')
  }
};

gulp.task('jenkins', ['jenkins:folder', 'jenkins:jobs']);

gulp.task('jenkins:folder', function (cb) {
  // create jenkins folder
  jenkins.init(OPTIONS);
  jenkins.create_folder(APP_FOLDER, function (error, data) {
    if (error && data && data.headers['x-error'] === 'A job already exists with the name ?' + APP_FOLDER + '?') {
      console.log('Folder already exists');
    } else if (error && data && [200, 302].indexOf(data.statusCode) == -1) {
      console.log('ERROR: ' + error + ':' + JSON.stringify(data));
    }
    cb();
  });
});

gulp.task('jenkins:jobs', ['jenkins:folder'], function () {
  var replaceAttributes = function (config) {
    return config.replace('--git endpoint--', GIT_ENDPOINT);
  };

  // create jobs in folder
  OPTIONS.url = OPTIONS.url + '/job/' + APP_FOLDER;
  jenkins.init(OPTIONS);
  var testFolder = 'jenkins/';
  fs.readdir(testFolder, function (err, files) {
    files.forEach(function (file) {
      if (file.endsWith('.xml')) {
        var jobName = file.substr(0, file.length - 4);
        var fileContent = fs.readFileSync(testFolder + file, "utf8");
        jenkins.job_info(jobName, function(error, data) {
          var exists = !error;
          if (exists) {
            console.log('Job ' + jobName + ' exists, overwriting...');
            jenkins.update_job(jobName, replaceAttributes(fileContent), function (error, data) {
              if (error) {
                console.log('ERROR: ' + error + ':' + JSON.stringify(data));
                return;
              }
              console.log('Overwritten.');
            });
          } else {
            console.log('Creating job ' + jobName + '...');
            jenkins.create_job(jobName, replaceAttributes(fileContent), function (error, data) {
              if (error) {
                console.log('ERROR: ' + error + ':' + JSON.stringify(data));
                return;
              }
              console.log('Created.');
            });
          }
        });
      }
    });
  });
});
