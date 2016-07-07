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
    this.copy('css/main.css', 'css/main.css');

    //copy defualt game assets
    this.copy('assets/preloader.gif', 'assets/preloader.gif');
    this.copy('assets/bg_wood.png', 'assets/bg_wood.png');
    this.copy('assets/crosshair_red_small.png', 'assets/crosshair_red_small.png');
    this.copy('assets/target.png', 'assets/target.png');
    this.copy('assets/text_gameover.png', 'assets/text_gameover.png');
    this.copy('assets/text_go.png', 'assets/text_go.png');
    this.copy('assets/text_ready.png', 'assets/text_ready.png');
    this.copy('assets/text_score_small.png', 'assets/text_score_small.png');
    this.copy('assets/ding.wav', 'assets/ding.wav');
    this.copy('assets/gunshot.wav', 'assets/gunshot.wav');



    //copy default game prefabs
    if(this.esVersion === 6){ //did not bother making a game for ES5
      this.copy(this.srcDir + 'target.js', 'src/prefabs/target.js');
      this.copy(this.srcDir + 'crosshairs.js', 'src/prefabs/crosshairs.js');
    }

    //copy default game states
    this.copy(this.srcDir + 'boot.js', 'src/states/boot.js');
    this.copy(this.srcDir + 'game.js', 'src/states/game.js');
    this.copy(this.srcDir + 'menu.js', 'src/states/menu.js');
    this.copy(this.srcDir + 'preloader.js', 'src/states/preloader.js');
    this.copy(this.srcDir + 'gameover.js', 'src/states/gameover.js');

    //manually set the gameStates, as they are copied asyncronously and fs.readdir cannot see them be created in time.
    //Also, we should be creating a new project and can accurately predict there will only be the default files there
    this.gameStates = ["boot","game","menu","preloader","gameover"];
    this.template(this.srcDir + 'main.js', 'src/main.js');

    this.template('index.html', 'index.html');
  }
});

module.exports = PhaserGenerator;
