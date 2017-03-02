var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = function () {
    return {
        entry: {
            "vendor": "./app/vendor",
            "app": "./app/main"
        },
        output: {
            path: helpers.root('dist'),
            filename: '[name].bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.js', '.json', '.html']
        },
        module: {
            rules: [{
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
                {
                    test: /\.html$/,
                    loader: 'html-loader'

                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'null-loader'
                },
                {
                    test: /\.css$/,
                    exclude: helpers.root('', 'app'),
                    loader: 'null-loader'
                },
                {
                    test: /\.css$/,
                    include: helpers.root('', 'app'),
                    loader: 'raw-loader'
                }
            ]
        },
        devtool: 'inline-source-map'
    };
};