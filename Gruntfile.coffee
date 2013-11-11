module.exports = (grunt) ->

  @initConfig
    PKG: @file.readJSON 'package.json'
    APP_ID: null
    APP_NAME: '<%= PKG.name %>'
    JS_DIR: 'js/'
    JS_LIBS_DIR: '<%= JS_DIR %>lib/'
    ASSETS_DIR: 'assets/'
    CSS_DIR: 'css/'
    IMG_DIR: 'img/'
    DIST_DIR: 'dist/'
    DEV_DIR: 'dev/'
    DIST_FILE: '<%= DIST_DIR %><%= PKG.name %>'
    INDEX_FILE: 'index.html'

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

      project:
        files: [
            src: '.project'
            dest: '<%= DIST_DIR %>'
          ,
            src: 'config.xml'
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

    shell:
      package:
        command: 'webtizen -p --nocheck <%= DIST_DIR %>MonsterDosis.wgt <%= DIST_DIR %>'

      install:
        command: 'webtizen -i -w <%= DIST_DIR %>MonsterDosis.wgt'

      getid:
        command: 'webtizen -l'
        options:
          callback: (err, stdout, stderr, cb) ->
            return if grunt.config.get 'APP_ID'
            lines = stdout.split(/\n/).slice(3, -2)
            ids = lines.map (l) ->
              return l.split(/\s+/).slice(-1)[0]

            apps = {}
            for i in ids
              meta = i.split(/\./)
              apps[meta[1]] = meta[0]

            console.log ('APP')
            appname = grunt.config.get 'APP_NAME'
            appid = apps[appname]
            grunt.config.set 'APP_ID', appid
            cb()

      launch:
        command: ->
          appname = grunt.config.get 'APP_NAME'
          console.log appname
          appid = grunt.config.get 'APP_ID'
          if appid
            "webtizen -r -i #{appid}.#{appname}"

      uninstall:
        command: ->
          appid = grunt.config.get 'APP_ID'
          if appid
            "webtizen -u -i #{appid}"

      debug:
        command: ->
          appid = grunt.config.get 'APP_ID'
          if appid
            "webtizen -d -i #{appid}"

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
  @loadNpmTasks 'grunt-shell'


  @registerTask 'server', ['copy:build', 'express', 'watch']

  @registerTask 'deploy', ['default', 'shell:package', 'shell:install', 'shell:getid', 'shell:launch']

  @registerTask 'default', ['clean', 'jshint', 'uglify', 'cssmin', 'processhtml', 'htmlmin', 'copy']
