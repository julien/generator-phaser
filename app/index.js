'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PhaserGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('... Phaser ...'));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What\'s the name of your application'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName || ' ';
      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('src/assets');
    this.mkdir('src/css');
    this.mkdir('src/js');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');

    this.copy('bowerrc', '.bowerrc');
    this.copy('_gulpfile.js', 'gulpfile.js');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');

    this.copy('src/assets/minecraftia.png', 'src/assets/minecraftia.png');
    this.copy('src/assets/minecraftia.xml', 'src/assets/minecraftia.xml');
    this.copy('src/assets/player.png', 'src/assets/player.png');
    this.copy('src/assets/preloader.gif', 'src/assets/preloader.gif');
    this.copy('src/css/main.css', 'src/css/main.css');
    
    this.template('src/js/boot.js', 'src/js/boot.js');
    this.template('src/js/game.js', 'src/js/game.js');
    this.template('src/js/main.js', 'src/js/main.js');
    this.template('src/js/menu.js', 'src/js/menu.js');
    this.template('src/js/preloader.js', 'src/js/preloader.js');
    this.template('src/index.html', 'src/index.html');
  }
});

module.exports = PhaserGenerator;

