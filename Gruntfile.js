/*
 * grunt-test-bridge
 * https://github.com/sebastianhaas/grunt-test-bridge
 *
 * Copyright (c) 2016 Sebastian Haas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      all: '**/*.js',
      options: {
        config: '.jscsrc',
        verbose: true,
        fix: true,
      }
    },

    // Configuration to be run (and then tested).
    testBridge: {
      default: {
        options: {
          ci: '',
          reporter: 'mochaJson',
          management: 'testlodge',
          testRunIdentifier: 'v0.0.1',
          extractTestRunFromBranchName: true,
          reporterOptions: {
            file: 'node_modules/test-bridge/tests/reporters/mochaJson/mochaTestResults.json'
          },
          managementOptions: {
            overrideConfiguration: 'Firefox'
          },
          logLevel: 'DEBUG'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['testBridge']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'jscs', 'test']);

};
