'use strict';

module.exports = function (grunt) {

  var config = {};

  config.root = 'www';
  config.css = config.root + '/css';
  config.js  = config.root + '/js';
  config.jsmin  = config.javascripts + '/min';
  config.cssbin = config.css + '/generated';
  config.cssmin = config.css + '/min';
  config.images = config.root + '/images';


  grunt.initConfig({

    jshint: {
      files: ['controllers/**/*.js', 'lib/**/*.js', 'models/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: config.js +'/app/',
          mainConfigFile: config.js +'/app/config.js',
          dir: '.gruntbuild/js',
          optimize: 'uglify',
          modules: [{name: 'main'}],

          // Exclusions from minconcat use empty:
          paths: {
            //settings: 'empty:'
          },

          has: {
            debugMode: false
          }
        }
      }
    },

    makara: {
      files: ['public/templates/**/*.dust'],
      options: {
        contentPath: ['locales/**/*.properties']
      }
    },

    dustjs: {
      compile: {
        files: [
          {
          expand: true,
          cwd: 'tmp/',
          src: '**/*.dust',
          dest: '.gruntbuild/templates',
          ext: '.js'
        }
        ],
        options: {
          fullname: function (filepath) {
            var path = require('path'),
            name = path.basename(filepath, '.dust'),
            parts = filepath.split(path.sep),
            fullname = parts.slice(3, -1).concat(name);

            return fullname.join(path.sep);
          }
        }
      }
    },

    mochacli: {
      src: ['test/*.js'],
      options: {
        globals: ['chai'],
        timeout: 6000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      }
    },

    clean: {
      tmp: 'tmp',
      build: '.gruntbuild/*',
      generatedcss: config.css +'/generated',
      concatcss: config.css +'/concat'
    },

    compass: {
      dist: {
        options: {
          relativeAssets: true,
          sassDir: config.css +'/app',
          cssDir: config.cssbin
        }
      }
    },

    cssmin: {
      options: {
        report: 'min',
      },
      minify: {
        expand: true,
        cwd: config.css +'/concat/',
        src: ['**/*.css'],
        dest: config.cssmin +'/',
        ext: '.min.css'
      }
    },

    concat: {
      css: {
        src: [config.cssbin +'/**/*.css'],
        dest: config.css +'/concat/app.css'
      }
    },

    copy: {
      css: {
        expand: true,
        cwd: config.css +'/',
        src: 'min/*.css',
        dest: '.gruntbuild/css/'
      }
    },

    watch: {
      files: [
        config.css +'/app/**/*.scss',
        config.js +'/app/**/*.js',
        config.js +'/lib/**/*.js',
        config.js +'/helpers/**/*.js'
      ],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-dustjs');
  grunt.loadTasks('./node_modules/makara/tasks/');
 
  //grunt.registerTask('i18n', ['clean', 'makara', 'dustjs', 'clean:tmp']);
  grunt.registerTask('i18n', ['clean:tmp', 'makara', 'dustjs', 'clean:tmp']);
  grunt.registerTask('build', ['clean:build', 'default', 'copy:css', 'jshint', 'requirejs', 'i18n']);
  grunt.registerTask('test', ['jshint', 'mochacli', 'clean:tmp']);


  /**
   * Front-end Development Tasks
   *
   * Default task
   */
  grunt.registerTask('default', [
                      'clean:generatedcss',// delete the concatenated css directory/file
                      'compass',           // run compass to process scss
                      'concat:css',        // concatenate processed css
                      'cssmin',            // minify concatenated css
                      'clean:concatcss'    // delete the concatenated css directory/file

                      // Needs to be updated
                      //'jshint',          // run jshint to lint js
                      //'requirejs',       // run require to build and minify js
                    ]);

};
