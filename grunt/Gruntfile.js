module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: "/*\n* Reversi\n* Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich\n* /\n",
                mangle: true,
                compress: true
            },
            build: {
                src: '../source/client/js/*.js',
                dest: '../build/js/reversi.min.js',
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
                    patterns: [
                        {
                            match: /\<\!DOCTYPE html\>/g,
                            replacement: function () {
                                return "<!DOCTYPE html>\n<!-- \n* Reversi \n* Copyright (c) 2015 Nguyen Khoa Thien, Tyedmers Gérard, Jenzer Ulrich\n-->\n";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['../build/reversi-game-src.html'], dest: '../build'}
                ]
            }
        },
        // gzip assets 1-to-1 for production
        compress: {
            main: {
                options: {
                    archive: 'reversi.zip',
                    pretty: true
                    //mode: 'gzip'
                },
                expand: true,
                cwd: '../build/',
                src: ['**/*'],
                dest: '../build/zip'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', [
        'uglify',
        //'imagemin',
        'cssmin',
        'htmlmin',
        'replace',
        //'compress'
    ]);


};