'use strict';
var pkgjson = require('./package.json');

var config = {
    pkg: pkgjson,
    dist: 'src/lib',
    bower:{
        directory : 'bower_components'
    }
}

module.exports = function (grunt) {

    // Configuration
    grunt.initConfig({
        config: config,
        pkg: config.pkg,
        bower: config.bower,
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> lib concat files - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                src: [
                '<%= bower.directory %>/jquery/dist/jquery.min.js',
                '<%= bower.directory %>/underscore/underscore-min.js'
                ],
                dest: '<%= config.dist %>/js/lib.min.js'
            },
            css: {
                src: [
                    '<%= bower.directory %>/bootstrap/dist/css/bootstrap.min.css',
                    '<%= bower.directory %>/font-awesome/css/font-awesome.min.css'
                ],
                dest: '<%= config.dist %>/css/lib.min.css'
            }
        },
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= bower.directory %>/bootstrap/dist',
                    src: ['fonts/*'],
                    dest: '<%= config.dist %>'
                },
                {
                    expand: true,
                    cwd: '<%= bower.directory %>/font-awesome',
                    src: ['fonts/*'],
                    dest: '<%= config.dist %>'
                }]
            },
            map : {
                files: [{
                    expand: true,
                    cwd: '<%= bower.directory %>/underscore',
                    src: ['*.map'],
                    dest: '<%= config.dist %>/js'
                }]
            }
        },
        watch: {
            jshint: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint']
            },
            reload: {
                files: ['src/**/*.*'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: ['src/js/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                files: {
                    '<%= config.dist %>/js/lib.min.js': [
                        '<%= bower.directory %>/jquery/dist/jquery.js',
                        '<%= bower.directory %>/underscore/underscore.js'
                    ]
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [
        'concat',
        'copy',
        'jshint',
        'watch',
        //'uglify'
    ]);

    grunt.registerTask('head', [
        'copy'
    ]);
};
