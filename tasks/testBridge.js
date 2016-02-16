/*
 * grunt-test-bridge
 * https://github.com/sebastianhaas/grunt-test-bridge
 *
 * Copyright (c) 2016 Sebastian Haas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var testBridge = require('test-bridge');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('testBridge', 'A grunt plugin for test-bridge.', function() {

    // Merge options with defaults
    var options = this.options({logLevel: 'WARN'});

    // Set log level
    testBridge.setLogLevel(options.logLevel);

    // Execute
    var done = this.async();
    testBridge.execute(options, function(err, result) {
      if (!err) {
        if (typeof result !== 'number') {
          result = 0;
        }
        console.log('Updated %d test runs remotely.', result);
        done(true);
      } else {
        console.log('An error occurred.', err);
        done(false);
      }
    });
  });
};
