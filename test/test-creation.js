const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs-extra');
const path = require('path');

describe('yo:phaser', () => {

  let tmpdir;

  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(dir => {
        tmpdir = dir;
      })
      .withOptions({projectName: 'temp'})
  });

  it('creates expected files', () => {
    const expected = [
      // add files you expect to exist here.
      '.gitignore',
      'assets/preloader.gif',
      'css/main.css',
      'index.html',
      'package.json',
      'src/main.js',
      'src/states/boot.js',
      'src/states/game.js',
      'src/states/menu.js',
      'src/states/preloader.js'
    ];

    for (let i = 0, l = expected.length; i < l; i++) {
      assert.file(path.join(tmpdir, expected[i]));
    }
  });
});
