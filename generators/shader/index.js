const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  initializing() {
    this.log('Creating a new Shader.');
    this.projectName = this.config.get('projectName');
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'shaderName',
        message: 'What\'s the name of your new shader?',
        filter(input) {
          return path.basename(input, '.frag');
        },
        validate(input) {
          if (input === '') {
            return 'Shader name cannot be empty';
          } else {
            return true;
          }
        }
      }
    ]).then(answers => {
      this.shaderName = answers.shaderName;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(path.join('shader.frag')),
      this.destinationPath(path.join('src', 'shaders', `${this.shaderName}.frag`)),
      this
    );
  }
};
