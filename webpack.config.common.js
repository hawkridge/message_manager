const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirSrc = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'src', 'assets');


module.exports = {
	entry: './src/index.js',
	
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	
	resolve: {
		modules: [
			dirNode,
			dirSrc,
			dirAssets
		]
	},
	
	mode: 'none',
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader'
				}
			},
			
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'images/'
					}
				}
			},
			
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'fonts/'
					}
				}
			}
		]
	},
	
	plugins: [
		new webpack.DefinePlugin({
			IS_DEV: IS_DEV
		}),
		
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html')
		}),
		
		new MiniCssExtractPlugin({
			filename: IS_DEV ? '[name].css' : '[name].[contenthash].css',
			chunkFilename: IS_DEV ? '[id].css' : '[id].[contenthash].css',
		})
	]
};
