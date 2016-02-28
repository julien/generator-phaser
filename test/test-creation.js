/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-test');

describe('yo:phaser', function () {
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

      '.gitignore',
      'package.json',
      'assets/preloader.gif',
      'css/main.css',
      'index.html',
      'src/boot.js',
      'src/game.js',
      'src/main.js',
      'src/menu.js',
      'src/preloader.js'

    ];

    helpers.mockPrompt(this.app, {
      projectName: 'temp'
    });

    this.app.options['skip-install'] = true;
    this.app.run(function () {
      done();
    });
  });
});
