generator-phaser
=================

A [Yeoman](http://yeoman.io/) generator to generate HTML5 games 
with [phaser](http://phaser.io/).

**INSTRUCTIONS**

+ Install [Node.js](http://www.nodejs.org)

+ Install the following npm modules by issuing these commands

  `npm install -g yo generator-phaser`

+ Create a new directory for your game

  `mkdir ~/Desktop/mygame && cd $_`

+ Invoke the generator:

  `yo phaser`

+ Run a local development server with

  `grunt`

+ Package (i.e. minify css, html and js) with 

  `grunt dist`

**TODO**

+ Add Grunt tasks for "mobile" deployment 
  - See Denis' shell & debug tasks in Gruntfile.coffee for Tizen in previous releases
  - Add Grunt task for [CocoonJS](https://www.ludei.com/cocoonjs/)
  - Add Grunt task for [Ejecta](https://github.com/phoboslab/Ejecta) (will it blend)?
  
+ Think about a task to update Phaser 
  - bower or git submodule?  (Phaser repo is quite big)
  - curl? (grab raw phaser.js file from github ...)


**CREDITS**

+ [@photonstorm](https://github.com/photonstorm/) for creating 
  [phaser](https://github.com/photonstorm/phaser).

+ The guys behind [yeoman](https://github.com/yeoman/yeoman).








