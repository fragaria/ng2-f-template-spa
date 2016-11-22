var gulp = require('gulp');
var jenkins = require('gulp-jenkins');

/**
 * Creates a job (frontend-master-build) in `APP_FOLDER` folder in jenkins.
 */

var APP_FOLDER = 'APP'; // TODO fill app name
var GIT_ENDPOINT = 'https://github.com/fragaria/ng2-f-client-models.git'; // TODO fill git endpoint
var OPTIONS = {
  username: 'cmelak', // TODO fill credentials
  password: 'fastFURY',
  url: 'localhost:8090/jenkins' + '/job/' + APP_FOLDER,
  headers: {
    'crumb': 'ecfea09ec02110483b1ea110e86a18d9'  // CRUMB=$(curl -L -s -u $LOGIN:$PASSWORD $BASE_URL/crumbIssuer/api/xml | sed -n 's/.*<crumb>\(.*\)<\/crumb>.*/\1/p')
  }
};
jenkins.init(OPTIONS);

gulp.task('jenkins', function () {
  var replaceAttributes = function (config) {
    return config.replace('--git endpoint--', GIT_ENDPOINT);
  };

  // create jenkins folder
  jenkins.create_folder(APP_FOLDER, function (error, data) {
    if (error) {
      console.log('ERROR: ' + error + ':' + data);
      return;
    }
    console.log(data);
  });

  var testFolder = 'jenkins/';
  fs.readdir(testFolder, function (err, files) {
    files.forEach(function (file) {
      if (file.endsWith('.xml')) {
        var jobName = file.substr(-4);
        var fileContent = fs.readFileSync(file, "utf8");
        jenkins.create_job(jobName, replaceAttributes(fileContent), function (error, data) {
          if (error) {
            console.log('ERROR: ' + error + ':' + data);
            return;
          }
          console.log(data);
        });
      }
    });
  });
});
