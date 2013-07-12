/**
 * Minimale Demo-Gruntfile zur Automatisierung des Linting-
 * und Buildprozesses
 *
 * Verfügbare Tasks:
 * --------------------
 *  grunt jshint -v
 *  grunt requirejs -v
 */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        // 1. JSHint config
        jshint   : {
            options: {
                jshintrc: '.jshintrc'
            },
            // welche Dateien soll jshint durchgehn?
            // wir linten hier nur die tests...
            all    : [
                'Gruntfile.js',
                'test/functional/**/*.js',
                'test/spec/**/*.js'
            ]
        },

        // XXX CSS-MIN config
        // https://github.com/jzaefferer/grunt-css

        // Require.js Optimizer Config
        requirejs: {
            compile: {
                options: {
                    name          : 'main',
                    baseUrl       : 'js',
                    mainConfigFile: 'js/main.js',
                    out           : 'build/build.js',

                    // Packe alles in eine IIFE:
                    // (function() { /* optimized code */ })();
                    wrap: true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['requirejs']);
};
