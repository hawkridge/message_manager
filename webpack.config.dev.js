const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.common');
const path = require('path');

module.exports = merge(webpackConfig, {
	
	output: {
		filename: '[name].js',
		publicPath: '/'
	},
	
	devtool: 'eval',
	
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		compress: true,
		port: 9000,
		proxy: [{
			context: ['/api'],
			target: 'http://localhost:5000',
		}]
	}
	
});
