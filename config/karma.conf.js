const helpers = require('./helpers');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine', 'source-map-support'],

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.ts
     */
    files: ['./src/assets/configs/test.js', './config/spec-bundle.ts'],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      './config/spec-bundle.ts': ['webpack'],
      './src/**/*.spec.ts': ['webpack'],
      './src/**/*.component.ts': ['webpack', 'sourcemap', 'coverage'],
      './src/**/*.pipe.ts': ['webpack', 'sourcemap', 'coverage'],
      './src/**/*.service.ts': ['webpack', 'sourcemap', 'coverage'],
    },

    // Webpack Config at ./webpack.test.js
    webpack: require('./webpack.test'),

    // Webpack please don't spam the console when running in karma!
    webpackServer: {noInfo: true},

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['junit', 'progress', 'coverage', 'karma-remap-istanbul'],

    /**
     * Simple summary (printed to the console) and JSON file which we will remap back to TypeScript.
     */
    coverageReporter: {
      dir: 'reports',
      reporters: [
        {type: 'text-summary'},
        {
          type: 'json',
          subdir: 'coverage',
          file: 'coverage-final.json'
        }
      ]
    },

    /**
     * Map code coverage result back to TypeScript using `karma-remap-istanbul`.
     */
    remapIstanbulReporter: {
      src: 'reports/coverage/coverage-final.json',
      reports: {
        lcovonly: 'reports/coverage/lcov.info',
        html: 'reports/coverage/html'
      },
      timeoutNotCreated: 5000,
      timeoutNoMoreFiles: 1000
    },

    junitReporter: {
      outputDir: './reports/junit',
      outputFile: 'test-results.xml',
      suite: 'seed-app',  // TODO fill app name
      useBrowserName: false
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: ['PhantomJS'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  });
};
