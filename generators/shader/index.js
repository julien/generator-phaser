'use strict';
var util = require('util');
var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var ShaderGenerator = generators.Base.extend({
  init: function() {
    this.log('Creating a new Shader.');
    this.projectName = this.config.get("projectName");
  },

  askFor: function() {
    var done = this.async();
    var prompts = [{
      type: 'input',
      name: 'shaderName',
      message: 'What\'s the name of your new shader?',
      filter: function(input) {
        return path.basename(input, '.frag');
      }, //remove the .frag file extension if it is there
      validate: function(input) {
        if (input === "") {
          return "Shader name cannot be empty";
        }
        else {
          return true;
        }
      }
    }];
    this.prompt(prompts, function(props) {
      //set global vars to prompt vars
      this.shaderName = props.shaderName;
      done();
    }.bind(this));
  },

  projectfiles: function() {
    this.fs.copyTpl(
      this.templatePath(path.join('shader.frag')),
      this.destinationPath(path.join('src', 'shaders', this.shaderName + '.frag')),
      this
    );
  }
});

module.exports = ShaderGenerator;
