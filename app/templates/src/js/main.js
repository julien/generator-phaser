window.onload = function () {
  'use strict';

  var game = new Phaser.Game(640, 480, Phaser.AUTO, 'example-game');
  game.state.add('boot', example.Boot);
  game.state.add('preloader', example.Preloader);
  game.state.add('menu', example.Menu);
  game.state.add('game', example.Game);

  game.state.start('boot');
};
