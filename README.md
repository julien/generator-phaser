generator-phaser
=================

A [Yeoman](http://yeoman.io/) generator to generate HTML5 games with [phaser](http://phaser.io/).

**INSTRUCTIONS**

+ Install [Node.js](http://www.nodejs.org)

+ Install the required npm modules by issuing these commands:

  `npm install -g yo generator-phaser`

  *You can optionally install [Gulp](http://gulpjs.com) globally `npm install -g gulp` but you don't have to.*

+ Create a new directory for your game:
  + Unix/OSX : `mkdir ~/Desktop/mygame && cd $_`
  + Windows  : `mkdir %USERPROFILE%\Desktop\mygame && cd %USERPROFILE%\Desktop\mygame`

+ Invoke the generator:

  `yo phaser`

+ Run a local development server (livereload enabled) with this command:

  `npm start`
  
  *If you have Gulp installed globally you can also use: `gulp`*

+ Package your game (i.e. minify css, html and js) with:

  `npm run build` 

  *If you have Gulp installed globally you can also use: `gulp build`*
  
+ To add new Phaser states (optional, generator creates basic initial states):
  
  `yo phaser:state`
  
  *You will be asked for a new state name.*

**HOW TO USE**

+ The game data is appended to the window object, on a key that corresponds to your game's name (e.g window['game']).

+ Each game state is a constructor whose declaration is wrapped in a self-executing function in order to not pollute the global scope. 

+ These constructor functions will be sent to Phaser via game.state.add() (in main.js) and become a [State object](http://phaser.io/docs/2.3.0/Phaser.State.html). There will be a state object for the boot, preloading, menu and one for the game itself.

+ Inside these state objects, you can use the **this** keyword to  access several properties. To learn more about the properties you can access, please check the documentation page linked on the previous point.

**CREDITS**

+ [@photonstorm](https://github.com/photonstorm/) for creating 
  [phaser](https://github.com/photonstorm/phaser).

+ The guys behind [yeoman](https://github.com/yeoman/yeoman).

+ [Gulp.js](http://www.gulpjs.com)

+ [Ben Alman](http://benalman.com/) for [Grunt](http://gruntjs.com/)






