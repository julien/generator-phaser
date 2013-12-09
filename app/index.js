'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var PhaserGenerator = module.exports = function PhaserGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PhaserGenerator, yeoman.generators.Base);

PhaserGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  // console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'projectName',
    message: 'What is the name of your project?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

PhaserGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/assets');
  this.mkdir('src/css');
  this.mkdir('src/js');
  this.mkdir('src/js/lib');

  this.copy('_Gruntfile.coffee', 'Gruntfile.coffee');

  // Wait untill the "official" Phaser is in the Bower registry
  // this.copy('_bower.json', 'bower.json');

  this.copy('_package.json', 'package.json');

  this.copy('src/assets/example.png', 'src/assets/example.png');
  this.copy('src/css/main.css', 'src/css/main.css');
  this.copy('src/js/main.js', 'src/js/main.js');
  this.copy('src/js/lib/phaser.js', 'src/js/lib/phaser.js');
  this.copy('src/index.html', 'src/index.html');

};

PhaserGenerator.prototype.projectfiles = function projectfiles() {
  // Wait untill the "official" Phaser is in the Bower registry
  // this.copy('bowerrc', '.bowerrc');

  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
};
