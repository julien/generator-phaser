module.exports = ->

  @initConfig
    JS_DIR: 'js/'
    JS_LIBS_DIR: '<%= JS_DIR %>lib/'
    ASSETS_DIR: 'assets/'
    CSS_DIR: 'css/'
    IMG_DIR: 'img/'
    DIST_DIR: 'dist/'
    DEV_DIR: 'dev/'
    DIST_FILE: '<%= DIST_DIR %><%= PKG.name %>'
    INDEX_FILE: 'index.html'
    PKG: @file.readJSON 'package.json'

    clean:
      options:
        force: true

      dist: ['<%= DIST_DIR %>']

    copy:
      build:
        files: [
          src: ['<%= JS_DIR %>**', 'index.html', '<%= CSS_DIR %>**', '<%= ASSETS_DIR %>**']
          expand: true
          dest: '<%= DEV_DIR %>'
        ]
      assets:
        files: [
          src: ['<%= ASSETS_DIR %>**']
          expand: true
          dest: '<%= DIST_DIR %>'
        ]

    jshint:
      app:
        options:
          force: true
          jshintrc: '.jshintrc'
          ignores: [
            '<%= JS_LIBS_DIR %>**/*.js'
          ]
        src: ['<%= JS_DIR %>**/*.js']

    uglify:
      dist:
        files:
          '<%= DIST_FILE %>.min.js': ['<%= JS_LIBS_DIR %>**/*.js', '<%= JS_DIR %>main.js']

      options:
        banner: '/*! <%= PKG.name %> v<%= PKG.version %> */\n'

    cssmin:
      dist:
        files:
          '<%= DIST_FILE %>.min.css': ['<%= CSS_DIR %>main.css']

    htmlmin:
      options:
        removeComments: true
        removeCommentsFromCDATA: true
        removeCDATASectionsFromCDATA: true
        collapseWhitespace: true
        collapseBooleanAttributes: true
        removeAttributeQuotes: true
        removeRedundantAttributes: true
        useShortDoctype: true

      index:
        files:
          '<%= DIST_DIR %><%= INDEX_FILE %>': '<%= DIST_DIR %><%= INDEX_FILE %>'

    imagemin:
      options:
        optimizationLevel: 3

      dist:
        files: [
          cwd: '<%= CSS_DIR %>'
          src: ['<%= IMG_DIR %>**']
          expand: true
          dest: '<%= DIST_DIR %>'
        ]

    processhtml:
      index:
        files:
          '<%= DIST_DIR %><%= INDEX_FILE %>': '<%= INDEX_FILE %>'

    express:
      all:
        options:
          port: 9000
          bases: ['dev/']
          open: true
          livereload: true

    watch:
      options:
        livereload: true

      js:
        files: ['<%= JS_DIR %>**/*.js', '!<%= JS_LIBS_DIR %>**/*.js']
        tasks: ['jshint', 'copy:build']

  @loadNpmTasks 'grunt-contrib-copy'
  @loadNpmTasks 'grunt-contrib-clean'
  @loadNpmTasks 'grunt-contrib-jshint'
  @loadNpmTasks 'grunt-contrib-uglify'
  @loadNpmTasks 'grunt-contrib-cssmin'
  @loadNpmTasks 'grunt-contrib-htmlmin'
  @loadNpmTasks 'grunt-contrib-imagemin'
  @loadNpmTasks 'grunt-contrib-watch'
  @loadNpmTasks 'grunt-processhtml'
  @loadNpmTasks 'grunt-express'


  @registerTask 'server', ['copy:build', 'express', 'watch']
  @registerTask 'default', ['clean', 'jshint', 'uglify', 'cssmin', 'processhtml', 'htmlmin', 'copy']
