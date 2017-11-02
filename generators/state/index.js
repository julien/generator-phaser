const Generator = require('yeoman-generator');
const util = require('util');
const fs = require('fs');
const path = require('path');

module.exports = class extends Generator {

  initializing() {
    this.log('Creating a new Phaser State.');
    this.projectName = this.config.get('projectName');
  }

  prompting() {

    return this.prompt([{
      type: 'input',
      name: 'stateName',
      message: 'What\'s the name of your new state?',
      filter(input) {
        return path.basename(input, '.js');
      },
      validate(input) {
        if (input === '') {
          return 'State name cannot be empty';
        } else {
          return true;
        }
      }
    }]).then(answers => {
      console.log(answers);
      this.stateName = answers.stateName;
    });
  }

  writing() {

    // Create a list of all files in the 'src/states' folder
    this.gameStates = fs.readdirSync('src/states/');

    // Strip the '.js' extension from the end of the filename
    for (let i = 0, l = this.gameStates.length; i < l; i++) {
      this.gameStates[i] = path.basename(this.gameStates[i], '.js');
    }

    // this.template(...) is async, so cannot call it before fs.readdirSync and assume that it will be caught in the list.
    // Instead add the new state name manually:
    this.gameStates.push(this.stateName);

    // Create the new state and rebuild 'main.js' with the new state
    this.fs.copyTpl(
      this.templatePath(path.join('state.js')),
      this.destinationPath(path.join('src', 'states', `${this.stateName}.js`)),
      this
    );

    this.fs.copyTpl(
      this.templatePath(path.join('..', '..', 'app', 'templates', 'src', 'main.js')),
      this.destinationPath('src', 'main.js'),
      this
    );
  }

}

