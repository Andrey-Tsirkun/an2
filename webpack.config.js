var webpack = require('webpack');
module.exports = {
    entry: './app.ts',
    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    /*plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],*/
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts' },
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.css$/,
                loaders:["style-loader", "css-loader"]
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
}