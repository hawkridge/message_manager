const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.common');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(webpackConfig, {
	
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkHash].js'
	},
	
	plugins: [
		new CleanWebpackPlugin()
	],
	
	devtool: false
});

