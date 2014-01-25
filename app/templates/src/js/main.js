window.onload = function () {
  'use strict';

  var ref, game;

  ref = window['<%= _.slugify(projectName) %>'];
  game = new Phaser.Game(640, 480, Phaser.AUTO, '<%= _.slugify(projectName) %>-game');
  game.state.add('boot', ref.Boot);
  game.state.add('preloader', ref.Preloader);
  game.state.add('menu', ref.Menu);
  game.state.add('game', ref.Game);

  game.state.start('boot');
};
