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
            },
            release_jslib: {
                src: files.jslib,
                dest: 'release/lib/js/lib.min.js'
            },
            release_csslib: {
                src: files.csslib,
                dest: 'release/lib/css/lib.min.css'
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
            releasemap : {
                files: [{
                    expand: true,
                    cwd: '<%= CONST.bower %>/underscore',
                    src: ['*.map'],
                    dest: 'release/lib/js'
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
            releasefonts: {
                files: [{
                    expand: true,
                    cwd: '<%= CONST.bower %>/bootstrap/dist',
                    src: ['fonts/*'],
                    dest: 'release/lib'
                },
                {
                    expand: true,
                    cwd: '<%= CONST.bower %>/font-awesome',
                    src: ['fonts/*'],
                    dest: 'release/lib'
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
            releasesrc: {
                files: [{
                    expand: true,
                    cwd: 'tmp/src/',
                    src: ['**/*',  '!**/lib/**'],
                    dest: 'release'
                }]
            },
            headsrc_release: {
                files: [{
                    expand: true,
                    cwd: 'tmp/src/',
                    src: ['**/*',  '!**/lib/**'],
                    dest: 'head/release'
                }]
            },
            release_head:{
                files: [{
                    expand: true,
                    cwd: 'head/release',
                    src: ['**/*.*'],
                    dest: 'release'
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
            },
            head: {
                files: {
                    'head/release/js/intro.js': ['head/release/js/intro.js'],

                }
            },
            release: {
                files: {
                    'release/js/intro.js': ['release/js/intro.js'],

                }
            }
        },
        cssmin: {
            head:{
                files: {
                    'head/release/css/base.css': ['head/release/css/base.css']
                }
            },
            release:{
                files: {
                    'release/css/base.css': ['release/css/base.css']
                }
            }
        },
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
            },
            release :{
                src: ['release']
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
                    'head/release/index.html': ['head/release/index.html'],
                    'release/index.html': ['release/index.html']
                }
            },
            production:{
                files: {
                    'release/index.html': ['release/index.html']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

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
        'clean:head',
        'concat:head_jslib',
        'concat:head_csslib',
        'copy:headfonts',
        'copy:headmap',
        'copy:headlib_release',
        'copy:headsrc',
        'copy:headsrc_release',
        'processhtml:head',
        'uglify:head',
        'cssmin:head',
        'processhtml:release'
    ]);

    grunt.registerTask('release', 'Release Task', function(arg1, arg2) {
        //grunt.log.writeln('arg1: ' + arg1);
        //grunt.log.writeln('arg2: ' + arg2);
        //grunt.log.writeln('arg lens: ' + arguments.length);
        var len = arguments.length;
        switch(len){
            case 0:
                grunt.log.writeln(this.name + ", no args");
                break;
            case 1:
                if(arg1 === 'head'){
                    grunt.log.writeln(this.name + " from " + arg1);
                    //grunt.task.run('copy:release_head');
                    grunt.task.run([
                        'clean:tmp',
                        'gitclone:head',
                        'clean:release',
                        'concat:release_jslib',
                        'concat:release_csslib',
                        'copy:releasefonts',
                        'copy:releasemap',
                        //'copy:headlib_release',
                        'copy:releasesrc',
                        //'copy:headsrc_release',
                        //'processhtml:head',
                        'uglify:release',
                        'cssmin:release',
                        'processhtml:release',
                        'processhtml:production'
                    ]);
                }else{
                }
                break
        }
    });
};
