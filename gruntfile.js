'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    express: {
      options: {
        port: process.env.PORT || 9001
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          'node_env': 'production'
        }
      }
    },

    watch: {
      express: {
        files: [
          'server.js',
          'src/{,*//*}*.{js,json}'
        ],
        tasks: ['express:dev'],
        options: {
          livereload: 35728,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    maildev: {
      run: {
        keepAlive: true,
        open: true
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'src/{,*/}*.js'
      ]
    },

    shell: {
      mongo: {
        command: 'mongod --dbpath db --smallfiles',
        options: {
          async: true
        }
      }
    },
  });

  grunt.registerTask('dev', ['shell:mongo', 'express:dev', 'watch']);
};
