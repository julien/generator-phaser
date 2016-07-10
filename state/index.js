'use strict';
var util = require('util');
var generators = require('yeoman-generator');
var fs = require('fs');
var path = require('path');


var StateGenerator = generators.Base.extend({
  init: function () {
    this.log('Creating a new Phaser State.');
    this.projectName = this.config.get("projectName");
    this.esVersion = this.config.get("esVersion");
  },

  askFor: function () {
    var done = this.async();

    var prompts = [{
        type: 'input',
        name: 'stateName',
        message: 'What\'s the name of your new state?',
        filter: function(input){return path.basename(input, '.js'); }, //remove the .js file extension if it is there
        validate: function(input) {
           if(input===""){
             return "State name cannot be empty";
           }/*
           else if(/[\^\&\'\@\{\}\[\]\,\$\=\!\#\(\)\.\%\+\~\?\s\ ]+$/.test(input)){ //test for illegal characters in filename
             return "State name has invalid characters in file name"
           }*/
           else{
             return true;
           }
        }
      }];

    this.prompt(prompts, function (props) {
      //set global vars to prompt vars
      this.stateName = props.stateName;
      done();
    }.bind(this));
  },

  projectfiles: function () {
    const esDirName = 'es'+this.esVersion;

    // Create a list of all files in the 'src/states' folder
    this.gameStates = fs.readdirSync("src/states/");
    //strip the '.js' extension from the end of the filename
    for(var i=0;i<this.gameStates.length;i++){
      this.gameStates[i] = path.basename(this.gameStates[i], '.js');
    }
    //this.template(...) is async, so cannot call it before fs.readdirSync and assume that it will be caught in the list. Instead add the new state name manually:
    this.gameStates.push(this.stateName);

    //create the new state and rebuild 'main.js' with the new state
    this.fs.copyTpl(
      this.templatePath(path.join(esDirName,'state.js')),
      this.destinationPath(path.join('src','states',this.stateName+'.js')),
      this
    );
    this.fs.copyTpl(
      this.templatePath(path.join("..","..","app","templates",esDirName,'main.js')),
      this.destinationPath('src','main.js'),
      this
    );
  }
});

module.exports = StateGenerator;
