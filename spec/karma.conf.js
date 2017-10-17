module.exports = function (config) {

	config.set({
		basePath: '../',
		plugins: [
			'karma-mocha',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-safari-launcher',
			'karma-firefox-launcher',
		],

		// frameworks to use
		frameworks: ['mocha'],

		// list of files / patterns to load in the browser
		files: [
			"dist/popo.js",
			"node_modules/expect.js/index.js",
			"node_modules/sinon/pkg/sinon.js",
			"spec/suites/**/*.js",
		],
		proxies: {
		},
		exclude: [],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots'],

		// web server port
		port: 9876,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_WARN,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJSCustom'],

		customLaunchers: {
			'PhantomJSCustom': {
				base: 'PhantomJS',
				flags: ['--load-images=true'],
				options: {
					onCallback: function (data) {
						if (data.render) {
							page.render(data.render);
						}
					}
				}
			}
		},

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 5000,

		// Workaround for PhantomJS random DISCONNECTED error
		browserDisconnectTimeout: 10000, // default 2000
		browserDisconnectTolerance: 1, // default 0

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
