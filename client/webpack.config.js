var path = require("path");
var webpack = require('webpack');


module.exports = {
    entry: __dirname + '/src/index.jsx',
    output: {
        path: path.resolve(__dirname, "build_target"),
        filename: 'bundle.js'
    },
    devtool: 'source-maps',
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}