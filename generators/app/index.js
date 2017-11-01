const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const mkdirp = require('mkdirp');
const util = require('util');
const foldername = path.basename(process.cwd());

module.exports = class extends Generator {

  initializing() {
    this.pkg = require('../../package.json');
  }

  prompting() {
    this.log(chalk.magenta('... Phaser ...'));

    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What\'s the name of your application',
        default: foldername
      },
      {
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
      },
      {
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
    ]).then(answers => {
      this.projectName = answers.projectName ? answers.projectName : ' ';
      this.phaserBuild = answers.phaserBuild ? answers.phaserBuild : 'phaser.min.js';
      this.customBuild = !!(this.phaserBuild.indexOf("custom/") !== -1);
      this.gameFolder = answers.outputFullGame ? 'game' : 'boilerplate';
    });
  }

  // save prompt answers to Yeoman config
  configuring() {
    this.config.set('projectName', this.projectName);
    // this.config.set('esVersion', this.esVersion);
    this.config.set('gameFolder', this.gameFolder);
  }

  writing() {
    const gameSrcPath = path.join('src', this.gameFolder);
    const assetDirPath = path.join('assets', this.gameFolder);

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
      this.templatePath(path.join('src', '_package.json')),
      this.destinationPath('package.json'),
      this
    );

    this.gameStates = ['boot', 'game', 'menu', 'preloader', 'gameover'];
    this.fs.copyTpl(
      this.templatePath(path.join('src', 'main.js')),
      this.destinationPath(path.join('src', 'main.js')),
      this
    );
  }

  install() {
    if (this.options.skipInstall === true) {
      this.installDependencies({bower: false});
    }
  }

}

