const path = require('path');
const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
                'src': path.join(__dirname, 'src'),
            }
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 6
            })
        ]
    },
    css: {
        sourceMap: process.env.NODE_ENV !== 'production'
    },
	lintOnSave: false
};
