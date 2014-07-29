module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: false,
                newcap: false,
                noarg: true,
                sub: true,
                undef: false,
                boss: true,
                eqnull: true,
                unused: false,
                browser: true,
                strict: true,
                jquery: true,
            },
            globals: {
                moment: true,
                console: true,
                define: true,
                require: true
            },
            all: [
                'assets/js/*.js',
                'assets/js/**/*.js',
                '!assets/js/*.min.js',
                '!assets/js/**/*.min.js',
            ]
        },

        asciify: {
            appBanner: {
                text: '<%= pkg.author.split(\' <\')[0] %>',
                options: {
                    font: 'doh', // http://www.figlet.org/examples.html
                    log: false
                }
            }
        },

        bumpup: {
            files: ['package.json', 'bower.json', 'composer.json']
        },

        uglify: {
            options: {
                banner: '/*! \n <%= asciify_appBanner %> \n <%= pkg.name %> <%= grunt.template.today("isoDateTime") %> \n Source: /assets/js/main.js */ \n',
                preserveComments: 'some',
                mangle: false
            },
            build: {
                src: 'assets/js/main.js',
                dest: 'assets/js/main.min.js'
            }
        },

        watch: {
            css: {
                files: [
                    'assets/css/*.css'
                ],
                options: {
                    livereload: true
                },
                tasks: ['cssmin']
            },
            js: {
                files: [
                    'assets/js/*.js',
                    'assets/js/**/*.js'
                ],
                options: {
                    livereload: true
                }
            },
            html: {
                files: [
                    'application/*.html',
                    'application/**/*.html'
                ],
                options: {
                    livereload: true
                }
            },
            less: {
                files: [
                    'assets/less/*.less'
                ],
                tasks: ['less']
            }
        },

        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "assets/css/main.css": ["assets/less/style.less"],
                }
            }
        },
        cssmin: {

            /*combine: {
                 files: {
                'css_min/combine.css': ['css/*.css']
                }
            },*/

            minify: {
                expand: true,
                cwd: 'assets/css/',
                src: ['main.css', 'main.min.css'],
                dest: 'assets/css/',
                ext: '.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-asciify');
    grunt.loadNpmTasks('grunt-bumpup');

    grunt.registerTask('build', ['less', 'jshint', 'asciify', 'bumpup', 'uglify', 'cssmin']);

};
