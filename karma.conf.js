// Karma configuration
'use strict';

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'chai'],
        logLevel: config.LOG_INFO,
        preprocessors: {
            'src/**/!(*.spec).js': ['coverage'],
        },
        reporters: ['mocha', 'coverage'],
        colors: true,
        browsers: ['PhantomJS'],
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true,
            exitOnResourceSuccess: true
        },
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/*',
            'src/*/**'
        ]
    });
};
