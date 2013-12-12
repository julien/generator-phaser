module.exports = (grunt) ->

  @initConfig
    PKG: @file.readJSON 'package.json'
    APP_NAME: '<%= PKG.name %>'
    SRC_DIR: 'src'
    DST_DIR: 'dist'
    DST_FILE:  '<%= DST_DIR %>/main'
    INDEX_FILE: 'index.html'

    # For the moment grab latest phaser build
    # from GH, later on phaser might have Bower support
    'curl-dir':
      '<%= SRC_DIR %>/js/lib/': [
        'https://raw.github.com/photonstorm/phaser/master/build/phaser.js'
      ]

    clean:
      options:
        force: true
      dist: ['<%= DST_DIR %>']

    copy:
      assets:
        files: [
          expand: true
          flatten: false
          cwd: '<%= SRC_DIR %>/assets/'
          src: ['**']
          dest: '<%= DST_DIR %>/assets/'
        ]
      index:
        files: [
          src: ['<%= SRC_DIR %>/<%= INDEX_FILE %>]']
          expand: false
          flatten: true
          dest: '<%= DST_DIR %>/<%= INDEX_FILE %>'

        ]

    jshint:
      app:
        options:
          force: true
          jshintrc: '.jshintrc'
          ignores: ['<%= SRC_DIR %>/js/lib/**/*.js']
        src: ['<%= SRC_DIR %>/js/**/*.js']

    uglify:
      dist:
        files:
          '<%= DST_FILE %>.min.js': ['<%= SRC_DIR %>/js/**/*.js']

      options:
        banner: '/*! <%= PKG.name %> v<%= PKG.version %> */\n'

    cssmin:
      dist:
        files:
          '<%= DST_FILE %>.min.css': ['<%= SRC_DIR %>/css/**/*.css']

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
          '<%= DST_DIR %>/<%= INDEX_FILE %>': '<%= DST_DIR %>/<%= INDEX_FILE %>'

    processhtml:
      index:
        files:
          '<%= DST_DIR %>/<%= INDEX_FILE %>': '<%= SRC_DIR %>/<%=INDEX_FILE %>'

    connect:
      dev:
        options:
          port: 9000
          base: '<%= SRC_DIR %>'

    watch:
      js:
        files: ['<%= SRC_DIR %>/js/**/*.js']
        tasks: ['jshint']
        options:
          livereload: true

      ts:
        files: ['<%= SRC_DIR %>/js/**/*.ts']
        tasks: ['typescript']

      all:
        files: [
          '<%= SRC_DIR %>/assets/**/*'
          '<%= SRC_DIR %>/css/**/*.css'
          '<%= SRC_DIR %>/index.html'
        ]
        options:
           livereload: true

  @loadNpmTasks 'grunt-contrib-copy'
  @loadNpmTasks 'grunt-contrib-clean'
  @loadNpmTasks 'grunt-contrib-connect'
  @loadNpmTasks 'grunt-contrib-jshint'
  @loadNpmTasks 'grunt-contrib-uglify'
  @loadNpmTasks 'grunt-contrib-cssmin'
  @loadNpmTasks 'grunt-contrib-htmlmin'
  @loadNpmTasks 'grunt-contrib-watch'
  @loadNpmTasks 'grunt-curl'
  @loadNpmTasks 'grunt-processhtml'

  @registerTask 'dist', ['clean', 'jshint', 'uglify',
                         'cssmin', 'copy', 'processhtml', 'htmlmin']
  @registerTask 'server',  ['jshint', 'connect', 'watch']
  @registerTask 'update', ['curl-dir']
  @registerTask 'default', ['server']

