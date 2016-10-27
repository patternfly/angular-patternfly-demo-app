module.exports = function (grunt) {
  'use strict';

  // Load grunt tasks automatically
  require( 'load-grunt-tasks' )( grunt );

  // Define the configuration for all the tasks
  grunt.initConfig( {
    // Project settings
    projectSettings: {
      // configurable paths
      src:      require( './bower.json' ).appPath || 'src',
      dist:     'dist',
      deploy:   'deploy',
      mockData: 'mock_data',
      pkg:      grunt.file.readJSON( 'package.json' )
    },

    angularFileLoader: {
      options: {
        scripts: ['src/**/*.js']
      },
      index: {
        src: 'index.html'
      },
    },
    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= projectSettings.src %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= projectSettings.src %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'src/styles/scss',
          specify: 'src/styles/scss/app.scss',
          cssDir: 'src/styles',
          outputStyle: 'expanded'
        }
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    // Live Reload is to slow need to figure out how to stop reloading of npm modules
    watch:    {
      compass: {
        files: 'src/styles/scss/*.scss',
        tasks: ['compass', 'copy:styles'],
        options: {
          livereload: 37830
        }
      },
      all: {
        files: ['Gruntfile.js', 'template.html', 'src/**/*.js', 'src/**/*.html', 'styles/**/*.css'],
        tasks: ['build'],
        options: {
          livereload: 37830
        }
      },
      mockData: {
        files: ['mock_data/**/*'],
        tasks: ['copy:mockdata'],
        options: {
          livereload: 37830
        }
      },
      livereload: {
        options: {
          livereload: 37830
        },
        files:   [
          '<%= projectSettings.src %>**/*',
          '.tmp/bower_components/{,*/}*.css',
          '.tmp/styles/{,*/}*.css',
          '<%= projectSettings.mockData %>/**/*'
        ]
      }
    },

    // The actual grunt server settings
    connect:  {
      options:    {
        base: '<%= projectSettings.src %>',
        port: grunt.option("port") || 8003,
        hostname:   'localhost', // 0.0.0.0 allows access from outside
        livereload: 37830
      },
      livereload: {
        options: {
          open:       true,
          base:       [
            '.tmp',
            '<%= projectSettings.dist %>'
          ]
        }
      },
      test:       {
        options: {
          port: 9001,
          base: [
            '.tmp',
            '<%= projectSettings.dist %>'
          ]
        }
      },
      deploy:     {
        options: {
          base: '<%= projectSettings.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint:   {
      options: {
        jshintrc: '.jshintrc'
      },
      src:     [
        'Gruntfile.js',
        '<%= projectSettings.src %>/**/*.js'
      ]
    },

    // Template
    ngtemplates:     {
      options:               {
        module: 'apf.appModule',
        htmlmin: {
          collapseWhitespace:        true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA:   true,
          removeOptionalTags:        true
        }
      },
      appModule:             {
        // this is the part we want to strip from the URL, though not the path
        cwd:  '.',
        // this is the part we want actually in the URL (i.e. modules/foo/bar)
        src:  'src/**/*.html',
        // this is where it goes
        dest: '<%= projectSettings.src %>/templates/appModuleTemplates.js'
      }
    },
    // Empties folders to start fresh
    clean:           {
      dist:   {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= projectSettings.dist %>/*'
          ]
        }]
      },
      deploy: {
        files: [{
          dot: true,
          src: [
            '<%= projectSettings.deploy %>/*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Copies remaining files to places other tasks can use
    copy: {
      indexHtml: {
        cwd: '.',
        src: ['template.html'],
        dest: 'index.html'
      },
      html: {
        expand: true,
        cwd: '.',
        src: ['index.html'],
        dest: 'dist'
      },
      js: {
        cwd:  '.',
        src:  ['src/**/*.js'],
        dest: 'dist/'
      },
      fonts: {
        expand: true,
        cwd: 'bower_components/patternfly/dist/',
        src: ['fonts/**'],
        dest: 'dist/styles/'
      },
      fontawesome: {
        expand: true,
        cwd: 'bower_components/patternfly/components/font-awesome',
        src: ['fonts/**'],
        dest: 'dist/components/font-awesome/'
      },
      img: {
        expand: true,
        cwd: 'bower_components/patternfly/dist/',
        src: ['img/**'],
        dest: 'dist/'
      },
      styles: {
        expand: true,
        cwd: 'src',
        src: ['styles/**'],
        dest: 'dist'
      },
      bower: {
        expand: true,
        cwd: '.',
        src: ['bower_components/**/*'],
        dest: 'dist'
      },
      templates: {
        expand: true,
        cwd: 'src',
        src: ['templates/appModuleTemplates.js'],
        dest: 'dist'
      },
      mockdata: {
        expand: true,
        cwd: 'mock_data',
        src: ['**'],
        dest: 'dist/mock_data'
      }
    },
    htmlhint: {
      html: {
        src: ['src/**/*.html'],
        options: {
          htmlhintrc: '.htmlhintrc'
        }
      }
    },
    eslint: {
      options: {
        configFile: 'eslint.yaml'
      },
      target: [
        'Gruntfile.js',
        'src/**/*.js'
      ]
    }
  } );

  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask( 'jshintRun', [
    'jshint'
  ] );

  grunt.registerTask( 'server', function (target) {
    grunt.task.run( [
      'clean:server',
      'build',
      'configureProxies:server', // added just before connect
      'connect:livereload',
      'watch'
    ] );
  } );

  grunt.registerTask('lint', ['eslint', 'htmlhint']);

  grunt.registerTask( 'build', function (target) {

    var buildTasks = [
      'clean:dist',
      'compass',
      'lint',
      'ngtemplates',
      'copy:indexHtml',
      'angularFileLoader',
      'copy:html',
      'copy:js',
      'copy:fonts',
      'copy:fontawesome',
      'copy:img',
      'copy:styles',
      'copy:bower',
      'copy:templates',
      'copy:mockdata'
    ];

    grunt.task.run( buildTasks );

  } );

  grunt.registerTask( 'default', [
    'build'
  ] );

};
