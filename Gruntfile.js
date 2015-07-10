/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! \n * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n',

        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            build: {
                expand: true,
                cwd: 'src',
                src: ['*.js'],
                dest: 'dist'
            }
        },

        jshint: {
            jshintrc: '.jshintrc',
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/*.js']
            }
        },
        html2js: {
            options: {
                module: 'mindsmash.quickactions',
                singleModule: true
            },
            build: {
                src: 'src/*.html',
                dest: 'dist/mindsmash-angular-quickactions.tpls.js'
            }
        },
        // Task configuration.
        uglify: {
            options: {
                banner: '<%= banner %>',
                report: 'gzip'
            },
            build: {
                src: ['dist/mindsmash-angular-quickactions.js', 'dist/mindsmash-angular-quickactions.tpls.js'],
                dest: 'dist/mindsmash-angular-quickactions.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('default', ['jshint', 'ngAnnotate', 'html2js', 'uglify']);
    grunt.registerTask('build', ['default']);
};
