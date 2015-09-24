module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: "/*\n* Reversi\n* Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich\n*/\n",
                mangle: false,
                compress: true
            },
            build: {
                //src: '../source/client/js/*.js',
                src: ['../source/client/js/gameLogic.js',
                    '../source/client/js/app-module.js',
                    '../source/client/js/app-constant-service.js',
                    '../source/client/js/app-setup-service.js',
                    '../source/client/js/app-authentication-service.js',
                    '../source/client/js/app-game-state-service.js',
                    '../source/client/js/app-screen-service.js',
                    '../source/client/js/app-card-game-service.js',
                    '../source/client/js/app-statistic-service.js',
                    '../source/client/js/app-main-controller.js',
                    '../source/client/js/app-online-service.js'
                ],
                dest: '../build/js/reversi.min.js'
                //src: '../source/client/js/*.js',
                //dest: '../build/client/reversi.js'
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: '../source/client/images',
                    src: ['*.{png,jpg,gif,svg}'],
                    dest: '../build/images/'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: "/*\n* Reversi\n* Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich\n*/\n"
                },
                files: {
                    '../build/css/reversi.css': ['../source/client/css/*.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '../source/client',
                    src: 'reversi-game-src.html',
                    dest: '../build'
                }]
            }
        },
        replace: {
            dist: {
                options: {
                    usePrefix: false,
                    patterns: [
                        {
                            match: /\<\!DOCTYPE html\>/g,
                            replacement: function () {
                                return "<!DOCTYPE html>\n<!-- \n* Reversi \n* Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich\n-->\n";
                            }
                        },
                        {match: 'lang="en"', replacement: 'lang="en" manifest="manifest.appcache"'},
                        {match: /reversi-game-src.css/g, replacement: function () {return 'reversi.css';}},
                        {match: /gameLogic.js/g, replacement: function () {return 'reversi.min.js';}},
                        {match: '<script src="js/app-module.js"></script>', replacement: ''},
                        {match: '<script src="js/app-constant-service.js"></script>', replacement: ''},
                        {match: '<script src="js/app-setup-service.js"></script>', replacement: ''},
                        {match: '<script src="js/app-authentication-service.js"></script>', replacement: ''},
                        {match: '<script src="js/app-game-state-service.js"></script>', replacement: ''},
                        {match: '<script src="js/app-screen-service.js"></script>', replacement: ''},
                        {match: '<script src="js/app-card-game-service.js"></script>', replacement: ''},
                        {match: '<script src="js/app-statistic-service.js"></script>', replacement: ''},
                        {match: '<script src="js/app-main-controller.js"></script>', replacement: ''},
                        {match: '<script src="js/app-online-service.js"></script>', replacement: ''}
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['../build/reversi-game-src.html'], dest: '../build'}
                ]
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: '../source/client/js/vendor/', src: '**', dest: '../build/js/vendor/'},
                    {expand: true, cwd: '../source/client/css/vendor/', src: '**', dest: '../build/css/vendor/'},

                ],
            },
        },

        manifest: {
            generate: {
                options: {
                    basePath: '../build',
                    preferOnline: true,
                    headcomment: " <%= pkg.name %> v<%= pkg.version %>",
                    verbose: false,
                    timestamp: true,
                    hash: true,
                    master: ['reversi-game-src.html'],
                    process: function(path) {return path.substring(''.length);}
                },
                src: [
                    '*.html',
                    'js/*.js',
                    'css/*.css',
                    'images/*.*'
                ],
                dest: '../build/manifest.appcache'
            }
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'], //'Firefox','IE'
                    files: [
                        //'../source/client/js/vendor/angular.js',
                        //'../source/client/js/vendor/angular-mocks.js',
                        '../source/client/js/vendor/angular.min.js',
                        '../source/client/js/vendor/jquery-2.1.4.min.js',
                        //'../source/client/js/vendor/bootstrap.min.js',
                        //'../source/client/js/vendor/socket.io.js',
                        //'../source/client/js/vendor/*.js',
                        '../source/client/js/gameLogic.js',
                        '../tests/client/*.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', [
        'uglify',
        'imagemin',
        'cssmin',
        'htmlmin',
        'replace',
        'copy',
        'manifest',
        'karma'
    ]);

    grunt.registerTask('test', [
        'karma'
    ]);

};