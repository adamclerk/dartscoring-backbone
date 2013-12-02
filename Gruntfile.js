/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['app/**/*.js','backend/**/*.js']
      },
      test: {
        src: ['test/app/**/*.js', 'test/backend/**/*.js']
      }
    },
    jsonlint: {
      config: {
        src: ['package.json', 'bower.json']
      },
      data: {
        src: ['data/**/*.json']
      }
    },
    exec: {
      npm_update: {
        cmd: 'npm install'
      },
      bower_update: {
        cmd: 'bower install'
      },
      start: {
        cmd: 'echo "starting server on port 8000" & ./backend/server.js'
      },
      test: {
        cmd: 'mocha-phantomjs -R dot ./test/test.html'
      },
      list: {
        src: ['app/']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-exec');

  // Double Check the Project.
  grunt.registerTask('init', ['exec:npm_update', 'exec:bower_update']);
  grunt.registerTask('check', ['jsonlint', 'jshint']);
  grunt.registerTask('test', ['check:test','exec:test']);
  grunt.registerTask('start', ['exec:npm_update', 'exec:bower_update', 'check', 'test', 'exec:start']);
  grunt.registerTask('default', ['start']);
};
