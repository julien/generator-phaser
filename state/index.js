'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var StateGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.conflicter.force = true;
    var localpkg = this.dest.readJSON('package.json');
	this.projectName = localpkg.name;
  },

  askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('... Phaser ...'));

    var prompts = [{
      type: 'input',
      name: 'stateName',
      message: 'What\'s the name of your new state?'
    }];

    this.prompt(prompts, function (props) {
      this.stateName = props.stateName || ' ';
      done();
    }.bind(this));
  },

  state: function () {
    //add new state js file from template
    this.template('src/js/state.js', 'src/js/'+ this.stateName +'.js');
    
    //add reference to new state file to index.html
    var path = "src/index.html",
    file = this.readFileAsString(path),
    needle = "<!-- yo phaser:state new-state-files-put-here -->";
    file = file.replace(needle, '<script src="js/'+ this.stateName +'.js"></script>\n  '+needle);
    this.write(path, file);

    //add reference to main.js
    path = "src/js/main.js";
    file = this.readFileAsString(path);
    needle = "/* yo phaser:state new-state-files-put-here */";
    var stateNameCap = this.stateName.charAt(0).toUpperCase() + this.stateName.slice(1);
    file = file.replace(needle, "game.state.add('"+this.stateName+"', ns."+stateNameCap+");\n  "+needle);
    this.write(path, file);
  }
  
});

module.exports = StateGenerator;

