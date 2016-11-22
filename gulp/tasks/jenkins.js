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
  var modifyConfig = function (config) {
    // function which takes the config.xml, and returns
    // the new config xml for the new job
    return config.replace('--git endpoint--', GIT_ENDPOINT);
  };

  var fileContent = fs.readFileSync("jenkins/frontend-master-build.xml", "utf8");
  jenkins.create_job('frontend-master-build', modifyConfig(fileContent), function (error, data) {
    if (error) {
      console.log(error + ':' + data);
      return;
    }
    console.log(data);
  });
});
