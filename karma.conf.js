// Karma configuration
// Generated on Fri Jul 28 2017 11:46:58 GMT+0900 (대한민국 표준시)
const webpack = require("./webpack.config");
module.exports = function(config) {
  config.set({

    basePath: '',

	frameworks: ['mocha', 'chai'],

	files: [
      './test/**/*.spec.js'
	],
	
	client: {
		mocha: {
			opts: "./mocha.opts"
		}
	},

	exclude: [
	],

	preprocessors: {
		"test/**/*.spec.js": ["webpack"],
	},

	webpack: webpack,

	reporters: ['mocha'],

	port: 9876,

	colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome', 'PhantomJS'],

    singleRun: false,

    concurrency: Infinity
  })
}
