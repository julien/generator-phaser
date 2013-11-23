generator-phaser
=================

A [Yeoman](http://yeoman.io/) generator to generate HTML5 games 
with [phaser](http://phaser.io/).

**Instructions**

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
  - see Denis' shell & debug tasks in Gruntfile.coffee for Tizen in previous releases
  - Add Grunt task for CocoonJS
  
+ Think about a task to update Phaser 
  - bower/git submodule?  (repo is quite big)
  - curl? (grap raw phaser.js file from github ...)


**CREDITS**

+ [@photonstorm](https://github.com/photonstorm/) for creating 
  [phaser](https://github.com/photonstorm/phaser).

+ The guys behind [yeoman](https://github.com/yeoman/yeoman).








