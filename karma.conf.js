// Karma configuration
// Generated on Thu Oct 20 2016 12:05:57 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],

    browserify: {
      debug: true,
      transform: [ ['babelify', {presets: ['es2015']} ] ]
    },

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['browserify']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['jasmine-diff', 'mocha'],



    jasmineDiffReporter: {
      pretty: true,       // 2 spaces by default for one indent level
      // pretty: "   "    // string - string to be used for one indent level
      // pretty: 4        // number - number of spaces for one indent level

      matchers: {
        toEqual: {
          pretty: true   // disable pretty print for toEqual
        },

        toHaveBeenCalledWith: {
          pretty: "___"   // use 3 underscores for one indent level
        }
      }
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
