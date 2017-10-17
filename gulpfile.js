var gulp = require('gulp');
var path = require('path')

gulp.task('test', function () {
    var karma = require('karma').Server,
        testConfig = { 
            configFile: path.join(__dirname, './spec/karma.conf.js'), 
            singleRun: true 
        };

    testConfig.browsers = ['PhantomJSCustom'];

    function isArgv(optName) {
        return process.argv.indexOf(optName) !== -1;
    }

    if (isArgv('--chrome')) {
        testConfig.browsers.push('Chrome');
    }
    if (isArgv('--safari')) {
        testConfig.browsers.push('Safari');
    }
    if (isArgv('--ff')) {
        testConfig.browsers.push('Firefox');
    }
    if (isArgv('--ie')) {
        testConfig.browsers.push('IE');
    }

    console.log('Running tests...');

    new karma(testConfig, function (exitCode) {
        if (!exitCode) {
            console.log('\tTests ran successfully.\n');
        } else {
            process.exit(exitCode);
        }
    }).start();
});
