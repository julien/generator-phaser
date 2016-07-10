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

    const prompts = [
      {
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
      },
      {
        when: function(answers){
          return answers.esVersion == 6;
        },
        type: 'list',
        name: 'outputFullGame',
        message: 'Output an example game or boilerplate code?',
        choices: [
          {
            value: true,
            name: 'Full game'
          },
          {
            value: false,
            name: 'Boilerplate'
          }
        ]
      }
    ];

    this.prompt(prompts,function(answers){
        this.projectName = answers.projectName || ' ';
        this.phaserBuild = answers.phaserBuild || 'phaser.min.js';
        this.customBuild = this.phaserBuild.indexOf("custom/") !== -1 ? true : false;
        this.esVersion = answers.esVersion;
        this.gameFolder = (answers.outputFullGame) ? 'game' : 'boilerplate';
        this.esDirName = 'es'+this.esVersion;
        done();
      }.bind(this));

  },

  //save prompt answers to Yeoman config
  config: function() {
    this.config.set('projectName', this.projectName);
    this.config.set('esVersion', this.esVersion);
    this.config.set('gameFolder', this.gameFolder);
  },

  projectfiles: function () {
    const gameSrcPath = path.join(this.esDirName,this.gameFolder);
    const assetDirPath = path.join('assets',this.gameFolder);

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
      this
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      this
    );

    this.fs.copy(
      this.templatePath('css'),
      this.destinationPath('css'),
      this
    );

    this.fs.copy(
      this.templatePath(assetDirPath),
      this.destinationPath('assets'),
      this
    );

    this.fs.copy(
      this.templatePath(gameSrcPath),
      this.destinationPath('src'),
      this
    );

    this.fs.copyTpl(
      this.templatePath(path.join(this.esDirName,'_package.json')),
      this.destinationPath('package.json'),
      this
    );

    this.gameStates = ["boot","game","menu","preloader","gameover"];
    this.fs.copyTpl(
      this.templatePath(path.join(this.esDirName,'main.js')),
      this.destinationPath(path.join('src','main.js')),
      this
    );
  }
});

module.exports = PhaserGenerator;
