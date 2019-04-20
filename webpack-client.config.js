const webpack = require('webpack');

module.exports = {
	entry: ['webpack-hot-middleware/client', './src/client/index.jsx'],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/build',
		publicPath: '/'
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.js', '.json'],
	},
	mode: 'development',
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.jsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015','react'],
							cacheDirectory: true,
							plugins: ['react-hot-loader/babel']
						}
					}
				]
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{
				test: /\.css$/,
				use: [
					'style-loader', // creates style nodes from JS strings
					'css-loader', // translates CSS into CommonJS
				]
			},
			{
				test: /\.(pdf|jpg|png|gif|svg|ico)$/,
				use: [
					{
						loader: 'url-loader'
					}
				]
			}
		]
	},
	node: {
		fs: 'empty'
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};