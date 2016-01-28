module.exports = function(grunt) {

    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "assets/css/main.css": ["assets/less/main.less"],
                }
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/css/',
                src: ['main.css', 'main.min.css'],
                dest: 'assets/css/',
                ext: '.min.css'
            }
        },

        uglify: {
            build: {
                src: ['assets/js/main.js'],
                dest: 'assets/js/main.min.js'
            }
        },

        watch: {
            files: "assets/less/*",
            tasks: ["less"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['uglify', 'less', 'cssmin']);
}
