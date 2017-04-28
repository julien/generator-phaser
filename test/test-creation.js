const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');
const fsextra = require('fs-extra');
const path = require('path');

const basedir = path.join(__dirname, '../generators/app');

describe('yo:phaser', () => {

  let tmpdir;

  beforeEach(() => {
    return helpers.run(basedir)
      .inTmpDir(dir => {
        tmpdir = dir;
      })
      .withOptions({projectName: 'temp'})
  });

  afterEach(() => fsextra.remove(tmpdir));

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

    const files = expected.map(i => path.join(tmpdir, i));
    assert.file(files);
  });
});
