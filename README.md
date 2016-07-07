generator-phaser
=================

A [Yeoman](http://yeoman.io/) generator to generate HTML5 games with [phaser](http://phaser.io/).

**INSTRUCTIONS**

+ Install [Node.js](http://www.nodejs.org)

+ Install the required npm modules by issuing these commands:

  `npm install -g yo generator-phaser`

+ Create a new directory for your game:
  + Unix/OSX : `mkdir ~/Desktop/mygame && cd $_`
  + Windows  : `mkdir %USERPROFILE%\Desktop\mygame && cd %USERPROFILE%\Desktop\mygame`

+ Invoke the generator:

  `yo phaser`

+ Invoke the state generator:

  `yo phaser:state`

+ Invoke the prefab generator:

  `yo phaser:prefab`

+ Run a local development server (livereload enabled) with this command:

  `npm start`

+ Package your game (i.e. minify css, html and js) with:

  `npm run build`


**CREDITS**

+ [@photonstorm](https://github.com/photonstorm/) for creating
  [phaser](https://github.com/photonstorm/phaser).

+ The guys behind [yeoman](https://github.com/yeoman/yeoman).

+ [Gulp.js](http://www.gulpjs.com)

+ [Ben Alman](http://benalman.com/) for [Grunt](http://gruntjs.com/)

+ [Keney.nl](http://kenney.nl/assets/shooting-gallery) for the default game's images, [erkanozan](https://www.freesound.org/people/erkanozan/sounds/51749/) for gunshot audio,  [iut_Paris8](https://www.freesound.org/people/iut_Paris8/sounds/88243/) for 'ding' audio
