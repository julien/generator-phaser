'use strict';
var util = require('util')
  , path = require('path')
  , os = require('os')
  , yeoman = require('yeoman-generator')
  , PhaserGenerator;


PhaserGenerator = module.exports = function PhaserGenerator(args, options, config) {
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
  }, {
    type: 'confirm',
    name: 'useTypeScript',
    message: 'Do you want to use TypeScript?',
    default: false
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.useTypeScript = props.useTypeScript;
    cb();
  }.bind(this));
};

PhaserGenerator.prototype.app = function app() {
  // Directory structure
  this.mkdir('src');
  this.mkdir('src/assets');
  this.mkdir('src/css');
  this.mkdir('src/js');
  this.mkdir('src/js/lib');
  
  // this.copy('_package.json', 'package.json');
  // TODO: Find a way to generate a different Gruntfile and package.json
  //       for js and ts projects
  //       templates?
  this.template('_package.json', 'package.json');
  this.copy('_Gruntfile.coffee', 'Gruntfile.coffee');
};

PhaserGenerator.prototype.projectfiles = function projectfiles() {
  // Wait untill the "official" Phaser is in the Bower registry
  // this.copy('bowerrc', '.bowerrc');
  
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');

  // Common files
  // Wait untill the "official" Phaser is in the Bower registry
  // this.copy('_bower.json', 'bower.json');
  this.copy('src/assets/example.png', 'src/assets/example.png');
  this.copy('src/css/main.css', 'src/css/main.css');
  this.copy('src/js/lib/phaser.js', 'src/js/lib/phaser.js');
  this.copy('src/index.html', 'src/index.html');

  if (this.useTypeScript) {
    this.copy('src/js/lib/phaser.d.ts', 'src/js/lib/phaser.d.ts');
    this.copy('src/js/main.ts', 'src/js/main.ts');
  } else {
    this.copy('src/js/main.js', 'src/js/main.js');
  }
};




