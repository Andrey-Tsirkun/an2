var webpackConfig = require('./app/config/webpack.test');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
        ],
        files: [{
            pattern: './test/main',
            watched: false
        }],
        exclude: [],
        preprocessors: {
            './test/main': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig({
            env: 'test'
        }),
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        concurrency: Infinity
    })
}