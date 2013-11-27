/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['app/**/*.js']
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
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-exec');

  // Double Check the Project.
  grunt.registerTask('check', ['jsonlint', 'jshint']);
  
  // Init the project
  grunt.registerTask('init', ['exec:npm_update', 'exec:bower_update']);

  // Run the project
  grunt.registerTask('start', ['exec:npm_update', 'exec:bower_update', 'check', 'exec:start']);

  grunt.registerTask('default', ['start']);
};
