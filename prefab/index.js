'use strict';
var util = require('util');
var generators = require('yeoman-generator');
var path = require('path');


var PrefabGenerator = generators.Base.extend({
  init: function () {
    this.log('Creating a new Phaser Prefab.');
    this.projectName = this.config.get("projectName");
    this.esVersion = this.config.get("esVersion");
  },

  askFor: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'prefabType',
      message: 'What type of prefab would you like to create?',
      choices: [
        {
          value: 'prefabSprite',
          name: 'prefabSprite'
        },
        {
          value: 'prefabGroup',
          name: 'prefabGroup'
        },
        {
          value: 'prefabTileSprite',
          name: 'prefabTileSprite'
        }
      ]
    }, {
        type: 'input',
        name: 'prefabName',
        message: 'What\'s the name of your new prefab?',
        filter: function(input){return path.basename(input, '.js'); }, //remove the .js file extension if it is there
        validate: function(input) {
           if(input===""){
             return "Prefab name cannot be empty";
           }/*
           else if(/[\^\&\'\@\{\}\[\]\,\$\=\!\#\(\)\.\%\+\~\?\s\ ]+$/.test(input)){ //test for illegal characters in filename
             return "Prefab name has invalid characters in file name"
           }*/
           else{
             return true;
           }
        }
      }];

    this.prompt(prompts, function (props) {
      //set global vars to prompt vars
      this.prefabType = props.prefabType;
      this.prefabName = props.prefabName;
      done();
    }.bind(this));
  },

  projectfiles: function () {
    const esDirName = 'es'+this.esVersion;

    this.fs.copyTpl(
      this.templatePath(path.join(esDirName,this.prefabType+'.js')),
      this.destinationPath(path.join('src','prefabs',this.prefabName+'.js')),
      this
    );
  }
});

module.exports = PrefabGenerator;
