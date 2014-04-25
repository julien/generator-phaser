/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('phaser generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('phaser:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.gitignore',
      '.bowerrc',
      'gulpfile.js',
      'src/assets/minecraftia.png',
      'src/assets/minecraftia.xml',
      'src/assets/player.png',
      'src/assets/preloader.gif',
      'src/css/main.css',
      'src/js/boot.js',
      'src/js/main.js',
      'src/js/menu.js',
      'src/js/preloader.js',
      'src/index.html'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
