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
        '../../generators/app'
      ], null, {'skip-install': true});
      done();
    }.bind(this));
  });

  xit('creates expected files', function (done) {
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

    helpers.run(this.app, {
      'projectName': 'temp'
    });

    this.app.on('ready', () => {
      done();
    })


  });
});
