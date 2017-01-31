var path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'browser-bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist/')
    }
};
