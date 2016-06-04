'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var foldername = path.basename(process.cwd());

var PhaserGenerator = generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({bower: false, npm: true});
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('... Phaser ...'));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What\'s the name of your application',
      default: foldername
    }, {
      type: 'list',
      name: 'phaserBuild',
      message: 'Which version of Phaser do you want?',
      choices: [
        {
          value: 'phaser.min.js',
          name: 'Arcade Physics + P2 Physics (Default)'
        },
        {
          value: 'custom/phaser-arcade-physics.min.js',
          name: 'Arcade Physics'
        },
        {
          value: 'custom/phaser-ninja-physics.min.js',
          name: 'Ninja Physics'
        },
        {
          value: 'custom/phaser-no-physics.min.js',
          name: 'No Physics'
        }
      ]
    }, {
      type: 'list',
      name: 'esVersion',
      message: 'Which ECMAScript version do you want to use?',
      choices: [
        {
          value: 6,
          name: 'ECMAScript 6/2015 (Default)'
        },
        {
          value: 5,
          name: 'ECMAScript 5'
        }
      ]
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName || ' ';
      this.phaserBuild = props.phaserBuild || 'phaser.min.js';
      this.customBuild = this.phaserBuild.indexOf("custom/") !== -1 ? true : false;
      this.srcDir = this.esVersion === 5 ? 'es5/' : 'es6/';
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('assets');
    this.mkdir('css');
    this.mkdir('src');

    this.template(this.srcDir + '_package.json', 'package.json');
  },

  projectfiles: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('assets/preloader.gif', 'assets/preloader.gif');
    this.copy('css/main.css', 'css/main.css');

    this.copy(this.srcDir + 'boot.js', 'src/boot.js');
    this.copy(this.srcDir + 'game.js', 'src/game.js');
    this.template(this.srcDir + 'main.js', 'src/main.js');
    this.copy(this.srcDir + 'menu.js', 'src/menu.js');
    this.copy(this.srcDir + 'preloader.js', 'src/preloader.js');

    this.template('index.html', 'index.html');
  }
});

module.exports = PhaserGenerator;
