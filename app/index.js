'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
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
      this.srcDir = 'es'+props.esVersion+'/';
      this.esVersion = props.esVersion;
      done();
    }.bind(this));
  },

  //save prompt answers to Yeoman config
  config: function() {
    this.config.set('projectName', this.projectName);
    this.config.set('esVersion', this.esVersion);
  },

  app: function () {
    var err_func  = function (err) { if (err){ this.log(err); } }
    mkdirp('assets', err_func);
    mkdirp('css', err_func);
    mkdirp('src', err_func);
    mkdirp('src/states', err_func);
    mkdirp('src/prefabs',err_func);

    this.template(this.srcDir + '_package.json', 'package.json');
  },

  projectfiles: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('assets/preloader.gif', 'assets/preloader.gif');
    this.copy('css/main.css', 'css/main.css');

    this.copy(this.srcDir + 'boot.js', 'src/states/boot.js');
    this.copy(this.srcDir + 'game.js', 'src/states/game.js');
    this.copy(this.srcDir + 'menu.js', 'src/states/menu.js');
    this.copy(this.srcDir + 'preloader.js', 'src/states/preloader.js');
    this.copy(this.srcDir + 'hero.js', 'src/prefabs/hero.js');

    //manually set the gameStates, as they are copied asyncronously and fs.readdir cannot see them be created in time.
    //Also, we should be creating a new project and can accurately predict there will only be the default files there
    this.gameStates = ["boot","game","menu","preloader"];
    this.template(this.srcDir + 'main.js', 'src/main.js');

    this.template('index.html', 'index.html');
  }
});

module.exports = PhaserGenerator;
