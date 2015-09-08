module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: "/*\n* grrd's 4 in a Row\n* Copyright (c) 2012 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL License\n*/\n",
                //banner: "/*\n* Copyright (c) 2011-2013 Fabien Cazenave, Mozilla.\n*/\n",
                //banner: "/*\n* Binary Ajax 0.1.10\n* Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/\n* Licensed under the MPL License [http://www.nihilogic.dk/licenses/mpl-license.txt]\n*/\n",
                //banner: "/*\n* Javascript EXIF Reader 0.1.4\n* Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/\n* Licensed under the MPL License [http://www.nihilogic.dk/licenses/mpl-license.txt]\n*/\n",
                mangle: true,
                compress: true
            },
            build: {
                src: '../1_Master/4inaRow/Scripts/4inaRow.js',
                dest: '../2_Build/4inaRow/Scripts/4inaRow.js'
                //src: '../1_Master/4inaRow/Scripts/l10n.js',
                //dest: '../2_Build/4inaRow/Scripts/l10n.js'
                //src: '../1_Master/4inaRow/Scripts/binaryajax.js',
                //dest: '../2_Build/4inaRow/Scripts/binaryajax.js'
                //src: '../1_Master/4inaRow/Scripts/exif.js',
                //dest: '../2_Build/4inaRow/Scripts/exif.js'
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: '../1_Master/4inaRow/Images',
                    src: ['*.{png,jpg,gif}'],
                    dest: '../2_Build/4inaRow/Images/'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: "/*\n* grrd's 4inaRow\n* Copyright (c) 2012 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL License\n*/\n"
                },
                files: {
                    '../2_Build/4inaRow/Scripts/4inaRow.css': ['../1_Master/4inaRow/Scripts/4inaRow.css']
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
                    cwd: '../1_Master/4inaRow',
                    src: 'index.html',
                    dest: '../2_Build/4inaRow'
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
                                return "<!DOCTYPE html>\n<!-- \n* grrd's 4 in a Row \n* Copyright (c) 2012 Gerard Tyedmers, grrd@gmx.net \n* Licensed under the MPL License\n-->\n";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['../2_Build/4inaRow/index.html'], dest: '../2_Build/4inaRow/'}
                ]
            }
        },
        // gzip assets 1-to-1 for production
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '../2_Build/4inaRow/',
                src: ['**/*'],
                dest: '../2_Build_gzip/4inaRow/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    //grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', [
        'uglify',
        //'imagemin',
        'cssmin',
        'htmlmin',
        'replace'
        //'compress'
    ]);


};