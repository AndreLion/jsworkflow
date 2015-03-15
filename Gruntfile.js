'use strict';
var pkgjson = require('./package.json');

var config = {
    //pkg: pkgjson,
}

var CONST = {
    //dist: 'src/',
    bower: 'bower_components'
};

var files = {
    jslib : [
        CONST.bower + '/jquery/dist/jquery.min.js',
        CONST.bower + '/underscore/underscore-min.js'
    ],
    csslib : [
        CONST.bower + '/bootstrap/dist/css/bootstrap.min.css',
        CONST.bower + '/font-awesome/css/font-awesome.min.css'
    ]
}

module.exports = function (grunt) {

    // Configuration
    grunt.initConfig({
        CONST:CONST,
        concat: {
            options: {
                //banner: '/*! <%= pkg.name %> lib concat files - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            src_jslib: {
                src: files.jslib,
                dest: 'src/lib/js/lib.min.js'
            },
            src_csslib: {
                src: files.csslib,
                dest: 'src/lib/css/lib.min.css'
            },
            head_jslib: {
                src: files.jslib,
                dest: 'head/debug/lib/js/lib.min.js'
            },
            head_csslib: {
                src: files.csslib,
                dest: 'head/debug/lib/css/lib.min.css'
            }
        },
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= CONST.bower %>/bootstrap/dist',
                    src: ['fonts/*'],
                    dest: 'src/lib'
                },
                {
                    expand: true,
                    cwd: '<%= CONST.bower %>/font-awesome',
                    src: ['fonts/*'],
                    dest: 'src/lib'
                }]
            },
            map : {
                files: [{
                    expand: true,
                    cwd: '<%= CONST.bower %>/underscore',
                    src: ['*.map'],
                    dest: 'src/lib/js'
                }]
            },
            headmap : {
                files: [{
                    expand: true,
                    cwd: '<%= CONST.bower %>/underscore',
                    src: ['*.map'],
                    dest: 'head/debug/lib/js'
                }]
            },
            headfonts: {
                files: [{
                    expand: true,
                    cwd: '<%= CONST.bower %>/bootstrap/dist',
                    src: ['fonts/*'],
                    dest: 'head/debug/lib'
                },
                {
                    expand: true,
                    cwd: '<%= CONST.bower %>/font-awesome',
                    src: ['fonts/*'],
                    dest: 'head/debug/lib'
                }]
            },
            headlib_release : {
                files: [{
                    expand: true,
                    cwd: 'head/debug',
                    src: ['lib/**/*.*'],
                    dest: 'head/release'
                }]
            },
            headsrc: {
                files: [{
                    expand: true,
                    cwd: 'tmp/src/',
                    src: ['**/*',  '!**/lib/**'],
                    dest: 'head/debug'
                }]
            },
            headsrc_release: {
                files: [{
                    expand: true,
                    cwd: 'tmp/src/',
                    src: ['**/*',  '!**/lib/**'],
                    dest: 'head/release'
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
        /*uglify: {
            options: {
            },
            build: {
                files: {
                    '<%= config.dist %>/js/lib.min.js': [
                        '<%= bower.directory %>/jquery/dist/jquery.js',
                        '<%= bower.directory %>/underscore/underscore.js'
                    ]
                }
            }
        },*/
        gitclone : {
            head: {
                options: {
                    repository: 'https://github.com/AndreLion/jsworkflow.git',
                    branch: 'master',
                    directory: 'tmp'
                }
            }
        },
        clean :{
            tmp :{
                src: ['tmp']
            },
            head :{
                src: ['head']
            }
        },
        processhtml :{
            options: {
            },
            head:{
                files: {
                    'head/debug/index.html': ['head/debug/index.html'],
                    'head/release/index.html': ['head/release/index.html']
                }
            },
            release:{
                files: {
                    'head/release/index.html': ['head/release/index.html']
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', [
        'concat:src_jslib',
        'concat:src_csslib',
        'copy:fonts',
        'copy:map',
        'jshint',
        'watch'
    ]);

    grunt.registerTask('head', [
        'clean:tmp',
        'gitclone:head',
        //'processhtml:head',
        'clean:head',
        'concat:head_jslib',
        'concat:head_csslib',
        'copy:headfonts',
        'copy:headmap',
        'copy:headlib_release',
        'copy:headsrc',
        'copy:headsrc_release',
        'processhtml:head',
        'processhtml:release'
    ]);
};
